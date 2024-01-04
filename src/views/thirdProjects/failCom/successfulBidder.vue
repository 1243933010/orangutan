<template>
  <div>
    <el-form
      ref="thirdForm"
      style=""
      :inline="true"
      :rules="thirdFormRules"
      :model="resultData"
      class="demo-form-inline"
      :disabled="![23,24,26,28].includes(projectInfo.status)"
      label-width="180px"
    >
    
        <div style="display: flex;flex-direction: row;margin-bottom: 20px;">
          <el-form-item label="中标金额" prop="bid_success_amount"  style="width: 33%;">
          <el-input v-model="resultData.bid_success_amount" placeholder="请输入中标金额">
            <span slot="suffix">元</span>
          </el-input>
        </el-form-item>
        <el-form-item label="中标单位" prop="bid_success_unit" style="width: 33%;">
          <el-input v-model="resultData.bid_success_unit" placeholder="请输入中标单位">
          </el-input>
        </el-form-item>
        <el-form-item label="联系姓名" prop="bid_success_contact" style="width: 33%;">
          <el-input v-model="resultData.bid_success_contact" placeholder="请输入联系人">
          </el-input>
        </el-form-item>
        </div>
        <div style="display: flex;flex-direction: row;margin-bottom: 20px;">
        <el-form-item label="联系电话" prop="bid_success_phone" style="width: 33%;">
          <el-input v-model="resultData.bid_success_phone" placeholder="请输入联系电话">
          </el-input>
        </el-form-item>
        <el-form-item label="公示链接" prop="bid_success_link" style="width: 33%;">
          <el-input v-model="resultData.bid_success_link" placeholder="请输入公示链接">
          </el-input>
        </el-form-item>
        <el-form-item label="发布中标公告日期" prop="bid_success_publish_date" style="width: 33%;">
          <el-date-picker
            v-model="resultData.bid_success_publish_date"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="请选择发布中标公告日期"
          >
          </el-date-picker>
        </el-form-item>
        
      </div>
      <div style="display: flex;flex-direction: row;align-items: center;margin-bottom: 20px;">
        <el-form-item :label="`公示图(${resultData.bid_success_photo.length}/4)`" prop="input3" style="width: 33%;">
          <el-upload
             :action="uploadUrl"
             :headers="headers"
              list-type="picture-card"
              :limit="4"
              :file-list="resultData.bid_success_photo"
              :on-progress="handleProgress"
              :on-success="handleSuccess"
            >
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{ file }">
                <img
                  class="el-upload-list__item-thumbnail"
                  :src="file.url"
                  alt=""
                />
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                  >
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
            </el-upload>
        </el-form-item>
        <el-form-item label="中标供应商企业类型" prop="bid_success_unit_type" style="width: 33%;">
          <el-select
            v-model="resultData.bid_success_unit_type"
            placeholder="请选择中标供应商企业类型"
          >
            <el-option label="大型" value="大型" />
            <el-option label="中型" value="中型" />
            <el-option label="小微" value="小微" />
          </el-select>
        </el-form-item>
        <el-form-item label="中标供应商企份额" prop="bid_success_unit_per" style="width: 33%;">
          <el-input
            v-model="resultData.bid_success_unit_per"
            placeholder="请输入中标供应商企份额"
          >
            <span slot="suffix">%</span>
          </el-input>
        </el-form-item>
        
      </div>
      <div style="display: flex;flex-direction: row;">
        <el-form-item label="中标通知书日期" prop="bid_success_notice_date" style="width: 33%;">
          <el-date-picker
            v-model="resultData.bid_success_notice_date"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择开评标日期"
          >
          </el-date-picker>
        </el-form-item>
       <div style="padding-left: 40px;width: 33%;">
        <UploadCom
          title="中标通知书/成交结果通知书"
          :fileList="resultData.bid_success_notice"
          @updateFile="(e)=>updateFile(e,resultData.bid_success_notice)"
        />
       </div>
        
      </div>
    </el-form>
    
        <div class="box-right1">
          <div class="files">
            <div class="title1">
              <img src="../../../assets/liucheng.png" alt="" />
              <span>附件</span>
            </div>
            <div class="file-form">
              <!-- <div class="file-form-item">
                <div class="left">
                  <div class="title"><span>举报/质疑/投诉</span></div>
                  <div class="input">
                    <el-input
                    v-model="resultData."
                      type="textarea"
                      :rows="4"
                      placeholder="举报/质疑/投诉。"
                    >
                    </el-input>
                  </div>
                </div>
                <div class="right">
                  <UploadCom title="附件" :fileList="resultData.project_attachments[0].files" @updateFile="(e)=>updateFile(e,resultData.project_attachments[0].files)" />
                </div>
              </div> -->
              <div class="file-form-item" style="width: 60%;"   v-for="(item,index) in resultData.project_attachments" :key="index">
              <div class="left">
                <div class="title"><span>{{ item.title }}</span></div>
                <div class="input">
                  <el-input type="textarea" :rows="4" v-model="item.description" :placeholder="item.title">
                  </el-input>
                </div>
              </div>
              <div class="right">
                <UploadCom title="附件"  :fileList="item.files" @updateFile="(e)=>updateFile(e,item.files,index)" />
              </div>
            </div>
            </div>
          </div>
        </div>
    <div style="display: flex;justify-content: center;align-items: center;width: 100%;">
      <el-button    @click="saveFnc(false)"   v-if="[23,24,26,28].includes(projectInfo.status)" v-permission="['project_registrar']"  type="normal">保存草稿</el-button>
      <el-button  @click="saveFnc(true)"  v-if="[23,24,26,28].includes(projectInfo.status)" v-permission="['project_registrar']"  type="primary">提交</el-button>
      <el-button  @click="auditFnc"  v-if="projectInfo.status == 25" v-permission="['department_auditor']"  type="primary">初审</el-button>
      <el-button   @click="auditFncEnd" v-if="projectInfo.status == 27" v-permission="['department_auditor']"  type="primary">终审</el-button>

    </div>
    <checkDialog ref="checkDialog" title="初审"  @auditEmit="auditEmit" :radioList="[ { label: '拒绝', value: 26 }, { label: '通过', value: 27 },]" />
    <checkDialog ref="checkDialogEnd" title="终审"  @auditEmit="auditEmitEnd" :radioList="[ { label: '拒绝', value: 28 }, { label: '通过', value: 29 },]" />

    
  </div>
</template>

<script>
import UploadCom from "./uploadCom.vue";
import checkDialog from "@/components/checkDialog.vue";
import { getToken } from '@/utils/auth'
import { bidResultSave ,resultOpenSubmit,projectAudit} from "@/api/project";
export default {
  components: { UploadCom ,checkDialog},
  data() {
    return {
      thirdFormRules: {
        bid_success_publish_date: [{ required: true, message: "请选择中标发布日期",trigger: "blur",},],
        bid_success_notice_date: [{ required: true, message: "请选择标告知书日期", trigger: "blur", }, ],
        bid_success_amount: [{ required: true, message: "请输入中标金额", trigger: "blur" }, ],
        bid_success_unit: [{ required: true, message: "请输入单位", trigger: "blur" }, ],
        bid_success_phone: [{ required: true, message: "请输入电话", trigger: "blur" }, ],
        bid_success_contact: [{ required: true, message: "请输入联系人", trigger: "blur" }, ],
        bid_success_link: [{ required: true, message: "请输入公示链接", trigger: "blur" }, ],
        bid_success_unit_type: [{ required: true, message: "请输入企业类型", trigger: "blur" }, ],
        bid_success_unit_per: [{ required: true, message: "请输入企业份额", trigger: "blur" }, ],
        bid_success_photo: [{ required: true, message: "请上传中标图片", trigger: "blur" }, ],
        bid_success_notice: [{ required: true, message: "请上传中标告知书", trigger: "blur" }, ],
      },
     
    };
  },
  computed:{
    projectInfo() {
      return this.$store.state.thirdProjects.formInfo;
    },
    resultData(){
      return this.$store.state.thirdProjects.thirdData.resultData;
    },
    uploadUrl(){
            return  process.env.VUE_APP_UPLOAD_API+'/user/upload_file'
        },
        headers(){
            return {
                "Authorization":`Bearer ${getToken()}`
            }
        },
  },
  methods:{
    updateFile(e,item,index){
        console.log(e,item,index)
        if(typeof e == 'number'){
          item.splice(e,1)
        }else{
          item.push(e)
        }
        console.log(this.$store.state.projectManagementAdd.project_attachments)
      },
    async saveFnc(reqBool){
      if(!reqBool){
        this.submitFnc();
        return
      }
      let resultData = this.$store.state.thirdProjects.thirdData.resultData;

      this.$refs.thirdForm.validate(async(valid) => {
          if (valid) {
            if(!resultData.bid_success_photo.length){
            this.$message.error('请上传图片');
            return
            }
         if(!resultData.bid_success_notice.length){
            this.$message.error('请上传中标通知书/成交结果通知书');
            return
            }
            // if(!resultData.project_attachments[0].files.length){
            // this.$message.error('请上传附件');
            // return
            // }
         let form =  this.$store.state.thirdProjects.thirdData.resultData;
           form.id= this.projectInfo.id;
           form.is_submit = 1;
           console.log(form);
          //  return
           let res = await bidResultSave(form);
           console.log(res)
           if(res.code==200){
            this.$message.success(res.msg)
            this.$emit('updateDetail')

            return
           }
           this.$message.error(res.msg)
          } else {
           
            return false;
          }

        });

      
       
    },
   async submitFnc(){
    let form =  this.$store.state.thirdProjects.thirdData.resultData;
           form.id= this.projectInfo.id;
           console.log(form);
          //  return
           let res = await bidResultSave(form);
           console.log(res)
           if(res.code==200){
            this.$message.success(res.msg)
            this.$emit('updateDetail')

            return
           }
           this.$message.error(res.msg)
    },
    handleProgress(e, file, fileList) {
            // console.log(e, file, fileList)
        },
        handleSuccess(e, file, fileList){
            console.log(e, file, fileList,'----')
            if(e.code===200){
                e.data.title = e.data.file_name;
                this.resultData.bid_success_photo.push(e.data)
                // this.$emit('updateFile',e.data)
                // this.fileList.push(e.data);
            }
        },
    async auditFnc(){
      this.$refs.checkDialog.openDialog(true)
    },
    async auditFncEnd(){
      this.$refs.checkDialogEnd.openDialog(true)
    },
    async auditEmit(e){
      console.log(e)
      let res = await projectAudit({id:this.projectInfo.id,...e});
      console.log(res)
      if(res.code==200){
        this.$message.success(res.msg);
        this.$emit('updateDetail')
        this.$refs.checkDialog.openDialog(false)
        return
      }
      this.$message.error(res.msg);
    },
    async auditEmitEnd(e){
      console.log(e)
      let res = await projectAudit({id:this.projectInfo.id,...e});
      console.log(res)
      if(res.code==200){
        this.$message.success(res.msg);
        this.$emit('updateDetail')
        this.$refs.checkDialogEnd.openDialog(false)
        return
      }
      this.$message.error(res.msg);
    },
  }
};
</script>

<style lang="scss" scoped>
.radio-item-child {
  padding-left: 20px;
}

.radio-item {
  display: flex;
  flex-direction: row;
  padding-left: 20px;
  // align-items: center;
  cursor: pointer;

  span {
    max-width: 80%;
    display: flex;
    flex-wrap: wrap;
  }

  .radio-class {
    border: 1px solid #dcdfe6;
    border-radius: 100%;
    width: 14px;
    height: 14px;
    background-color: #fff;
    position: relative;
    cursor: pointer;
    display: inline-block;
    box-sizing: border-box;
    margin-top: 10px;
    margin-right: 10px;

    &::after {
      content: "";
      width: 0;
      height: 0;
      border-radius: 50%;
      transform: translate(-50%, -50%) scale(0);
      transition: transform 0.15s ease-in;
      position: absolute;
      left: 50%;
      top: 50%;
      background-color: white;
    }

    &.active {
      background: #409eff;

      &::after {
        width: 5px;
        height: 5px;
        transform: translate(-50%, -50%) scale(1);
      }
    }
  }
}

.box {
  // padding-bottom: 35px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;

  .box-left {
    display: flex;
    height: auto;
    background-color: white;
    max-width: 1000px;

    .form {
      min-width: 500px;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      background-color: white;
      padding-bottom: 35px;
    }

    // max-width: 1100px;
    .step1 {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      box-sizing: border-box;
      padding: 74px 0 0 58px;
      margin-bottom: 37px;

      .item {
        font-size: 14px;
        color: #1d70ff;
        margin-right: 46px;
        display: flex;
        flex-direction: row;
        align-items: center;

        img {
          width: 14px;
          margin-right: 15px;
        }

        span {
          margin-right: 18px;
        }

        div {
          width: 80px;
          height: 2px;
          background: linear-gradient(
            90deg,
            #1d70ff 0%,
            rgba(29, 112, 255, 0) 100%
          );
        }
      }

      .active {
        color: #a6a9bc;

        div {
          background: linear-gradient(
            90deg,
            #a6a9bc 0%,
            rgba(166, 169, 188, 0) 100%
          );
        }
      }
    }
  }
}
.box-right1 {
  display: flex;
  flex-grow: 1;
  background-color: white;
  box-sizing: border-box;
  // border-left: 1px solid #EAEDEC;

  .files {
    box-sizing: border-box;
    padding-top: 20px;
    padding-left: 20px;
    width: 100%;

    .title1 {
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: 16px;
      color: #454d65;
      font-weight: 600;
      margin-bottom: 20px;

      img {
        width: 14px;
        margin-right: 8px;
      }
    }

    .file-form {
      .file-form-item {
        display: flex;
        flex-direction: row;
        margin-bottom: 40px;

        .left {
          width: 50%;

          .title {
            color: #404659;
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 14px;
          }
        }

        .right {
          width: 50%;
          box-sizing: border-box;
          padding-left: 16px;

          .title {
            color: #404659;
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 14px;
          }

          .upload {
            display: flex;
            flex-direction: column;

            .file-list {
              display: flex;
              flex-direction: column;

              .item {
                display: flex;
                flex-direction: row;
                align-items: center;
                margin-bottom: 13px;

                .file-icon {
                  width: 16px;
                  height: 13px;
                  margin-right: 6px;
                }

                span {
                  color: #404659;
                  font-size: 14px;
                  margin-right: 12px;
                }

                .delete {
                  width: 14px;
                  height: 15px;
                }
              }
            }

            .upload-btn {
              display: flex;
              justify-content: center;
              align-items: center;

              .btn {
                width: 100px;
                height: 36px;
                border: 1px solid #2d6cff;
                // background: #FFFFFF;
                border-radius: 4px;
                margin-right: 19px;
              }

              span {
                font-size: 12px;
                color: #a6a9bc;
              }
            }
          }
        }

        // align-items: center;
      }
    }
  }
}
</style>
