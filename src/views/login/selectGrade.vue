<!-- 选择年级 -->
<template>
    <div id="select-grade-wrap">
        <MyHeader :leftArrow="false">
            <div class="skip-box" slot="right" @click="skipNext">
                跳过
            </div>
        </MyHeader>
        <div class="select-body ">
            <div class="top-txt">
                <h4>请选择在读年级</h4>
                <p>便于您快速查看所需课程</p>
                <span>滑动选择年级</span>
            </div>
            <div class="grade-form-box">
                <van-picker ref="gradePicker" :columns="columns" @change="onChange" visible-item-count="5" item-height="52" :default-index="defaultIndex" />
                <div class="input-content">
                    <van-form @submit="submitGrade">
                        <van-field v-model="username" name="用户名" placeholder="请输入学生姓名" />
                        <MyButton :isLogining="isSubmiting" title="开启学习之旅"></MyButton>
                    </van-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        bindGrade
    } from "@/api/login"
    import { getCourseSetting } from "@/api/course"
    export default {
        name:'SelectGrade',
        data() {
            return {
                columns: [],
                username: '',
                gradeId: '',
                isSubmiting: false,
                defaultIndex:1 //picker默认值
            }
        },
        methods: {
            onChange(picker, value) {
                this.gradeId = value.id;
            },
            skipNext(){
                this.$router.push(decodeURI(this.$store.getters.loginToPath));
            },
            submitGrade() {
                if (this.username.length < 2) {
                    this.$toast('请输入姓名')
                    return
                }
                let uid = this.$store.getters.userInfo && this.$store.getters.userInfo.id ? this.$store.getters.userInfo.id:'';
                if(!uid){
                    this.$toast('请登录后绑定');
                    let vm = this;
                    setTimeout(()=>{
                        vm.$router.push('/login');
                    },1E3)
                    return;
                }
                let params = {
                    attr_id: this.gradeId,
                    id:uid,
                    nickname: this.username,
                }
                let vm = this;
                this.isSubmiting = true;
                bindGrade(params).then(res => {
                    if(res.status == 1){
                        this.$toast('提交成功，开始学习之旅');
                        setTimeout(() => {
                            vm.$router.push(decodeURI(this.$store.getters.loginToPath));
                        }, 1E3);
                    }else{
                        this.$toast(res.message);
                    }
                }).catch(err => {
                    this.$toast('网络错误，请稍后重试')
                    throw new Error(err);
                }).finally(function () {
                    vm.isSubmiting = false;
                })
            },
            getAllGrade(){
                let params = 'grade'
                getCourseSetting(params).then(res=>{
                    if(res.status === 1){
                        for(let i = 0;i<res.data.data.length;i++){
                            res.data.data[i].text = res.data.data[i].name
                        }
                        this.columns = res.data.data;
                    }
                    this.gradeId = this.columns[this.defaultIndex].id;
                })
            }
        },
        created(){
            this.getAllGrade();
        }
    }
</script>
<style lang="less">
    @imgUrl:'../../assets/img/';
    #select-grade-wrap {
        background: url("@{imgUrl}bg_selectGrade.png") 0 0 no-repeat;
        background-size: 100% auto;
        .van-nav-bar {
            background: none;
            .skip-box {
                font-size: 13px;
                color: @txtWhite;
                cursor: pointer;
            }
        }
        .select-body {
            padding: 0 .6rem;
            .top-txt {
                color: @txtWhite;
                h4 {
                    font-size: 24px;
                    line-height: 1.2em;
                    margin-bottom: .32rem;
                }
                p {
                    font-size: 18px;
                    margin-bottom: .4rem;
                    line-height: 1.2em;
                }
                span {
                    position: relative;
                    padding-top: .506667rem;
                    font-size: 14px;
                    &:after {
                        content: '';
                        width: 18px;
                        height: 3px;
                        position: absolute;
                        left: 0;
                        top: 3px;
                        background: #f68d48;
                    }
                }
            }
            .grade-form-box {
                padding: 0 .96rem .693333rem;
                background: @bgWhite;
                border-radius: .426667rem;
                box-shadow: 0 1px 5px #c2c2c2;
                .van-picker-column__item {
                    font-size: 16px;
                    color: #333333;
                }
                .van-picker-column__item--selected {
                    font-size: 20px;
                    font-weight: bold;
                }
                .input-content {
                    padding-top: .533333rem;
                    .van-cell {
                        padding: 0;
                        height: 42px;
                        line-height: 42px;
                        border-bottom: 1px solid #333333;
                        margin-bottom: .56rem;
                        input {
                            font-size: 14px;
                            color: #333;
                        }
                    }
                    .van-button {
                        border-radius: 22px;
                    }
                }
            }
        }
    }
</style>