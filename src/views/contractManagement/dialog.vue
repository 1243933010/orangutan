<template>
    <div>
        <el-dialog  title="合同上传" center :visible.sync="dialogVisible" width="50%" :show-close="false">
            <div class="close">
                <img @click="dialogVisible=false" src="../../assets/close_icon.png" alt="" srcset="">
            </div>
           <div class="upload-class">
            <el-upload class="upload-demo" ref="uploads" :headers="headers"  drag :action="uploadUrl" multiple :on-success="handleSuccess">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
            </el-upload>
           </div>
            <div class="btn">
                <div class="btn1">取消</div>
                <div class="btn2"  v-if="[29,30,32,34].includes(+formInfo.status)"  @click="saveFnc"  v-permission="['project_registrar']">保存</div>
            </div>
        </el-dialog>
    </div>
</template>


<script>
import { getToken } from "@/utils/auth";
import {  saveContract,projectAudit,projectDetail} from "@/api/project";
export default {
    data() {
        return {
            dialogVisible: false,
            rules: {
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' },
                ]
            },
            fileList: []
        }
    },
    computed:{
        formInfo() {
      return this.$store.state.projectManagementAdd.formInfo;
    },
        uploadUrl() {
      return process.env.VUE_APP_UPLOAD_API + "/user/upload_file";
    },
    headers() {
      return {
        Authorization: `Bearer ${getToken()}`,
      };
    },
    },
    beforeRouteLeave(to, from, next) {
        // console.log('111111')
        next();
    },
    methods: {
        async getDetail(id){
      let res = await projectDetail(id);
      // console.log(res.data.attachments_content,JSON.parse(res.data.small_company))
      if(res.code==200){
        this.$store.commit("projectManagementAdd/UPDATE_FORMINFO", {
          ...res.data,
          input12: "true",
        });
        this.$store.commit(
          "projectManagementAdd/UPDATE_PROJECT_ATTACHMENTS",
          res.data.attachments_content
        );
        this.$store.commit(
          "projectManagementAdd/UPDATE_RADIOLABELLIST",
          JSON.parse(res.data.small_company)
        );
        this.$store.commit(
          "projectManagementAdd/update_contractList",
          res.data.contract
        );
        this.$store.commit(
          "projectManagementAdd/update_ImplementationCommissionForm",{type:'file',
          data:res.data.agent_check_videos}
        );
        this.$store.commit(
          "projectManagementAdd/update_ImplementationCommissionForm",
          {type:'form',
          data:res.data.agent_id});
      }
    },
        async saveFnc(){
            if(!this.fileList.length){
                this.$message.error('请上传文件');
                return
            }
        let form =  {files:this.fileList};
           form.id= this.formInfo.id;
           let res = await saveContract(form);
        //    console.log(res)
           if(res.code==200){
            this.dialogVisible = false;
            this.$message.success(res.msg)
            this.getDetail(this.formInfo.id);
            return
           }
           this.$message.error(res.msg)
    },
        open(id) {
            if (!id) {
                // this.$refs.formInfo.res
            }
           
            this.dialogVisible = true;
            
            this.fileList = [];
            this.$nextTick(()=>{
                this.$refs.uploads.clearFiles()
            })
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
       
        handleSuccess(e, file, fileList){
            // console.log(e, file, fileList,'----')
            if(e.code===200){
                e.data.title = e.data.file_name;
                this.fileList.push(e.data)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.upload-class{
    display: flex;
    flex-direction: column;
    align-items: center;
}
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
    padding-top: 20px;

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