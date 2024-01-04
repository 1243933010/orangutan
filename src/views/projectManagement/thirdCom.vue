<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="box-right1">
          <div class="files">
            <div class="file-form"
              style="display: flex;flex-direction: row;align-items: center;flex-wrap: wrap;justify-content: space-between;">
              <div class="file-form-item" style="width: 100%;" v-for="(item, index) in project_attachments0"
                :key="index">

                <div class="left">
                  <div class="title"><span>{{ item.title }}</span></div>
                  <div class="input">
                    <el-input type="textarea" :rows="4" v-model="item.description" :placeholder="item.title">
                    </el-input>
                  </div>
                </div>
                <div class="right">
                  <UploadCom title="附件" :is_required="item.is_required" :fileList="item.files" @updateFile="(e) => updateFile(e, item.files, index)" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-form ref="thirdForm" :disabled="![11, 12, 14, 16].includes(projectInfo.status)" style="padding-left: 30px"
        :inline="true" :rules="thirdFormRules" :model="bidBaseProject" class="demo-form-inline">

        <div style="width: 100%;display: flex;flex-direction: column;align-items: center;justify-content: space-between;">
          <el-form-item label="采购文件修订日期" prop="bid_file_date" style="width: 100%;">
            <el-date-picker v-model="bidBaseProject.bid_file_date" value-format="yyyy-MM-dd" type="date"
              placeholder="请选择采购文件修订日期">
            </el-date-picker>
          </el-form-item>
          <UploadCom title="采购文件（发售稿）" flex="row" :fileList="bidBaseProject.bid_file_issue"
            @updateFile="(e) => updateFile(e, bidBaseProject.bid_file_issue)" style="width: 100%;" />
            <!-- <el-form-item label="采购公告发布日期" prop="bid_publish_date" style="width: 33%;">
            <el-date-picker v-model="bidBaseProject.bid_publish_date" value-format="yyyy-MM-dd" type="date"
              placeholder="请选择采购公告发布日期">
            </el-date-picker>
          </el-form-item> -->
          <!-- <UploadCom title="投标报名登记表" :fileList="bidBaseProject.bid_register_file"
            @updateFile="(e) => updateFile(e, bidBaseProject.bid_register_file)" style="width: 33%;" /> -->
        </div>

        <div style="width: 100%;display: flex;flex-direction: row;align-items: center;justify-content: space-between;">
          <el-form-item label="采购公告发布日期" prop="bid_publish_date" style="width: 50%;">
            <el-date-picker v-model="bidBaseProject.bid_publish_date" value-format="yyyy-MM-dd" type="date"
              placeholder="请选择采购公告发布日期">
            </el-date-picker>
          </el-form-item> 
          <el-form-item label="采购公告链接" prop="publish_link" style="width: 50%;">
            <el-input v-model="bidBaseProject.publish_link" placeholder="请输入采购公告链接" />
          </el-form-item>        
        </div>
        <div style="width: 100%;display: flex;flex-direction: column;align-items: center;justify-content: space-between;">
          <el-form-item :label="`公示图（${bidBaseProject.bid_publish_photo.length}/4）`" prop="bid_publish_photo"
            style="width: 100%;">
            <el-upload :action="uploadUrl" :headers="headers" list-type="picture-card" :limit="4"
              :file-list="bidBaseProject.bid_publish_photo" :on-progress="handleProgress" :on-success="handleSuccess">
              <i slot="default" class="el-icon-plus" v-if="[11, 12, 14, 16].includes(projectInfo.status)"></i>
              <div slot="file" slot-scope="{ file }">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                <span class="el-upload-list__item-actions" v-if="[11, 12, 14, 16].includes(projectInfo.status)">
                  <span class="el-upload-list__item-delete" @click="handleRemove(file)">
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item label="开评标日期" prop="bid_open_date" style="width: 100%;">
            <el-date-picker value-format="yyyy-MM-dd" v-model="bidBaseProject.bid_open_date" type="date"
              placeholder="请选择开评标日期">
            </el-date-picker>
          </el-form-item>
        </div>
      </el-form>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="box-right1">
          <div class="files">
            <div class="file-form"
              style="display: flex;flex-direction: row;align-items: center;flex-wrap: wrap;justify-content: space-between;">
              <div class="file-form-item" style="width: 100%;" v-for="(item, index) in project_attachments1"
                :key="index">

                <div class="left">
                  <div class="title"><span>{{ item.title }}</span></div>
                  <div class="input">
                    <el-input type="textarea" :rows="4" v-model="item.description" :placeholder="item.title">
                    </el-input>
                  </div>
                </div>
                <div class="right">
                  <UploadCom title="附件" :is_required="item.is_required" :fileList="item.files" @updateFile="(e) => updateFile(e, item.files, index)" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>


  </div>
</template>

<script>
import UploadCom from '../thirdProjects/editCom/uploadCom.vue'
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
            message: "请上传采购文件（发售稿)",
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
      // console.log(this.$store.state.thirdProjects.formInfo,'33333333333333333333333')
      return this.$store.state.projectManagementAdd.formInfo;
    },
    bidBaseProject() {
      return this.$store.state.projectManagementAdd.thirdData.bidBaseProject;
    },
    project_attachments0(){
      let arr = []
       this.bidBaseProject.project_attachments.forEach(val=>{
        if(['委托招标函','采购文件确认函'].includes(val.title)){
          arr.push(val)
        }
       })
       return arr
    },
    project_attachments1(){
      let arr = []
       this.bidBaseProject.project_attachments.forEach(val=>{
        if(['质疑/澄清'].includes(val.title)){
          arr.push(val)
        }
       })
       return arr
    }
  },
  methods: {
    handleRemove(file) {
      this.bidBaseProject.bid_publish_photo.forEach((val, index) => {
        if (val == file) {
          this.bidBaseProject.bid_publish_photo.splice(index, 1)
        }
      })
    },
    handleProgress(e, file, fileList) {
      // console.log(e, file, fileList)
    },
    handleSuccess(e, file, fileList) {
      // console.log(e, file, fileList, '----', this.bidBaseProject)
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
      // console.log(this.$store.state.projectManagementAdd.project_attachments)
    },
    async auditFnc() {
      this.$refs.checkDialog.openDialog(true)
    },
    async auditFncEnd() {
      this.$refs.checkDialogEnd.openDialog(true)
    },
    async auditEmit(e) {
      // console.log(e)
      let res = await projectAudit({ id: this.projectInfo.id,...e });
      // console.log(res)
      if (res.code == 200) {
        this.$message.success(res.msg);
        this.$emit('updateDetail')
        this.$refs.checkDialog.openDialog(false)

        return
      }
      this.$message.error(res.msg);
    },
    async auditEmitEnd(e) {
      // console.log(e)
      let res = await projectAudit({ id: this.projectInfo.id, status: e.status });
      // console.log(res)
      if (res.code == 200) {
        this.$message.success(res.msg);
        this.$emit('updateDetail')
        this.$refs.checkDialogEnd.openDialog(false)
        return
      }
      this.$message.error(res.msg);
    },
    async saveFnc(reqBool) {
      if (reqBool) {
        this.$refs.thirdForm.validate(async (valid) => {
          if (valid) {
            // if (this.bidBaseProject.bid_register_file.length == 0) {
            //   this.$message.error('投标报名登记表文件不能为空')
            //   return
            // }
            if (this.bidBaseProject.bid_file_issue.length == 0) {
              this.$message.error('采购文件（发售稿）不能为空')
              return
            }
            // console.log(this.bidBaseProject.project_attachments)
            for(let i =0;i<this.bidBaseProject.project_attachments.length;i++){
              if(this.bidBaseProject.project_attachments[i].is_required==1&&this.bidBaseProject.project_attachments[i].files.length==0){
                this.$message.error('附件不能为空')
                 return
              }
            }

            let form = this.bidBaseProject;
            form.id = this.projectInfo.id;
            form.is_submit = 1;
            let res = await bidBaseSave(form);
            // console.log(res)
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
      } else {
        this.submitFnc();
      }

    },
    async submitFnc() {
      let form = this.bidBaseProject;
      form.id = this.projectInfo.id;
      let res = await bidBaseSave(form);
      // console.log(res)
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
          width: 35%;

          .title {
            color: #404659;
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 14px;
          }
        }

        .right {
          width: 65%;
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
                width: 120px;
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
}</style>
