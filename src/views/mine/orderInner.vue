<!-- 订单二级页 -->
<template>
    <div class="order-inner-box">
        <van-list v-model="load_moreing" :finished="load_finished" :finished-text="finished_text" @load="loadMore" :immediate-check="false">
            <Orderitem v-show="show_order"></Orderitem>
        </van-list>
    </div>
</template>

<script>
    import Orderitem from "./com/orderItem"
    export default {
        name:"OrderInner",
        components:{
            Orderitem
        },
        data() {
            return {
                load_moreing:false,
                load_finished:false,
                show_order:true,
                finished_text:"已经到底了"
            }
        },
        methods:{
            loadMore(){
                console.log("正在加载")
            }
        }
    }
</script>
<style scoped>
    /* @import url(); 引入css类 */
</style>