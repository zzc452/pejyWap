<!-- 账户设置 -->
<template>
    <div id="account-setting-wrap">
        <MyHeader title="账户设置" :border="true"></MyHeader>
        <div class="account-body">
            <div class="account-user">
                <div class="pic"><img :src="avatar | formatUrl()" alt=""></div>
                <van-field ref="nameInput" v-model="name" maxlength="4" center :readonly="!is_editename" @blur="editeOver" @click="changeName"><span v-show="!is_editename" slot="right-icon" class="pen" ></span></van-field>
            </div>
            <div class="input-area">
                <van-field label="性别" v-model="sex.name" center input-align="right" is-link readonly @click="showSetSex" />
                <van-field label="电话号码" v-model="mobile" center input-align="right" readonly>
                    <i slot="right-icon" class="icon-lock"></i>
                </van-field>
                <van-field label="年级学科" v-model="period.name" center input-align="right" is-link readonly @click="showSetPeriod" />
                <!-- <van-field label="学科" v-model="subject.name" center input-align="right" is-link readonly @click="showSetSubject" /> -->
            </div>
            <div class="bottom-btn-box">
                <MyButton title="保存" @click="saveSetting" :isLogining="is_saving"></MyButton>
            </div>
        </div>
        <!-- 性别选项 -->
        <van-action-sheet v-model="show_setsex" :actions="sex_data" @select="setSex" cancel-text="取消" @cancel="cancelSet" />
        <!-- 学习阶段选项 -->
        <van-popup v-model="show_setperiod" position="bottom">
            <van-picker ref="periodPick" show-toolbar title="学习阶段" :columns="allgrade_data" item-height="38" value-key="name" @cancel="cancelSet" @confirm="setPeriod" />
        </van-popup>
    </div>
</template>

<script>
    import {
        mapActions
    } from "vuex"
    import {
        getCourseSetting
    } from "@/api/course"
    export default {
        name: "AccountSet",
        data() {
            return {
                name: '',
                avatar: '',
                sex: {},
                mobile: '',
                period: {},
                is_editename: false,
                original_name: '',
                show_setsex: false,
                show_setperiod: false,
                sex_data: [{
                        name: '男',
                        id: 1
                    },
                    {
                        name: '女',
                        id: 2
                    }
                ],
                allgrade_data: [], //年级信息
                has_saved: false,
                undate: 0,  //是否修改
                is_saving:false
            }
        },
        updated() {
            this.undate++
        },
        methods: {
            ...mapActions('mine', [
                'getAccountInfo',
                'updateAccount'
            ]),
            changeName() {
                let vm = this
                this.is_editename = true;
                setTimeout(() => {
                    vm.$refs.nameInput.focus()
                }, 0)
            },
            editeOver() {
                this.is_editename = false;
                if (this.name.length === 0) {
                    this.name = this.original_name
                }
            },
            showSetSex() {
                this.show_setsex = true
            },
            showSetPeriod() {
                this.show_setperiod = true
                if (this.allgrade_data.length > 0) {
                    return;
                }
                this.getAllGrade()
                
            },
            cancelSet() {
                this.show_setsex = false;
                this.show_setperiod = false;
            },
            setSex(val) {
                this.sex.name = val.name;
                this.sex.id = val.id;
                this.show_setsex = false;
            },
            setPeriod(val, index) {
                this.period.name = val.join(' ');
                this.show_setperiod = false
                this.period_index = index
                this.period.id = this.allgrade_data[index[0]].children[index[1]].children[index[2]].id
            },
            getAllGrade() {
                let vm = this
                getCourseSetting('grade_2').then(res => {
                    if (res.status === 1) {
                        vm.allgrade_data = res.data.data
                        vm.allgrade_data.forEach(function(val,index) {
                            if(!val.children || val.children.length==0){
                                vm.allgrade_data.splice(index,1)
                            }
                        })
                    }
                })
            },
            setGradePicker(){ //遍历方法太笨，待找个优雅的方法
                let vm = this;
                let arr = [];
                
                if(JSON.stringify(vm.period) == '{}' || !vm.period){
                    return
                }
                if(vm.period.level == 3){
                    for(let i = 0;i<vm.allgrade_data.length;i++){
                        for(let j = 0;j<vm.allgrade_data[i].children.length;j++){
                            if(vm.allgrade_data[i].children[j].id == vm.period.id){
                                arr = [i,j,0]
                                break;
                            }
                        }
                    }
                }
                if(vm.period.level == 4){
                    for(let i = 0;i<vm.allgrade_data.length;i++){
                        for(let j = 0;j<vm.allgrade_data[i].children.length;j++){
                            for(let k = 0;j<vm.allgrade_data[i].children[j].children.length;k++){
                                if(vm.allgrade_data[i].children[j].children[k]){
                                    if( vm.allgrade_data[i].children[j].children[k].id == vm.period.id){
                                        console.log(i,j,k)
                                        arr = [i,j,k]
                                        break;
                                    }
                                }
                                
                            }
                        }
                    }
                }
                vm.$refs.periodPick.setIndexes(arr)
            },
            saveSetting() {
                if(this.is_saving){
                    return;
                }
                let vm = this
                vm.is_saving = true;
                let params = {
                    nickname: this.name,
                    sex: this.sex,
                    avatar: this.avatar,
                    class_attr: this.period
                }
                vm.updateAccount(params).then(res => {
                    if (res.status === 1) {
                        vm.$toast.success('修改成功')
                        vm.has_saved = true
                        setTimeout(()=>{
                            vm.$router.push('/mine')
                        },1E3)
                    }
                }).finally(()=>{
                    vm.is_saving = false;
                })
            },
            initData() {
                this.getAccountInfo().then(res => {
                    if (res.status === 1) {
                        let data = res.data.info
                        this.name = data.nickname
                        this.mobile = data.mobile
                        this.original_name = data.nickname
                        this.sex = data.sex
                        this.avatar = data.avatar
                        this.period = data.class_attr
                    }
                })
            },
        },
        beforeRouteLeave(to, from, next) {
            let vm = this
            if (!vm.has_saved && vm.undate > 1) {
                this.$dialog.confirm({
                        message: '设置信息还未保存，确定返回？',
                    })
                    .then(() => {
                        next();
                    })
                    .catch(() => {
                        vm.$router.go(1)
                        return false;
                    });
            } else {
                next();
            }
        },
        created() {
            this.initData()
        }
    }
</script>
<style lang="less">
    @imgUrl: "../../assets/img/";
    #account-setting-wrap {
        min-height: 100vh;
        box-sizing: border-box;
        background: @bg2Grey;
        .account-body {
            padding: 0 .333333rem;
            .account-user {
                padding: .72rem 0;
                text-align: center;
                .pic {
                    width: 1.946667rem;
                    height: 1.946667rem;
                    margin: 0 auto;
                    border-radius: 50%;
                    overflow: hidden;
                    img {
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                    }
                }
                .van-cell {
                    padding: 0;
                    background: none;
                    display: inline-block;
                    height: 30px;
                    line-height: 30px;
                    width: auto;
                    margin-top: -2px;
                    .van-field__control {
                        width: 72px;
                        text-align: center;
                    }
                    .pen {
                        display: inline-block;
                        width: .453333rem;
                        height: 30px;
                        background: url("@{imgUrl}icon_pen.png") center no-repeat;
                        background-size: .426667rem auto;
                        cursor: pointer;
                        vertical-align: top;
                    }
                    .van-field__right-icon {
                        margin-right: 0;
                        padding: 0;
                    }
                }
            }
            .input-area {
                background: @bgWhite;
                border-radius: .333333rem;
                overflow: hidden;
                .van-cell {
                    height: 1.306667rem;
                    line-height: 1.306667rem;
                    padding: 0 .346667rem;
                    &:not(:last-child)::after {
                        left: .333333rem;
                        right: .333333rem;
                    }
                    .van-cell__title {
                        font-size: 15px;
                        color: @txtBlack;
                    }
                    .van-field__control {
                        font-size: 15px;
                        color: @txtGrey;
                    }
                    .icon-lock {
                        display: inline-block;
                        width: .373333rem;
                        height: .453333rem;
                        background: url("@{imgUrl}icon_lock.png") 0 center no-repeat;
                        background-size: 100% auto;
                        vertical-align: middle;
                        margin-top: -2px;
                    }
                }
            }
            .bottom-btn-box {
                padding-top: 1.093333rem;
                button {
                    font-size: 18px;
                    border-radius: 5px;
                }
            }
        }
        .van-popup--bottom {
            border-radius: 15px 15px 0 0;
            overflow: hidden;
            .van-picker__toolbar {
                background: @bg2Grey;
                .van-picker__title {
                    font-size: 18px;
                    color: @txtBlack;
                }
                .van-picker__cancel,
                .van-picker__confirm {
                    font-size: 16px;
                }
            }
        }
    }
</style>