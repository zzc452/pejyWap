<!-- 公共导航头 -->
<template>
    <div id="public-nav-header">
        <van-nav-bar @click-left="goBack" :title="this.title" :fixed="this.fixed" :left-arrow="this.leftArrow" :border="this.border">
            <slot name="left" slot="left"></slot>
            <slot name="title" slot="title"></slot>
            <slot name="right" slot="right"></slot>
        </van-nav-bar>
    </div>
</template>

<script>
    export default {
        props:{
            title:{
                type:String
            },
            fixed:{
                type:Boolean,
                default:false
            },
            leftArrow:{
                type:Boolean,
                default:true
            },
            border:{
                type:Boolean,
                default:false
            }
        },
        data() {
            return {
            }
        },
        methods:{
            goBack(){
                window.history.length>1?this.$router.go(-1):this.$router.push('/');
            }
        }
    }
</script>
<style lang="less">
    #public-nav-header{
        .van-nav-bar{
            background: @gradualOrange;
        }
        .van-nav-bar__title{
            font-size: 18px;
            color:@txtWhite;
            font-weight: bold;
        }
        .van-nav-bar .van-icon{
            color: @txtWhite;
        }
        .van-nav-bar__arrow{
            font-size: 24px;
        }
        .van-hairline--bottom::after{
            border-color:#E0E0E0;
        }
    }
</style>