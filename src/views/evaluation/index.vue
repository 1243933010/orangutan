<template>
    <div>
        <div class="tab-icon">
            <img class="img" src="../../assets/liucheng.png" alt="">
            <span class="span">筛选</span>
        </div>
        <el-form  ref="form" size="small" inline :model="form" label-width="90px" class="form-container">
            <el-form-item label="项目名称">
                <el-input v-model="form.name" placeholder="请输入项目名称" />
            </el-form-item>
            <el-form-item label="项目类型">
                <el-select v-model="form.region" placeholder="请选择项目类型">
                    <el-option label="Zone one" value="shanghai" />
                    <el-option label="Zone two" value="beijing" />
                </el-select>
            </el-form-item>
            <el-form-item label="采购方式">
                <el-select v-model="form.region" placeholder="请选择采购方式">
                    <el-option label="Zone one" value="shanghai" />
                    <el-option label="Zone two" value="beijing" />
                </el-select>
            </el-form-item>
            <el-form-item label="审核状态">
                <el-select v-model="form.region" placeholder="请选择审核状态">
                    <el-option label="Zone one" value="shanghai" />
                    <el-option label="Zone two" value="beijing" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-col :span="11">
                    <el-button type="primary"> 搜索</el-button>
                </el-col>
            </el-form-item>
        </el-form>
        <div class="list">
            <div class="list-box">
                <div class="title">
                    <i class="el-icon-s-unfold" style="color:#C4CAD5;margin-right: 2px;"></i>
                    <span style="color: #454D65;font-size: 16px;">项目列表</span>
                </div>
                <!-- <div class="add" @click="projectAdd">
                    <img style="width: 20px;" src="../../assets/add_icon.png" alt="">
                    <span>新增</span>
                </div> -->
            </div>
            <div class="">
                <div v-for="(item, index) in list" :key="index" class="item">
                    <div class="item-top">
                        <div class="title">{{ item.title }}</div>
                        <div class="status1" v-if="item.status == 0"><span>公开招标</span></div>
                        <div class="status1" v-if="item.status == 1"><span>不公开招标</span></div>

                        <div class="status2" v-if="item.status == 0"><span>内审完成</span></div>
                        <div class="status22" v-if="item.status == 1"><span>内审中</span></div>
                        <div class="status222" v-if="item.status == 2"><span>初始化</span></div>

                    </div>
                    <div class="item-con">
                        <div class="item-con-left">
                            <div class="item-con-left-o">
                                <div><span class="label">项目编号:</span><span class="text">{{ item.title }}</span></div>
                                <div><span class="label">采购单位:</span><span class="text">{{ item.title }}</span></div>
                                <div><span class="label">采购申请时间:</span><span class="text">{{ item.title }}</span></div>
                            </div>
                            <div class="item-con-left-t">
                                <div><span class="label">项目类型:</span><span class="text">{{ item.title }}</span></div>
                                <div><span class="label">预算金额:</span><span class="text">{{ item.title }}</span></div>
                                <div><span class="label">代理机构名称:</span><span class="text">{{ item.title }}</span></div>
                            </div>
                        </div>
                        <div class="item-con-right">
                            <div class="item-con-right-btn1" @click="openDetail(item)">详情</div>
                            <div class="item-con-right-btn2" @click="openDetail">编辑</div>
                            <div class="item-con-right-btn3">删除</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>



<script>
import router from '@/router/index'
export default {
    data() {
        return {
            form: {
                name: '',
                region: ''
            },
            list: [
                { status: 0, title: 'test', },
                { status: 1, title: 'test', },
                { status: 0, title: 'test', },
                { status: 1, title: 'test', },
                { status: 1, title: 'test', },
                { status: 1, title: 'test', },
            ]
        }
    },
    mounted() {
        // console.log(router.options, this.$router)
    },
    methods: {
        onSubmit() {
            this.$message('submit!')
        },
        onCancel() {
            this.$message({
                message: 'cancel!',
                type: 'warning'
            })
        },
        openDetail(item) {
            // console.log(item)
            this.$router.push({name:'ImplementationCommissionEdit',params:{}})
        },
        projectAdd() {
            this.$router.push({ name: 'projectManagementAdd', params: {} })
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/btn.scss";
.form-container {
    background-color: #fff;
    // padding-top: 20px;
}
.list {
    width: 100%;
    height: 100%;
    background-color: #F3F5F9;
    padding: 20px 0;
    box-sizing: border-box;

    .list-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;

        .add {
            width: 90px;
            height: 33px;
            background: linear-gradient(0deg, #2D6DFF 0%, #6280F5 100%);
            border-radius: 4px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            color: white;

            span {
                margin-left: 5px;
                padding-top: 5px;
            }
        }

    }

    .item {
        background-color: white;
        border-radius: 6px;
        width: 100%;
        margin-bottom: 5px;
        position: relative;
        box-sizing: border-box;
        padding: 24px 0 18px 44px;
        // font-size: 14px;
        .item-top {
            display: flex;
            flex-direction: row;
            align-items: center;
            margin-bottom: 27px;

            .title {
                color: #454D65;
                font-size: 14px;
                margin-right: 10px;
            }

            .status1,
            .status2,.status222,.status22 {
                width: 66px;
                height: 24px;
                background: linear-gradient(0deg, #6280F5 0%, #2D6CFF 100%);
                border-radius: 4px;
                margin-right: 10px;
                color: #FEFEFF;
                font-size: 12px;
                display: flex;
                justify-content: center;
                align-items: center;
                
            }

            .status2 {
                background: linear-gradient(0deg, #FC6435 0%, #FC4835 100%);
                color: white;
            }

            .status22 {
                background: linear-gradient(0deg, #394779 0%, #2A2E3E 100%);
                

            }

            .status222 {
                background: linear-gradient(0deg, #FCAA35 0%, #FCA135 100%);
               

            }
        }

        .item-con {
            display: flex;
            justify-content: space-between;

            .item-con-left {

                font-size: 20px;

                .item-con-left-o,
                .item-con-left-t {
                    // margin-right: 25px;
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;

                    div {
                        min-width: 250px;
                        margin-right: 25px;
                    }
                }

                .item-con-left-o,
                .item-con-left-t {
                    .label {
                        color: #B2B6CC;
                        font-size: 14px;
                        margin-right: 12px;
                    }

                    .text {
                        color: #60667A;
                        font-size: 14px;
                    }
                }

                // font-weight: 600;
            }

            .item-con-right {
                display: flex;
                flex-direction: row;
                align-items: center;
                
                box-sizing: border-box;
                position: absolute;
                top: 40%;
                right: 0;
                div {
                    // margin: 0 5px;
                    width: 70px;
                    height: 33px;
                    background: linear-gradient(0deg, #6280F5 0%, #2D6CFF 100%);
                    border-radius: 4px;
                    margin-right: 20px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: white;
                    font-size: 12px;
                }

                .item-con-right-btn1 {
                    background: linear-gradient(0deg, #6280F5 0%, #2D6CFF 100%);
                }

                .item-con-right-btn2 {
                    background-color: #DCE3FD;
                }

                .item-con-right-btn3 {
                    background: linear-gradient(0deg, #FC4835 0%, #FC6235 100%);
                }
            }
        }
    }
}</style>