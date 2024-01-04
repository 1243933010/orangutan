<template>
  <div style="height: auto">
    <div class="box">
      <div class="box-left">
        <div class="steps">
          <Steps :stepList="stepList" />
        </div>
        <div class="form">
          <div class="background-icon">
            <span class="title">基本信息</span>
          </div>

          <BasicMsg :disabled="true" />

          <div style="padding-top: 30px;">

            <el-form ref="formInfo" :disabled="![5, 6, 8, 10].includes(projectInfo.status)" :inline="true" :rules="rules"
              :model="formInfo" class="demo-form-inline" label-width="100px">
              <el-col :span="14">
                <el-form-item label="项目编号" prop="no" placeholder="请输入项目编号">
                  <el-input v-model="formInfo.no" type="text" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="抽取编号" prop="choose_no" placeholder="请输入抽取编号">
                  <el-input v-model="formInfo.choose_no" type="text" />
                </el-form-item>
              </el-col>
              
              <el-col :span="14">
                <el-form-item label="抽取时间" prop="choose_time">
                  <el-date-picker value-format="yyyy-MM-dd" v-model="formInfo.choose_time" type="date"
                    placeholder="请选择抽取时间">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="24">
              <div class="file-form" style="padding-left: 30px;">
                <div class="file-form-item" v-for="(item, index) in formInfo.agent_receipt" :key="index">
                  <div class="left">
                    <div class="title"><span><span style="color: red;">*</span>{{ item.title }}</span></div>
                    <div class="input">
                      <el-input  type="textarea" :rows="4" v-model="item.description" placeholder="">
                      </el-input>
                    </div>
                  </div>
                  <div class="right">
                    <UploadCom title="附件" :fileList="item.files" @updateFile="(e) => updateFile(e, item, index)" />
                  </div>
                </div>

              </div>
            </el-col>
              <el-col :span="24">
                <el-form-item label="抽取采购代理机构登记" prop="files" label-width="170px">
                  <el-upload :action="uploadUrl" :headers="headers" list-type="picture-card" :limit="5"
                    :file-list="formInfo.files" :before-upload="beforeAvatarUpload" :on-success="handleSuccess">
                    <i slot="default" class="el-icon-plus" v-if="[5, 6, 8, 10].includes(projectInfo.status)"></i>
                    <div class="el-upload__tip" slot="tip">
                      只能上传图片或视频
                    </div>
                    <div slot="file" slot-scope="{file,index,list}">
                      <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                      <span class="el-upload-list__item-actions" v-if="[5, 6, 8, 10].includes(projectInfo.status)">
                        <span class="el-upload-list__item-delete" @click="handleRemove(file)">
                          <i class="el-icon-delete"></i>
                        </span>
                      </span>
                    </div>
                  </el-upload>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="采购代理名称" prop="agent_id" label-width="115px">
                  <el-select v-model="formInfo.agent_id" placeholder="请选择采购代理名称">
                    <el-option v-for="(item, index) in agentArr" :key="index" :label="item.name" :value="item.id" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
              <div class="file-form" style="padding-left: 10px;">
                <div class="file-form-item" v-for="(item, index) in formInfo.purchase_meeting" :key="index">
                  <div class="left">
                    <div class="title"><span><span style="color: red;">*</span>{{ item.title }}</span></div>
                    <div class="input">
                      <el-input  type="textarea" :rows="4" v-model="item.description" placeholder="">
                      </el-input>
                    </div>
                  </div>
                  <div class="right">
                    <UploadCom title="附件" :fileList="item.files" @updateFile="(e) => updateFile(e, item, index)" />
                  </div>
                </div>

              </div>
            </el-col>
              <!-- v-if="[14,16].includes(projectInfo.status)" -->

            </el-form>
          </div>
          <!-- <div style="display: flex;flex-direction: row;" v-if="[14,16].includes(projectInfo.status)">
            <span style="color: red;font-size: 14px;">实施委托审核意见:</span>
            <el-input  :disabled="true" style="max-width: 300px;" type="textarea" :rows="4" v-model="projectInfo.description" ></el-input>
          </div> -->
          <div >
            <div style="display: flex;flex-direction: row;" v-if="projectInfo.reject_log&&[8,10].includes(projectInfo.reject_log.status)">
              <span style="color: red;font-size: 14px;">部门录入审核意见:</span>
              <el-input :disabled="true" style="max-width: 300px;" type="textarea" :rows="4"
                v-model="projectInfo.reject_log.description"></el-input>
            </div>
          </div>
          <div class="btnn">
            <div class="btn1" @click="() => {
              this.$router.go(-1);
            }
              ">
              返回
            </div>
            <div class="btn2" @click="saveFnc(true)" v-if="[5, 6, 8, 10].includes(projectInfo.status)"
              v-permission="['project_registrar']">
              提交
            </div>
            <div class="btn3" @click="saveFnc(false)" v-if="[5, 6, 8, 10].includes(projectInfo.status)"
              v-permission="['project_registrar']">
              保存草稿
            </div>
            <div class="btn4" @click="auditFnc" v-if="projectInfo.status == 7" v-permission="['department_auditor']">
              初审
            </div>
            <div class="btn4" @click="auditFncEnd" v-if="projectInfo.status == 9" v-permission="['department_auditor']">
              终审
            </div>
          </div>
        </div>
      </div>
      <AnnexCom />
    </div>

    <checkDialog ref="checkDialog" title="初审" @auditEmit="auditEmit" :radioList="[
      { label: '拒绝', value: 8 },
      { label: '通过', value: 9 },
    ]" />
    <checkDialog ref="checkDialogEnd" title="终审" @auditEmit="auditEmitEnd" :radioList="[
      { label: '拒绝', value: 10 },
      { label: '通过', value: 11 },
    ]" />
  </div>
</template>

<script>
import Steps from "@/components/steps.vue";
import { addMixins } from "./mixins";
import BasicMsg from "./basicMsg.vue";
import AnnexCom from "./annex.vue";
import {
  projectDetail,
  saveImplement,
  submitImplement,
  projectAudit,
  agentList
} from "@/api/project";
import { getToken } from "@/utils/auth";
import checkDialog from "@/components/checkDialog.vue";
import UploadCom from '../thirdProjects/editCom/uploadCom.vue'
export default {
  mixins: [addMixins],
  components: { Steps, BasicMsg, AnnexCom, checkDialog,UploadCom },
  data() {
    return {
      rules: {
        agent_id: [
          { required: true, message: "请选择需求单位", trigger: "blur" },
        ],
        choose_no: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        choose_time: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        no: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        files: [{ required: true, message: "请上传图片或者视频", trigger: "blur" }],
      },
      agentArr: [],
    };
  },

  mounted() {
    let route = this.$route;
    // console.log(route);
    this.getDetail(route.query.id);
    this.getAgentList()

  },
  computed: {
    uploadUrl() {
      return process.env.VUE_APP_UPLOAD_API + "/user/upload_file";
    },
    headers() {
      return {
        Authorization: `Bearer ${getToken()}`,
      };
    },
    formInfo() {
      return this.$store.state.projectManagementAdd.ImplementationCommissionForm;
    },
    projectInfo() {
      return this.$store.state.projectManagementAdd.formInfo;
    },
  },
  methods: {
    updateFile(e,item,index){
      // console.log(e,item,index)
      if(typeof e =='number'){
        itemm.files.splice(e,1)
      }else{
        item.files.push(e)
      }
      // console.log( this.$store.state.projectManagementAdd.ImplementationCommissionForm)
    },
    async auditFnc() {
      this.$refs.checkDialog.openDialog(true)
    },
    async auditFncEnd() {
      this.$refs.checkDialogEnd.openDialog(true)
    },
    async auditEmit(e) {
      // console.log(e)
      let res = await projectAudit({ id: this.$store.state.projectManagementAdd.formInfo.id, ...e });
      // console.log(res)
      if (res.code == 200) {
        this.$message.success(res.msg);
        this.$refs.checkDialog.openDialog(false)
        this.getDetail(this.$route.query.id)

        return
      }
      this.$message.error(res.msg);
    },
    async auditEmitEnd(e) {
      // console.log(e)
      let res = await projectAudit({ id: this.$store.state.projectManagementAdd.formInfo.id, ...e });
      // console.log(res)
      if (res.code == 200) {
        this.$message.success(res.msg);
        this.$refs.checkDialogEnd.openDialog(false)
        this.getDetail(this.$route.query.id)

        return
      }
      this.$message.error(res.msg);
    },
    async getDetail(id) {
      let res = await projectDetail(id);
      if (res.code == 200) {
        res.data.input12 = 'true';
        this.$store.commit('projectManagementAdd/UPDATE_FORMINFO', res.data);
        this.$store.commit(
          "projectManagementAdd/update_ImplementationCommissionForm", {
          type: 'file',
          data: res.data.agent_check_videos
        });
        this.$store.commit(
          "projectManagementAdd/update_ImplementationCommissionForm", {
          type: 'chooseFile',
          data: res.data.project_attachments4
        });
        this.$store.commit(
          "projectManagementAdd/update_ImplementationCommissionForm", {
          type: 'purchase',
          data: res.data.project_attachments5
        });
        this.$store.commit(
          "projectManagementAdd/update_ImplementationCommissionForm",
          {
            type: 'form',
            data: {agent_id:res.data.agent_id,choose_no:res.data.choose_no,choose_time:res.data.choose_time,no:res.data.no,}
          });
        this.$store.commit('projectManagementAdd/UPDATE_RADIOLABELLIST', JSON.parse(res.data.small_company));
       
        this.$store.commit('projectManagementAdd/UPDATE_PROJECT_ATTACHMENTS', res.data.project_attachments0);
      }
    },
    async getAgentList() {
      let res = await agentList();
      // console.log(res)
      if (res.code == 200) {
        this.agentArr = res.data;
      }
    },
    beforeAvatarUpload(file) {
      // console.log(this.uploadUrl);
      const isJPG = file.type.includes("image");
      const isVideo = file.type.includes("mp4");

      if (!isJPG && !isVideo) {
        this.$message.error("上传头像图片只能图片或视频!");
      }
      return isJPG || isVideo;
    },
    handleSuccess(e, file, fileList) {
      // console.log(e, file, fileList, "----");
      if (e.code === 200) {
        // e.data.title = e.data.file_name;
        // this.$emit('updateFile',e.data)
        this.formInfo.files.push(e.data);
      }
    },
    //提交
    // async submitForm() {
    //   this.$refs.formInfo.validate(async (valid) => {
    //     if (valid) {
    //       let res = await submitImplement(this.projectInfo.id);
    //       console.log(res);
    //       if (res.code == 200) {
    //         this.$message.success(res.msg);
    //         // this.$router.go(-1);
    //     this.getDetail(this.$route.query.id)

    //         return;
    //       }
    //       this.$message.error(res.msg);
    //     } else {
    //       return false;
    //     }
    //   });
    // },
    async saveFnc(reqBool) {
      let form = this.formInfo;
      form.id = this.projectInfo.id;
      if (reqBool) {
        form.is_submit = 1;
        this.$refs.formInfo.validate(async (valid) => {
          if (valid) {
            if(this.formInfo.agent_receipt[0].files.length==0){
              this.$message.error('请上传附件');
              return
            }
            let res = await saveImplement(form);
            // console.log(res);
            if (res.code == 200) {
              this.$message.success(res.msg);
              // this.$router.go(-1);
              this.getDetail(this.$route.query.id)
              return;
            }
            this.$message.error(res.msg);
          } else {
            return false;
          }
        });
      } else {
        let res = await saveImplement(form);
        // console.log(res);
        if (res.code == 200) {
          this.$message.success(res.msg);
          // this.$router.go(-1);
          this.getDetail(this.$route.query.id)
          return;
        }
        this.$message.error(res.msg);
      }

    },
    setIndex(ind) {
      this.activeIndex = ind;
      this.childRadioBool = false;
      if (this.activeIndex == 1) {
        this.childRadioBool = true;
        this.childRadioIndex = 0;
      }
    },
    setChildIndex(ind) {
      this.childInput1 = 0;
      this.childInput2 = 0;
      this.childRadioIndex = ind;
    },
    handleRemove(file) {
      this.formInfo.files.forEach((val, index) => {
        if (val == file) {
          this.formInfo.files.splice(index, 1)
        }
      })
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("../thirdProjects/mixins.scss");

.background-icon {
  width: 300px;
  height: 29px;
  margin-left: 30px;
  margin-top: 24px;
  margin-bottom: 24px;
  background: url("../../assets/background_icon.png") no-repeat 100% 100%;
  padding-top: 5px;

  .title {
    padding-left: 9px;
    color: white;
    font-size: 14px;
  }
}

.radio-item-child {
  padding-left: 20px;
}

.radio-item {
  display: flex;
  flex-direction: row;
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

.btn {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.btnn {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-top: 100px;

  div {
    width: 86px;
    height: 36px;
    background: #dce3fd;
    border-radius: 4px;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 10px;
  }

  .btn1 {
    background: #dce3fd;
    color: #3e72fb;
  }

  .btn2 {
    background: linear-gradient(0deg, #6280f5 0%, #2d6cff 100%);
    color: #fefeff;
  }

  .btn3 {
    background: white;
    border: 1px solid #a7aabd;
    color: #404659;
  }

  .btn4 {
    background: linear-gradient(0deg, #6080f6 0%, #2d6cff 100%);
    color: #fefeff;
  }

  .btn5 {
    background: linear-gradient(0deg, #fc6235 0%, #fc4935 100%);
    color: #fefeff;
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

    .steps {
      margin-left: 2px;
      box-sizing: border-box;
      padding: 0px 16px 0;
      // width: 148px;
      height: auto;
      background-color: #fff;
      // border-right: 1px solid #EAEDEC;
      display: flex;
      flex-direction: column;

      .title {
        display: flex;
        align-items: center;
        margin-bottom: 42px;

        .icon {
          width: 14px;
          margin-right: 8px;

          img {
            width: 100%;
          }
        }

        span {
          color: #404659;
          font-size: 16px;
        }
      }
    }
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
                width: 100px;
                height: 36px;
                border: 1px solid #2D6CFF;
                // background: #FFFFFF;
                border-radius: 4px;
                margin-right: 19px;
              }

              span {
                font-size: 12px;
                color: #A6A9BC;
              }
            }
          }
        }

        // align-items: center;
      }
    }
</style>
