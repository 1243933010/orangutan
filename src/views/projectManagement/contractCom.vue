<template>
  <div style="height: auto">
    <div class="box">
      <!-- <div class="box-left">


      </div> -->
      <div class="box-right">
        <div class="files">
          <div class="header">
            <div class="title1">
              <img src="../../assets/liucheng.png" alt="">
              <span>附件</span>
            </div>
            
          </div>
          <div>

            <el-table :data="contractList" style="width: 100%">
              <el-table-column type="index" label="序号">
              </el-table-column>
              <el-table-column prop="name" label="合同名称">
              </el-table-column>
              <el-table-column prop="created_at" label="上传时间" >
              </el-table-column>
              <el-table-column  label="操作" width="100">
                <template slot-scope="scope">
                  <div class="btnn">
                    <!-- <div class="btn5"  v-if="[29,30,32,34].includes(+formInfo.status)" @click="deleteItem(scope.row)"   v-permission="['project_registrar']">删除</div> -->
                    <div class="" @click="downLoadFile(scope)">下载</div>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
    
<script>
import Steps from "@/components/steps.vue";
import { submitContract,projectDetail,projectAudit,agentList,deleteContract  } from "@/api/project";
import { getToken } from "@/utils/auth";
import { addMixins } from './mixins'
import checkDialog from "@/components/checkDialog.vue";
export default {
  mixins: [addMixins],
  components: { Steps,checkDialog },
  data() {
    return {
      rules: {
        agent_id: [
          { required: true, message: "请选择需求单位", trigger: "blur" },
        ],
        files: [{ required: true, message: "请上传图片或者视频", trigger: "blur" }],
      },
    };
  },
  computed: {
    contractList(){
      return this.$store.state.projectManagementAdd.contractList;
    },
    uploadUrl() {
      return process.env.VUE_APP_UPLOAD_API + "/user/upload_file";
    },
    headers() {
      return {
        Authorization: `Bearer ${getToken()}`,
      };
    },
    projectInfo() {
      console.log(this.$store.state.projectManagementAdd.ImplementationCommissionForm,'---')
      return this.$store.state.projectManagementAdd.ImplementationCommissionForm;
    },
    formInfo() {
      return this.$store.state.projectManagementAdd.formInfo;
    },
    
  },
  methods: {
    downLoadFile(scope){
      window.open(scope.row.url)
    },

  },
};
</script>
    
<style lang="scss" scoped>
@import "~@/styles/btn.scss";

.upload-class {
  .label {
    color: #404659;
    font-size: 14px;
    margin-bottom: 14px;
  }

  .upload-class-con {
    display: flex;
    flex-direction: row;
    align-items: center;

    .span {
      margin-right: 35px;
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
      content: '';
      width: 0;
      height: 0;
      border-radius: 50%;
      transform: translate(-50%, -50%) scale(0);
      transition: transform .15s ease-in;
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
  // padding-top: 100px;

  div {
    width: 70px;
    height: 33px;
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
    color: #3E72FB;
  }

  .btn2 {
    background: linear-gradient(0deg, #6280F5 0%, #2D6CFF 100%);
    color: #FEFEFF;
  }

  .btn3 {
    background: white;
    border: 1px solid #A7AABD;
    color: #404659;
  }

  .btn4 {
    background: linear-gradient(0deg, #6080F6 0%, #2D6CFF 100%);
    color: #FEFEFF;
  }

  .btn5 {
    background: linear-gradient(0deg, #FC6235 0%, #FC4935 100%);
    color: #FEFEFF;
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
        color: #1D70FF;
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
          background: linear-gradient(90deg, #1D70FF 0%, rgba(29, 112, 255, 0) 100%);
        }
      }

      .active {
        color: #A6A9BC;

        div {
          background: linear-gradient(90deg, #A6A9BC 0%, rgba(166, 169, 188, 0) 100%);
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

  .box-right {
    display: flex;
    flex-grow: 1;
    background-color: white;
    box-sizing: border-box;
    border-left: 1px solid #EAEDEC;

    .files {
      box-sizing: border-box;
      padding-top: 20px;
      padding-left: 20px;
      width: 100%;
      // display: flex;
      // justify-content: space-between;
      // flex-direction: row;
      // align-items: center;

      .header {
        display: flex;
        justify-content: space-between;
        flex-direction: row;

        .title1 {
          display: flex;
          flex-direction: row;
          align-items: center;
          font-size: 16px;
          color: #454D65;
          font-weight: 600;
          margin-bottom: 20px;

          img {
            width: 14px;
            margin-right: 8px;
          }
        }

        .upload {
          width: 90px;
          height: 33px;
          background: linear-gradient(0deg, #2D6DFF 0%, #6280F5 100%);
          border-radius: 4px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #FFFFFF;
          font-size: 14px;
        }
      }

    }
  }
}
</style>
    