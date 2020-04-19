<!-- 添加地址组件 -->
<template>
    <div class="add-address-box">
        <div class="left">
            <img src="../../../assets/img/icon_address.png" alt="">
        </div>
        <div class="right">
            <div  class="goto-add">
                <h4>添加收货地址</h4>
                <p>用于邮寄学习资料或学习工具</p>
            </div>
            <div v-if="false" class="has-default">
                <p><van-tag color="#ff6900">默认</van-tag>上海上海市闵行区</p>
                <h4>昌平路686号218室</h4>
                <p>张某某158****6666</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        //生命周期 - 创建完成（访问当前this实例）
        created() {},
        //生命周期 - 挂载完成（访问DOM元素）
        mounted() {}
    }
</script>
<style scoped lang="less">
    @imgUrl: '../../../assets/img/';
    .add-address-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: @bgWhite;
        width: 100%;
        box-sizing: border-box;
        padding: .613333rem .666667rem .613333rem 0;
        box-shadow: 2px 2px 6px 0px rgba(0, 0, 0, 0.03);
        cursor: pointer;
        border-radius: .133333rem;
        .left {
            flex: 0 0 1.573333rem;
            text-align: center;
            height: .8rem;
            img {
                display: inline-block;
                width: .8rem;
                height: .8rem;
                vertical-align: top;
            }
        }
        .right {
            padding-right: .32rem;
            background: url("@{imgUrl}icon_addressPointer.png") right center no-repeat;
            background-size: .213333rem auto;
            flex: 1 0 auto;
            .goto-add {
                h4 {
                    font-size: 16px;
                    color: @txtBlack;
                    margin-bottom: 4px;
                }
                p {
                    font-size: 12px;
                    color: @txtGrey;
                }
            }
            .has-default {
                color: @txtBlack;
                p {
                    font-size: 12px;
                }
                h4 {
                    font-size: 16px;
                    padding: 4px 0;
                }
            }
        }
    }
</style>