<template>
  <div>
    <el-row >
      <el-form ref="thirdForm"  :disabled="![11,12,14,16].includes(projectInfo.status)" style="padding-left: 30px" :inline="true" :rules="thirdFormRules" :model="bidBaseProject"
        class="demo-form-inline">
        
          <div style="width: 100%;display: flex;flex-direction: row;align-items: center;justify-content: space-between;">
            <el-form-item label="采购代理机构制作招标文件具体日期填写" prop="bid_file_date"  style="width: 33%;">
            <el-date-picker v-model="bidBaseProject.bid_file_date" value-format="yyyy-MM-dd" type="date"
              placeholder="请选择采购意向公开日期">
            </el-date-picker>
          </el-form-item>
          <UploadCom title="采购代理机构招标文件(发售稿)" flex="row" :fileList="bidBaseProject.bid_file_issue"
                    @updateFile="(e) => updateFile(e, bidBaseProject.bid_file_issue)"   style="width: 33%;" />
          <UploadCom title="投标报名登记表" :fileList="bidBaseProject.bid_register_file"
            @updateFile="(e) => updateFile(e, bidBaseProject.bid_register_file)"   style="width: 33%;" />
          </div>

          <div style="width: 100%;display: flex;flex-direction: row;align-items: center;justify-content: space-between;">
          <el-form-item label="发布招标公告日期" prop="bid_publish_date" style="width: 33%;">
            <!-- <el-input v-model="thirdForm.input2"  /> -->
            <el-date-picker v-model="bidBaseProject.bid_publish_date" value-format="yyyy-MM-dd" type="date"
              placeholder="请选择发布招标公告日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="公示链接" prop="publish_link"  style="width: 33%;">
            <el-input v-model="bidBaseProject.publish_link" placeholder="请输入公示链接" />
          </el-form-item>
          <!-- <div style="display: block;"> -->
          <el-form-item :label="`公示图（${bidBaseProject.bid_publish_photo.length}/4）`" prop="bid_publish_photo"  style="width: 33%;">
            <el-upload :action="uploadUrl" :headers="headers" list-type="picture-card" :limit="4"
              :file-list="bidBaseProject.bid_publish_photo" :on-progress="handleProgress" :on-success="handleSuccess">
              <i slot="default" class="el-icon-plus"  v-if="[11,12,14,16].includes(projectInfo.status)"></i>
              <div slot="file" slot-scope="{ file }">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                <span class="el-upload-list__item-actions"  v-if="[11,12,14,16].includes(projectInfo.status)">
                  <span class="el-upload-list__item-delete" @click="handleRemove(file)">
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
            </el-upload>
          </el-form-item>
        </div>
        <div style="width: 100%;display: flex;flex-direction: row;align-items: center;justify-content: space-between;">
          <el-form-item label="开评标日期" prop="bid_open_date" style="width: 33%;">
            <el-date-picker value-format="yyyy-MM-dd" v-model="bidBaseProject.bid_open_date" type="date"
              placeholder="请选择开评标日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="是否有质疑/澄清" prop="doubt"  style="width: 33%;">
            <el-input v-model="bidBaseProject.doubt" type="textarea" placeholder="是否有质疑/澄清" />
          </el-form-item>
          <div  style="width: 33%;"></div>
        </div>
      </el-form>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="box-right1">
          <div class="files">
            <div class="title1">
              <img src="../../../assets/liucheng.png" alt="" />
              <span>附件</span>
            </div>
            <div class="file-form" style="display: flex;flex-direction: row;align-items: center;flex-wrap: wrap;justify-content: space-between;">
              <div class="file-form-item" style="width: 50%;" v-for="(item, index) in bidBaseProject.project_attachments" :key="index">
               
                <div class="left">
                  <div class="title"><span>{{ item.title }}</span></div>
                  <div class="input">
                    <el-input type="textarea" :rows="4" v-model="item.description" :placeholder="item.title">
                    </el-input>
                  </div>
                </div>
                <div class="right">
                  <UploadCom title="附件" :fileList="item.files" @updateFile="(e) => updateFile(e, item.files, index)" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <div style="display: flex;justify-content: center;align-items: center;width: 100%;">
      <el-button @click="saveFnc(false)" v-if="[11,12,14,16].includes(projectInfo.status)" v-permission="['project_registrar']"
        type="normal">保存草稿</el-button>
      <el-button @click="saveFnc(true)" v-if="[11, 12,14,16].includes(projectInfo.status)" v-permission="['project_registrar']"
        type="primary">提交</el-button>
      <el-button @click="auditFnc" v-if="projectInfo.status == 13" v-permission="['department_auditor']"
        type="primary">初审</el-button>
      <el-button @click="auditFncEnd" v-if="projectInfo.status == 15" v-permission="['department_auditor']"
        type="primary">终审</el-button>

    </div>
    <checkDialog ref="checkDialog" title="初审" @auditEmit="auditEmit"
      :radioList="[{ label: '拒绝', value: 14 }, { label: '通过', value: 15 },]" />
    <checkDialog ref="checkDialogEnd" title="终审" @auditEmit="auditEmitEnd"
      :radioList="[{ label: '拒绝', value: 16 }, { label: '通过', value: 17 },]" />


  </div>
</template>

<script>
import UploadCom from "./uploadCom.vue";
import checkDialog from "@/components/checkDialog.vue";
import {
  bidBaseSave,
  projectAudit,
  bidBaseSubmit
} from "@/api/project";
import { getToken } from '@/utils/auth'
export default {
  components: { UploadCom, checkDialog },
  data() {
    return {

      thirdFormRules: {
        bid_file_date: [
          {
            required: true,
            message: "请选择采购意向公开日期",
            trigger: "blur",
          },
        ],
        bid_publish_date: [
          {
            required: true,
            message: "请选择发布招标公告日期",
            trigger: "blur",
          },
        ],
        publish_link: [
          { required: true, message: "请输入公示链接", trigger: "blur" },
        ],
        bid_file_issue: [
          {
            required: true,
            message: "请上传采购代理机构招标文件(发售稿)",
            trigger: "blur",
          },
        ],
        bid_open_date: [
          { required: true, message: "请输入开评标日期", trigger: "blur" },
        ],
        bid_publish_photo: [
          { required: true, message: "请上传公示图", trigger: "blur" },
        ],
      },
    };
  },
  computed: {

    uploadUrl() {
      return process.env.VUE_APP_UPLOAD_API + '/user/upload_file'
    },
    headers() {
      return {
        "Authorization": `Bearer ${getToken()}`
      }
    },
    projectInfo() {
      return this.$store.state.thirdProjects.formInfo;
    },
    bidBaseProject() {
      return this.$store.state.thirdProjects.thirdData.bidBaseProject;
    }
  },
  methods: {
    handleRemove(file) {
      this.bidBaseProject.bid_publish_photo.forEach((val,index)=>{
        if(val==file){
          this.bidBaseProject.bid_publish_photo.splice(index,1)
        }
      })
    },
    handleProgress(e, file, fileList) {
      // console.log(e, file, fileList)
    },
    handleSuccess(e, file, fileList) {
      console.log(e, file, fileList, '----', this.bidBaseProject)
      if (e.code === 200) {
        e.data.title = e.data.file_name;
        this.bidBaseProject.bid_publish_photo.push(e.data)
        // this.$emit('updateFile',e.data)
        // this.fileList.push(e.data);
      }
    },
    updateFile(e, item, index) {
      console.log(e, item, index)
      if (typeof e == 'number') {
        itemm.splice(e, 1)
      } else {
        item.push(e)
      }
      console.log(this.$store.state.projectManagementAdd.project_attachments)
    },
    async auditFnc() {
      this.$refs.checkDialog.openDialog(true)
    },
    async auditFncEnd() {
      this.$refs.checkDialogEnd.openDialog(true)
    },
    async auditEmit(e) {
      console.log(e)
      let res = await projectAudit({ id: this.projectInfo.id, status: e.status });
      console.log(res)
      if (res.code == 200) {
        this.$message.success(res.msg);
        this.$emit('updateDetail')
        this.$refs.checkDialog.openDialog(false)

        return
      }
      this.$message.error(res.msg);
    },
    async auditEmitEnd(e) {
      console.log(e)
      let res = await projectAudit({ id: this.projectInfo.id, status: e.status });
      console.log(res)
      if (res.code == 200) {
        this.$message.success(res.msg);
        this.$emit('updateDetail')
        this.$refs.checkDialogEnd.openDialog(false)
        return
      }
      this.$message.error(res.msg);
    },
    async saveFnc(reqBool) {
      if(reqBool){
        this.$refs.thirdForm.validate(async (valid) => {
        if (valid) {
          if (this.bidBaseProject.bid_register_file.length == 0) {
            this.$message.error('投标报名登记表文件不能为空')
            return
          }
          if (this.bidBaseProject.bid_file_issue.length == 0) {
            this.$message.error('采购代理机构招标文件(发售稿)不能为空')
            return
          }
          console.log(this.bidBaseProject.project_attachments)
          if (!this.bidBaseProject.project_attachments[0].files.length || !this.bidBaseProject.project_attachments[1].files.length || !this.bidBaseProject.project_attachments[2].files.length) {
            this.$message.error('附件不能为空')
            return
          }
          let form = this.bidBaseProject;
          form.id = this.projectInfo.id;
          form.is_submit = 1;
          let res = await bidBaseSave(form);
          console.log(res)
          if (res.code == 200) {
            this.$message.success(res.msg)
            // setTimeout(()=>{this.$router.go(-1)},1000)
            this.$emit('updateDetail')


            return
          }
          this.$message.error(res.msg)
        } else {
          return false;
        }

      });
      }else{
        this.submitFnc();
      }
      
    },
    async submitFnc() {
      let form = this.bidBaseProject;
          form.id = this.projectInfo.id;
          let res = await bidBaseSave(form);
          console.log(res)
          if (res.code == 200) {
            this.$message.success(res.msg)
            // setTimeout(()=>{this.$router.go(-1)},1000)
            this.$emit('updateDetail')
            return
          }
          this.$message.error(res.msg)
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
          background: linear-gradient(90deg,
              #1d70ff 0%,
              rgba(29, 112, 255, 0) 100%);
        }
      }

      .active {
        color: #a6a9bc;

        div {
          background: linear-gradient(90deg,
              #a6a9bc 0%,
              rgba(166, 169, 188, 0) 100%);
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
