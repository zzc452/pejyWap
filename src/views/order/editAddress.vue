<!-- 编辑地址 -->
<template>
    <div id="edit-address-wrap">
        <MyHeader :title="titTxt" :border="true">
            <div class="btn-delete" slot="right" v-if="is_edite" @click="deleteAddress(address_id)">删除</div>
        </MyHeader>
        <div class="edit-area">
            <div class="top-box">
                <van-field v-model="receiver" label="收货人" placeholder="请填写收货人姓名" />
                <van-field v-model="mobile" label="联系方式" type="tel" placeholder="请填写收货人真实的手机号码" />
                <van-field v-model="areaInfo" readonly clickable name="area" label="所在地区" placeholder="请选择所在地区" :is-link="true" @click="showSelectArea" />
                <van-field v-model="address_info" rows="1" autosize label="详细地址" type="textarea" placeholder="请填写详细地址" clearable />
            </div>
            <div class="set-default">
                <van-field name="switch" label="设置为默认地址">
                    <template #input>
                            <van-switch v-model="set_default" active-color="#ff6900" size="26" />
                    </template>
                </van-field>
            </div>
            <div class="save-button-box">
                <MyButton title="保存并使用" @click="addAddress"></MyButton>
            </div>
        </div>
        <van-popup v-model="show_area" position="bottom">
            <van-picker ref="areapick" show-toolbar :columns="areaList" value-key="name" :loading="loading_area" :columns-placeholder="['请选择', '请选择', '请选择']" @change="changeArea"  @confirm="confirmArea" @cancel="show_area = false"/>
        </van-popup>
    </div>
</template>

<script>
    import {
        addAddressData,
        updateAddressData,
        deleteAddressData,
        getThreeArea,
        getAddressInfo
    } from "@/api/order"
    import { mapState,mapMutations } from 'vuex'
    export default {
        name: "EditeAddress",
        data() {
            return {
                receiver: '',
                mobile: '',
                province_id: '',
                city_id: '',
                district_id: '',
                province_data: [{
                    name: "请选择"
                }],
                city_data: [{
                    name: "请选择"
                }],
                district_data: [{
                    name: "请选择"
                }],
                address_id: '',
                province_info: '',
                city_info: '',
                district_info: '',
                address_info: '',
                set_default: false,
                show_area: false,
                loading_area: false,
                is_edite: false, //区分修改地址和添加地址
                has_saved: false,
                updates:0,
            }
        },
        updated(){
            this.updates++
        },
        methods: {
            ...mapMutations('order', [
                'SET_ORDER_ADDR'
            ]),
            showSelectArea() {
                this.show_area = true;
                this.getAreaData(0, 0);
            },
            changeArea(picker,val,index){  //选择切换地址
                if(index == 2){
                    return;
                }
                this.getAreaData(val[index].id,index+1)
            },
            confirmArea(val) {  //确定选择地址
                this.show_area = false;
                if(this.province_id != val[0].id){
                    this.province_id = val[0].id
                    this.province_info = val[0].name
                }
                if(this.city_id != val[1].id){
                    this.city_id = val[1].id
                    this.city_info = val[1].name
                }
                if(this.district_id != val[2].id){
                    this.district_id = val[2].id
                    this.district_info = val[2].name
                }
            },
            getAreaData(id = 0, level = 0) {  //获取三联地址信息
                this.loading_area = true;
                if(level == 0){
                     getThreeArea(id).then(res => {
                        if (res.status === 1) {
                            this.loading_area = false;
                            this.formatAreaData(level,res);
                            let param_id = res.data.area[0].id
                            this.getAreaData(param_id,1)
                        }
                    })
                }
                if(level == 1){
                     getThreeArea(id).then(res => {
                        if (res.status === 1) {
                            this.loading_area = false;
                            this.formatAreaData(level,res);
                            let param_id = res.data.area[0].id
                            this.getAreaData(param_id,2)
                        }
                    })
                }
                if(level == 2){
                     getThreeArea(id).then(res => {
                        if (res.status === 1) {
                            this.loading_area = false;
                            this.formatAreaData(level,res)
                        }
                    })
                }
            },
            formatAreaData(level,res){
                switch (level) {
                    case 0: // 省
                        this.province_data = res.data.area
                        break;
                    case 1: // 市
                        this.city_data = res.data.area
                        break;
                    case 2: // 区
                        this.district_data = res.data.area
                        break;
                }
            },
            addAddress() { //添加或编辑地址信息
                if(!this.receiver || this.receiver.length<2){
                    this.$toast('请输入收货人姓名')
                    return
                }
                let phoneReg = /^1[3456789]\d{9}$/;
                if (!phoneReg.test(this.mobile)) {
                    this.$toast('请输入正确手机号')
                    return;
                }
                if(!this.areaInfo){
                    this.$toast('请选择省市区')
                    return
                }
                
                if(!this.address_info || this.address_info<1){
                    this.$toast('请输入详细地址')
                    return
                }
                let params = {
                    receiver: this.receiver,
                    mobile: this.mobile,
                    province_id: this.province_id,
                    city_id: this.city_id,
                    district_id: this.district_id,
                    address: this.address_info,
                    is_default: this.is_default
                }
                if (this.is_edite) {
                    params.id = this.address_id;
                    updateAddressData(params).then(res => {
                        if (res.status === 1) {
                            this.has_saved = true;
                            this.setAddress()
                            this.$router.replace(decodeURI(this.orderToPath))
                        }
                    })
                } else {
                    addAddressData(params).then(res => {
                        if (res.status === 1) {
                            this.address_id = res.data.id;
                            this.setAddress()
                            this.has_saved = true;
                            this.$router.replace(decodeURI(this.orderToPath))
                        }
                    })
                }
            },
            deleteAddress(id) { //删除地址信息
                let vm = this;
                this.$dialog.confirm({
                        message: '确认删除当前地址吗',
                    })
                    .then(() => {
                        let params = {
                            id: id
                        }
                        deleteAddressData(params).then(res => {
                            if (res.status === 1) {
                                vm.has_saved = true
                                this.$toast.success('删除成功')
                                setTimeout(() => {
                                    vm.$router.replace('/selectaddress')
                                }, 0.5E3)
                            }
                        })
                    })
                    .catch(() => {
                        return;
                    });
            },
            setAddress(){ //把当前地址存在vuex中传递给订单
                let addr = {
                    address:this.address_info,
                    id:this.address_id,
                    is_default:this.is_default,
                    mobile:this.mobile,
                    area:this.areaInfo,
                    receiver:this.receiver,
                }
                this.SET_ORDER_ADDR(addr)
            }
        },
        computed: {
            ...mapState('path',[
                'orderToPath'
            ]),
            areaList() {
                return [{
                    values: this.province_data
                }, {
                    values: this.city_data
                }, {
                    values: this.district_data
                }];
            },
            is_default() {
                return this.set_default ? 1 : 2;
            },
            isEdite() { //判断是修改地址还是新增地址
                return (this.$route.params.id === 0 || !!this.$route.params.id) ? true : false
            },
            titTxt() {
                return (this.$route.params.id === 0 || !!this.$route.params.id) ? "修改收货地址" : "添加收货地址"
            },
            areaInfo(){
                return this.province_info + this.city_info + this.district_info;
            }
        },
        created() {
            if (this.$route.params.id === 0 || !!this.$route.params.id) {
                this.is_edite = true
                let vm = this
                getAddressInfo(this.$route.params.id).then(res => {
                    if (res.status === 1) {
                        this.address_id = res.data.info.id
                        this.receiver = res.data.info.receiver
                        this.mobile = res.data.info.mobile
                        this.province_info = res.data.info.province;
                        this.city_info = res.data.info.city;
                        this.district_info =res.data.info.district;
                        this.address_info = res.data.info.address
                        this.province_id = res.data.info.province_id
                        this.city_id = res.data.info.city_id
                        this.district_id = res.data.info.district_id
                        this.set_default = res.data.info.is_default === 1 ? true : false
                    }
                }).catch((err) => {
                    vm.$toast.fail('网络错误，请稍后重试')
                    throw new Error(err)
                })
            } else {
                this.is_edite = false
            }
        },
        beforeRouteLeave(to, from, next) {
            let vm = this
            if (!vm.has_saved && vm.updates>1) {
                this.$dialog.confirm({
                        message: '收货信息还未保存，确定返回？',
                    })
                    .then(() => {
                        next();
                    })
                    .catch(() => {
                        vm.$router.go(1)
                        return false;
                    });
            }else{
                next();
            }
        }
    }
</script>
<style lang="less">
    #edit-address-wrap {
        background: #f2f2f2;
        min-height: 100vh;
        #public-nav-header {
            .btn-delete {
                font-size: 13px;
                color: @txtWhite;
                cursor: pointer;
            }
        }
        .edit-area {
            .van-cell {
                padding: 10px .426667rem 10px .48rem;
                .van-field__label {
                    font-size: 13px;
                    color: #C6C6C6;
                    width: 78px;
                }
                .van-field__control {
                    font-size: 15px;
                    color: @txtBlack;
                    &::-webkit-input-placeholder {
                        color: #C6C6C6;
                    }
                }
            }
            .van-cell:not(:last-child)::after {
                right: .48rem;
                left: .426667rem;
            }
            .top-box {
                background: @bgWhite;
                margin-bottom: .693333rem;
            }
            .set-default {
                .van-cell {
                    align-items: center;
                    .van-cell__title {
                        flex: 1 0 auto;
                        color: #666;
                        font-size: 15px;
                    }
                    .van-cell__value {
                        flex: 0 1 auto;
                    }
                }
            }
        }
        .save-button-box {
            padding: 1.52rem 0.426667rem 0 0.48rem;
            button {
                border-radius: 5px;
            }
        }
    }
</style>