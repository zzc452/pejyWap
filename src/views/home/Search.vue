<!-- 搜索页面 -->
<template>
    <div id="page-search-wrap">
        <div class="top-search-box">
            <van-search ref="search" v-model="keyword" show-action shape="round" placeholder="请输入搜索关键词" @search="onSearch" @cancel="onCancel" />
        </div>
        <div class="search-result">
            <PastSearch :searchData="past_data"></PastSearch>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    import PastSearch from './com/pastSearch.'
    export default {
        name:'Search',
        components:{
            PastSearch
        },
        data() {
            return {
                keyword:'',
                past_data:{
                    hot:'',
                    history:''
                }
                
            }
        },
        methods:{
            ...mapActions('search', [
                'getHotData',
                'saveHistory'
            ]),
            onSearch(){
                console.log('search')
            },
            onCancel(){
                this.$router.go(-1)
            },
            initData(){
                this.getHotData().then(res=>{
                    if(res.status === 1){
                        this.past_data.hot = res.data.data.hot
                    }
                })
                this.past_data.history = this.$store.state.search.historySearch
            }
        },
        created(){
            this.initData()
        }
    }
</script>
<style lang="less">
    #page-search-wrap{
        padding-top: 56px;
        .top-search-box{
            position: fixed;
            left: 0;
            top: 0;
            height: 54px;
            width: 100%;
            box-sizing: border-box;
            padding: 10px 0 10px .4rem;
            .van-search{
                padding: 0;
                .van-cell{
                    color: @txt2Black;
                }
                .van-search__action{
                    padding: 0 .426667rem;
                    color: @txt2Grey;
                }
                .van-search__content{
                    background: @bgGrey;
                    padding-left: .373333rem;
                }
                .van-field__left-icon .van-icon{
                    font-size: 18px;
                    color: #ccc;
                }
            }

        }
    }
</style>