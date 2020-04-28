<!-- 历史搜索和热门搜索 -->
<template>
    <div class="search-item-box">
        <div class="search-con-box" v-for="(value, name) in searchData" :key="name">
            <div v-if="value.length>0">
                <h2>{{name == 'hot'?'热门搜索':'历史搜索'}} <span v-if="name != 'hot'" class="btn-delet"><img src="@/assets/img/icon_delete.png" alt=""></span></h2>
                <div class="span-box">
                    <span v-for="(item,index) in value" :key="index">{{item.keywords}}</span>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
    export default {
        name:"HotSearch",
        props:{
            searchData:{
                trye:Object
            }
        }
    }
</script>
<style scoped lang="less">
    .search-item-box {
        padding: 0 .266667rem;
        .search-con-box {
            margin-bottom: .24rem;
            h2 {
                font-size: 15px;
                color: @txtBlack;
                height: 20px;
                line-height: 20px;
                padding: .346667rem 0;
                .btn-delet {
                    float: right;
                    margin-right: .213333rem;
                    cursor: pointer;
                    margin-top: -1px;
                    img {
                        width: 18px;
                        height: auto;
                        vertical-align: middle;
                    }
                }
            }
            .span-box {
                margin: 0 -.2rem;
                font-size: 0;
                span {
                    display: inline-block;
                    height: 28px;
                    line-height: 28px;
                    font-size: 12px;
                    color: @txt2Black;
                    background: #F2F2F2;
                    border-radius: 3px;
                    padding: 0 8px;
                    margin: 0 .2rem .32rem;
                }
            }
        }
    }
</style>