<template>
  <div style="height: auto">
    <div class="box">
      <div class="box-left">
     
        <div class="form">
          <div>
            <el-form ref="formInfo" :inline="true" :rules="rules" :disabled="true" :model="formInfo" class="demo-form-inline"
              label-width="100px">
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
                    <UploadCom type="see"  title="附件" :fileList="item.files" @updateFile="(e) => updateFile(e, item, index)" />
                  </div>
                </div>

              </div>
            </el-col>
              <el-col :span="24">
                <el-form-item label="抽取采购代理机构登记" prop="files" label-width="170px">
                  <el-upload :action="uploadUrl" :headers="headers" list-type="picture-card" :limit="1"
                    :file-list="formInfo.files" >
                    <i slot="default" class="el-icon-plus"></i>
                    <div class="el-upload__tip" slot="tip">
                      只能上传图片或视频
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
                    <UploadCom type="see" title="附件" :fileList="item.files" @updateFile="(e) => updateFile(e, item, index)" />
                  </div>
                </div>

              </div>
            </el-col>
            </el-form>
          </div>

        </div>
      </div>
    </div>


  </div>
</template>

<script>
import { addMixins } from "./mixins";
import { getToken } from "@/utils/auth";
import UploadCom from '../thirdProjects/editCom/uploadCom.vue'
import {
  agentList
} from "@/api/project";
export default {
  mixins: [addMixins],
  components:{UploadCom},
  data() {
    return {
      rules: {
        agent_id: [
          { required: true, message: "请选择需求单位", trigger: "blur" },
        ],
        files: [{ required: true, message: "请上传图片或者视频", trigger: "blur" }],
      },
      agentArr: [],
    };
  },

  mounted() {
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
      console.log(e,item,index)
      if(typeof e =='number'){
        itemm.files.splice(e,1)
      }else{
        item.files.push(e)
      }
      console.log( this.$store.state.projectManagementAdd.ImplementationCommissionForm)
    },
    async getAgentList() {
      let res = await agentList();
      // console.log(res)
      if (res.code == 200) {
        this.agentArr = res.data;
      }
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
