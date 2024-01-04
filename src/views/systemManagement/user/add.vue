<template>
    <div>
        <el-dialog title="添加用户" center :visible.sync="dialogVisible" width="50%" :show-close="false">
            <div class="close">
                <img @click="dialogVisible=false" src="../../../assets/close_icon.png" alt="" srcset="">
            </div>
            <el-row :gutter="24">
            <el-form class="form" ref="formInfo" :inline="true"  :rules="rules" size="small" :model="formInfo" label-width="100px">
                
                    <el-form-item label="用户姓名" prop="nickname">
                        <el-col :span="24">
                        <el-input v-model="formInfo.nickname" placeholder="请输入用户姓名" />
                    </el-col>
                    </el-form-item>
               
                
                    <el-form-item label="所属部门" prop="department_id">
                        <el-col :span="24">
                        <el-select v-model="formInfo.department_id" placeholder="请选择所属部门">
                            <el-option :label="item.name" :value="item.id" v-for="(item, index) in departmentList" :key="index" />
                        </el-select>
                    </el-col>
                    </el-form-item>
               
                
                    <el-form-item label="手机号" prop="mobile">
                        <el-col :span="24">
                        <el-input v-model="formInfo.mobile" placeholder="请输入手机号" />
                    </el-col>
                    </el-form-item>
               
                
                    <el-form-item label="登录账号" prop="username">
                        <el-col :span="24">
                        <el-input v-model="formInfo.username" placeholder="请输入登录账号" />
                    </el-col>
                    </el-form-item>
                
                    <el-form-item label="登录密码" prop="password">
                        <el-col :span="24">
                        <el-input v-model="formInfo.password" placeholder="请输入登录密码" />
                    </el-col>
                    </el-form-item>
                
               
                    <el-form-item label="邮箱" prop="email">
                        <el-col :span="24">
                        <el-input v-model="formInfo.email" placeholder="请输入邮箱" />
                    </el-col>
                    </el-form-item>
               
                <!-- <el-col :span="12">
                    <el-form-item label="角色" prop="region">
                        <el-select v-model="formInfo.region" placeholder="请选择角色">
                            <el-option label="Zone one" value="shanghai" />
                            <el-option label="Zone two" value="beijing" />
                        </el-select>
                    </el-form-item>
                </el-col> -->
                <!-- <el-form-item label="部门" prop="department_id">
                    <el-radio-group v-model="formInfo.department_id">
                        <el-radio :label="3">正常</el-radio>
                        <el-radio :label="6">停用</el-radio>
                    </el-radio-group>
                    <el-select v-model="formInfo.department_id" placeholder="请选择所属部门">
                            <el-option label="Zone one" value="shanghai" />
                            <el-option label="Zone two" value="beijing" />
                        </el-select>
                </el-form-item> -->
                <el-form-item label="代理" prop="agent_id">
                    <el-col :span="24">
                    <el-select v-model="formInfo.agent_id" placeholder="请选择代理">
                            <el-option :label="item.name" :value="item.id" v-for="(item, index) in agentList" :key="index" />
                        </el-select>
                    </el-col>
                </el-form-item>
            </el-form>
        </el-row>
            <div class="btn">
                <div class="btn1"  @click="cancelFnc">取消</div>
                <div class="btn2"  @click="addMessage">确定</div>
                
            </div>
        </el-dialog>
    </div>
</template>


<script>
import { userEdit,userAdd,agentArr,departmentArr } from '@/api/project'
export default {
    data() {
        return {
            formInfo: {
                username: '',
                nickname: '',
                password:'',
                mobile:'',
                email:'',
                department_id:'',
                agent_id:''
            },
            dialogVisible: false,
            rules: {
                username: [
                    { required: true, message: '请输入登录账号', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ],
                department_id: [
                    { required: true, message: '请选择部门id', trigger: 'blur' },
                ]
            },
            agentList: [],
            departmentList:[]
        }
    },

    beforeRouteLeave(to, from, next) {
        console.log('111111')
        next();
    },
    mounted() {
        console.log(this.$route)
    },
    methods: {
        cancelFnc(){
            this.formInfo={
                username: '',
                nickname: '',
                password:'',
                mobile:'',
                email:'',
                department_id:'',
                agent_id:''
            }
            this.dialogVisible = false;
        },

       async  getAgent(){
        let res = await agentArr({});
            console.log(res)
            if (res.code == 200) {
                this.agentList = res.data;
            }
        },
        async getDepartment(){
            let res = await departmentArr({per_page:10000});
            console.log(res)
            if (res.code == 200) {
                this.departmentList = res.data.list;
            }
        },
        open(row) {
           this.formInfo= {
                username: '',
                nickname: '',
                password:'',
                mobile:'',
                email:'',
                department_id:'',
                agent_id:''
            }
            if (row) {
                this.formInfo = row;
            }
            this.getAgent();
            this.getDepartment();
            this.dialogVisible = true;
        },
        async addMessage() {
            this.$refs.formInfo.validate(async(valid) => {
             if (valid) {
                let res ;
            if(this.formInfo.id){
                res = await userEdit(this.formInfo);
            }else{
                res = await userAdd(this.formInfo);
            }
             
            console.log(res)
            if (res.code == 200) {
                this.$message.success(res.msg);
                this.$emit('updateData')
                this.dialogVisible = false;
                return
            }
            this.$message.error(res.msg);
          } else {
           
            return false;
          }

        });
           
        },
    }
}
</script>

<style lang="scss" scoped>
.close {
    position: absolute;
    top: 8px;
    right: 10px;
}
::v-deep .el-dialog__header {
    background: linear-gradient(0deg, #2E6DFF 0%, #6280F5 100%);

    .el-dialog__title {
        color: white;
        font-size: 16px;
        font-weight: 600;
    }
}

.upload {
    width: 100px;
    height: 36px;
    background: #FFFFFF;
    border: 1px solid #2D6CFF;
    // border-: linear-gradient(0deg, #2D6CFF, #2172FF) 10 10;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;

    img {
        margin-right: 5px;
    }
}

.btn {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    div {
        width: 86px;
        height: 36px;
        background: #DCE3FD;
        border-radius: 4px;
        font-size: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 10px;
    }

    .btn1 {
        background: #DCE3FD;
        color: #2D6CFF;
    }

    .btn2 {
        background: linear-gradient(0deg, #6280F5 0%, #2D6CFF 100%);
        color: #FEFEFF;
    }
}
</style>

