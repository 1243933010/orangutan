<template>
    <div>
        <el-dialog title="代办项目提示" center :visible.sync="dialogVisible" width="50%" :show-close="false">
            <div class="close">
                <img @click="dialogVisible = false" src="../../../assets/close_icon.png" alt="" srcset="">
            </div>
            <el-form class="form" ref="formInfo" :rules="rules" size="small" :model="formInfo" label-width="120px">
                <el-col :span="12">
                    <el-form-item label="上级部门" prop="parent_id" placeholder="请选择上级部门">
                        <el-select v-model="formInfo.parent_id">
                            <el-option label="无上级" :value="0" />
                            <el-option v-for="(item, index) in list" :label="item.name" :value="item.id" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="部门名称" prop="name" placeholder="请输入部门名称">
                        <el-input v-model="formInfo.name" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="显示排序" prop="sort" style="width: 100%;">
                        <el-input v-model="formInfo.sort" type="number" />
                    </el-form-item>
                </el-col>
                <el-col :span="13">
                    <el-form-item label="状态" prop="state">
                        <el-radio-group v-model="formInfo.state">
                            <el-radio :label="1">正常</el-radio>
                            <el-radio :label="2">禁用</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-form>
            <div class="btn">
                <div class="btn2" @click="addDepartment" >确定</div>
                <div class="btn1" @click="cancelFnc">取消</div>
            </div>
        </el-dialog>
    </div>
</template>


<script>
import { departmentList, departmentAdd,departmentEdit } from '@/api/project'

export default {
    data() {
        return {
            list: [],
            formInfo: {
                parent_id: '',
                state: 1,
                sort: 0
            },
            dialogVisible: false,
            rules: {
                parent_id: [
                    { required: true, message: '请选择', trigger: 'blur' },
                ],
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' },
                ]
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
            this.formInfo={
                parent_id: '',
                region: '',
                state: 1,
                sort: 0
            }
            this.dialogVisible = false;
        },
        async open(row) {
            if (row) {
                this.formInfo = row;
                // this.$refs.formInfo.res
            }
            let res = await departmentList();
            console.log(res)
            if (res.code == 200) {
                //   this.list = res.data;
                res.data.forEach(element => {
                    element.children = element.all_child_department
                });
                this.list = res.data
            }
            this.dialogVisible = true;
        },
        async addDepartment() {
            this.$refs.formInfo.validate(async(valid) => {
             if (valid) {
                let res ;
            if(this.formInfo.id){
                res = await departmentEdit(this.formInfo);
            }else{
                res = await departmentAdd(this.formInfo);
            }
             
            console.log(res)
            if (res.code == 200) {
                this.$message.success(res.msg);
                this.$emit('updateData')
                this.dialogVisible = false;
                return
            }
            this.$message.error(res.msg);
             }
            })
           
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