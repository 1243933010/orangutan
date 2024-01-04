<template>
    <div>
        <el-dialog title="代办项目提示" center :visible.sync="dialogVisible" width="50%" :show-close="false">
            <div class="close">
                <img @click="dialogVisible = false" src="../../../assets/close_icon.png" alt="" srcset="">
            </div>
            <el-form class="form" ref="formInfo" :rules="rules" size="small" :model="formInfo" label-width="120px">

                <el-col :span="12">
                    <el-form-item label="名称" prop="name" placeholder="请输入名称">
                        <el-input v-model="formInfo.name" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="地址" prop="address" placeholder="请输入地址">
                        <el-input v-model="formInfo.address" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="联系电话" prop="contact_phone" placeholder="请输入联系电话">
                        <el-input v-model="formInfo.contact_phone" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="排序" prop="sort" style="width: 100%;">
                        <el-input v-model="formInfo.sort" type="number" />
                    </el-form-item>
                </el-col>
            </el-form>
            <div class="btn">
                <div class="btn2" @click="addDepartment">确定</div>
                <div class="btn1" @click="cancelFnc">取消</div>
            </div>
        </el-dialog>
    </div>
</template>


<script>
import { departmentList, agentAdd, agentEdit } from '@/api/project'

export default {
    data() {
        return {
            list: [],
            formInfo: {
                address: '',
                name: '',
                sort: 0,
                contact_phone: ''
            },
            dialogVisible: false,
            rules: {
                address: [
                    { required: true, message: '请输入地址', trigger: 'blur' },
                ],
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' },
                ],
                contact_phone: [
                    { required: true, message: "请输入联系电话", trigger: "blur" },
                    {
                        pattern: /^1[3456789]\d{9}$/,
                        message: "请输入正确的手机号码或者座机号",
                    },
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
        cancelFnc() {
            this.formInfo = {
                address: '',
                name: '',
                sort: 0,
                contact_phone: ''
            }
            this.dialogVisible = false;
        },
        async open(row) {
            this.formInfo = {};
            if (row) {
                this.formInfo = row;
                // this.$refs.formInfo.res
            }
            this.dialogVisible = true;
        },
        async addDepartment() {
            this.$refs.formInfo.validate(async (valid) => {
                if (valid) {
                    let res;
                    if (this.formInfo.id) {
                        res = await agentEdit(this.formInfo);
                    } else {
                        res = await agentAdd(this.formInfo);
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