<template>
    <div class="main">
        <div class="tab-icon">
            <img class="img" src="../../../assets/liucheng.png" alt="">
            <span class="span">个人中心修改密码</span>
        </div>
        <div class="form">
            <el-form ref="form" size="small"  :model="form" label-width="90px" class="form-container">
                <el-form-item label="所属部门">
                    <el-select v-model="form.region" placeholder="请选择所属部门">
                        <el-option label="Zone one" value="shanghai" />
                        <el-option label="Zone two" value="beijing" />
                    </el-select>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="form.name" placeholder="请输入姓名" />
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="form.name" placeholder="请输入手机号" />
                </el-form-item>
                <el-form-item label="我的密码">
                    <el-input v-model="form.name" placeholder="请输入我的密码">
                    <span slot="suffix" style="color: blue;" @click="forget">忘记密码</span>
                    </el-input>
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
                <el-form-item label="申请时间">
                    <el-date-picker v-model="form.region" type="daterange" range-separator="至" start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-col :span="11">
                        <el-button type="primary"> 搜索</el-button>
                    </el-col>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>



<script >
export default {
    data() {
        return {
            form: {
                name:"",
                region:""
            }
        }
    },
    mehods:{
        forget(){
            this.$router.push({name:'password'})
        }
    }
}
</script>


<style lang="scss" scoped>
@import "~@/styles/btn.scss";

.main {
    width: 100%;
    height: 100%;
    background-color: white;
    .form{
        width: 30%;
    }
}
</style>