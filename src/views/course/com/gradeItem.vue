<!-- 年级组件 -->
<template>
    <div class="select-grade-item">
        <div class="items-box" v-for="(val,index) in grades" :key="index">
            <h6>{{val.name}}</h6>
            <dl>
                <dd v-for="(grade,num) in val.children" :class="{'on': grade.id === selectedId}" @click="selectGrade(grade.id,grade.children && grade.children[0].id)" :key="num">{{grade.name}}</dd>
            </dl>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            grades: {
                type: Array
            },
            selectedId:{
                type:Number,
                default:1
            }
        },
        methods: {
            selectGrade(id,stage,grade) {
                this.$emit('passGrade',id,stage,grade)
            }
        }
    }
</script>
<style scoped lang="less">
    /* @import url(); 引入css类 */
    .select-grade-item {
        padding-left: .34rem;
        .items-box {
            margin-bottom: .426667rem;
            h6 {
                font-size: 15px;
                color: @txtBlack;
                margin-bottom: .453333rem;
                padding-left: 0.16rem;
            }
            dl {
                display: flex;
                justify-content: flex-start;
                flex-wrap: wrap;
            }
            dd {
                font-size: 14px;
                color: @txtBlack;
                flex: 0 1 2.4rem;
                font-size: 14px;
                margin: 0 .16rem .32rem .16rem;
                height: .88rem;
                line-height: .88rem;
                background: @bgGrey;
                text-align: center;
                border-radius: 0.44rem;
                &.on {
                    background: @bgOrange;
                    color: @txtWhite;
                }
            }
        }
    }
</style>