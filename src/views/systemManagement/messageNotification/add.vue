<template>
    <div>
        <el-dialog title="代办项目提示" center :visible.sync="dialogVisible" width="50%" :show-close="false">
            <div class="close">
                <img @click="dialogVisible=false" src="../../../assets/close_icon.png" alt="" srcset="">
            </div>
            <el-row>
            <el-form class="form" ref="formInfo" :rules="rules" size="small" :model="formInfo" label-width="120px">
               
                    <el-form-item label="消息标题" prop="name">
                        <el-col :span="8">
                        <el-input type="text" v-model="formInfo.title"  placeholder="请输入消息标题" /> 
                    </el-col>
                    </el-form-item>
               
                <el-form-item label="接收部门" prop="department_id" placeholder="请选择接收部门">
                    <el-col :span="8">
                    <el-select v-model="formInfo.department_id" placeholder="请选择">
                        <el-option v-for="(item, index) in list" :key="index" :label="item.name" :value="item.id" />
                    </el-select>
                </el-col>
                </el-form-item>
                <el-form-item label="消息内容" prop="content" style="width: 100%;">
                <el-col :span="8">
                    <el-input v-model="formInfo.content" type="textarea" />
                </el-col>
                </el-form-item>
                <!-- <el-form-item label="附件上传" prop="name" style="width: 100%;">
                    <div>1111</div>
                    <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false" :limit="3" :on-exceed="handleExceed" :file-list="fileList"
                        :on-progress="handleProgress">
                        <div style="display: flex;flex-direction: row;align-items: center;">
                            <div class="upload">
                                <img src="../../../assets/upload_icon.png" alt="" srcset="">
                                <span>上传文件</span>
                            </div>
                            <div slot="tip" class="el-upload__tip">支持扩展名: .rar .zip .doc 、docx .pdf.jpg..</div>
                        </div>
                    </el-upload>
                </el-form-item> -->
            </el-form>
        </el-row>
            <div class="btn">
                <div class="btn1" @click="cancelFnc">取消</div>
                <div class="btn2" @click="addMessage">发布</div>
            </div>
        </el-dialog>
    </div>
</template>


<script>
import { noticeEdit,noticeAdd,departmentArr } from "@/api/project";

export default {
    data() {
        return {
            formInfo: {
                title: '',
                department_id: '',
                content:''
            },
            dialogVisible: false,
            rules: {
                title: [
                    { required: true, message: '请输入名称', trigger: 'blur' },
                ],
                department_id: [
                    { required: true, message: '请选择接收部门', trigger: 'blur' },
                ],
                content: [
                    { required: true, message: '请输入消息内容', trigger: 'blur' },
                ]
            },
            list: []
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
                title: '',
                department_id: '',
                content:''
            }
            this.dialogVisible = false;
        },
        async open(row) {
            this.formInfo={
                title: '',
                department_id: '',
                content:''
            }
            if (row) {
                this.formInfo = row;
                // this.$refs.formInfo.res
            }
            this.dialogVisible = true;
            let res = await departmentArr({per_page:1000});
            console.log(res)
            if (res.code == 200) {
                this.list = res.data.list;
            }
           
        },
        async addMessage() {
            this.$refs.formInfo.validate(async(valid) => {
             if (valid) {
                let res ;
            if(this.formInfo.id){
                res = await noticeEdit(this.formInfo);
            }else{
                res = await noticeAdd(this.formInfo);
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
        // handleExceed(files, fileList) {
        //     this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        // },
        // handleProgress(e, file, fileList) {
        //     console.log(e, file, fileList)
        // }
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
}</style>