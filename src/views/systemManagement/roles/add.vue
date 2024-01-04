<template>
    <div>
        <el-dialog title="添加角色" center :visible.sync="dialogVisible" width="50%" :show-close="false">
            <div class="close">
                <img @click="dialogVisible=false" src="../../../assets/close_icon.png" alt="" srcset="">
            </div>
            <el-form class="form" ref="formInfo" :rules="rules" size="small" :model="formInfo" label-width="120px">
                <el-col :span="12">
                    <el-form-item label="角色名称" prop="name" placeholder="请输入角色名称">
                        <el-input v-model="formInfo.name" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                <el-form-item label="权限字符" prop="code">
                    <el-select v-model="formInfo.code"  placeholder="请选择权限字符">
                        <el-option label="Zone one" value="shanghai" />
                        <el-option label="Zone two" value="beijing" />
                    </el-select>
                </el-form-item>
            </el-col>
                <el-col :span="12">
            <el-form-item label="角色状态" prop="state">
                    <el-radio-group v-model="formInfo.state">
                        <el-radio :label="1">正常</el-radio>
                        <el-radio :label="0">停用</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-col>
            <!-- <el-form-item label="菜单权限" prop="region">
                    <el-select v-model="formInfo.region"  placeholder="请选择菜单权限">
                        <el-option label="Zone one" value="shanghai" />
                        <el-option label="Zone two" value="beijing" />
                    </el-select>
                </el-form-item> -->
            <el-form-item label="备注" prop="remake">
                    <el-input v-model="formInfo.remake" type="textarea" />
                </el-form-item>
            </el-form>
            <div class="btn">
                <div class="btn2" @click="handleSubmit">确定</div>
                <div class="btn1" @click="cancelFnc">取消</div>
            </div>
        </el-dialog>
    </div>
</template>


<script>
import { roleAdd } from '@/api/project'

export default {
    data() {
        return {
            formInfo: {
                name: '',
                remake: '',
                sort:0,
                code:[],
                state:1
            },
            dialogVisible: false,
            rules: {
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' },
                ],
                code: [
                    { required: true, message: '请选择权限', trigger: 'blur' },
                ],
            },
            fileList: []
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
            this. formInfo={
                name: '',
                remake: '',
                sort:0,
                code:[],
                state:1
            },
            this.dialogVisible = false;
        },
        async handleSubmit() {
            let res ;
            if(this.formInfo.id){
                res = await departmentEdit(this.formInfo);
            }else{
                res = await roleAdd(this.formInfo);
            }
             
            console.log(res)
            if (res.code == 200) {
                this.$message.success(res.msg);
                this.$emit('updateData')
                this.dialogVisible = false;
                return
            }
            this.$message.error(res.msg);
        },
        open(id) {
            if (!id) {
                // this.$refs.formInfo.res
            }
            this.dialogVisible = true;
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        handleProgress(e, file, fileList) {
            console.log(e, file, fileList)
        }
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
    .btn1{
        background: #DCE3FD;
        color: #2D6CFF;
    }
    .btn2{
        background: linear-gradient(0deg, #6280F5 0%, #2D6CFF 100%);
        color: #FEFEFF;
    }
}
</style>