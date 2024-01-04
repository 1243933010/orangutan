<template>
  <div style="height: auto">
    <div style="
        width: 100%;
        padding-left: 20px;
        margin: 20px 0;
      ">
      <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="新招标信息" :value="0">
          <!-- 默认空数据 -->
          <template>
            <div class="box">
              <div class="box-left">
                <div class="steps">
                  <Steps :stepList="stepList" />
                </div>
                <div class="form">
                  <div class="background-icon">
                    <span class="title">基本信息</span>
                  </div>
                  <div style="width: 80%">
                    <BasicMsg :disabled="true" />
                  </div>
                  <!-- 三方基本信息录入 -->
                  <div class="background-icon">
                    <span class="title">招标</span>
                  </div>

                  <div style="width: 80%">
                    <ThirdCom @updateDetail="getDetail($route.query.id)" />
                  </div>
                  <!-- 开标 -->
                  <div class="background-icon">
                    <span class="title">开评标</span>
                  </div>
                  <!-- <div></div> -->
                  <div style="padding-left: 30px">
                    <StartCom @updateDetail="getDetail($route.query.id)" />
                  </div>

                  <!-- <BidCom /> -->

                  <!-- 中标单位 -->
                  <div class="background-icon">
                    <span class="title">中标</span>
                  </div>
                  <div style="padding-left: 30px; width: 80%">
                    <SuccessfulBidder @updateDetail="getDetail($route.query.id)" />
                  </div>
                  <div class="btnn">
                    <!-- <div class="btn1">取消</div> -->
                    <!-- <div class="btn2">提交</div> -->
                    <!-- <div class="btn3">保存草稿</div> -->
                    <!-- <div class="btn4">通过</div> -->
                    <!-- <div class="btn5">驳回</div> -->
                  </div>
                </div>
              </div>
              <!-- <AnnexCom /> -->
              <div></div>
            </div>
            <div style="
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          background-color: white;
          padding-bottom: 40px;
        ">
              <div>
                <el-button @click="bidFailFnc" v-if="[
                  11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
                  27, 28, 29,
                ].includes(projectInfo.status)
                  " type="primary">招标失败</el-button>
              </div>
            </div>
          </template>
        </el-tab-pane>
        <el-tab-pane v-for="(item, index) in projectInfo.bid_fail_times" :key="index" :label="`第${index + 1}次招标失败信息`"
          :value="index + 1">
          <!-- 默认空数据 -->
          <template>
            <div class="box">
              <div class="box-left">
                <div class="steps">
                  <Steps :stepList="stepList" />
                </div>
                <div class="form">
                  <div class="background-icon">
                    <span class="title">基本信息</span>
                  </div>
                  <div style="width: 80%">
                    <BasicMsg :disabled="true" />
                  </div>
                  <!-- 三方基本信息录入 -->
                  <div class="background-icon">
                    <span class="title">招标</span>
                  </div>

                  <div style="width: 80%">
                    <ThirdCom @updateDetail="getDetail($route.query.id)" />
                  </div>
                  <!-- 开标 -->
                  <div class="background-icon">
                    <span class="title">开评标</span>
                  </div>
                  <!-- <div></div> -->
                  <div style="padding-left: 30px">
                    <StartCom @updateDetail="getDetail($route.query.id)" />
                  </div>

                  <!-- <BidCom /> -->

                  <!-- 中标单位 -->
                  <div class="background-icon">
                    <span class="title">中标</span>
                  </div>
                  <div style="padding-left: 30px; width: 80%">
                    <SuccessfulBidder @updateDetail="getDetail($route.query.id)" />
                  </div>
                </div>
              </div>
              <!-- <AnnexCom /> -->
              <div></div>
            </div>
            <div style="display: flex;justify-content: center; align-items: center;width: 100%;background-color: white;padding-bottom: 40px;">
              <div>
                <el-button @click="bidFailFnc" v-if="[ 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,27, 28, 29,].includes(projectInfo.status)"
                type="primary">招标失败</el-button>
              </div>
            </div>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>


  </div>
</template>

<script>
import Steps from "@/components/steps.vue";
import { addMixins } from "./mixins";
import BasicMsg from "./editCom/basicMsg.vue";
import ThirdCom from "./editCom/thirdCom.vue";
import StartCom from "./editCom/start.vue";
// import AnnexCom from "./editCom/annex.vue";
// import BidCom from './editCom/bid.vue'
import SuccessfulBidder from "./editCom/successfulBidder.vue";
import {
  projectDetail,
  agentList,
  bidFail,
  bidFailDetail,
} from "@/api/project";
export default {
  mixins: [addMixins],
  components: {
    Steps,
    BasicMsg,
    ThirdCom,
    StartCom,
    // AnnexCom,
    SuccessfulBidder,
  },
  data() {
    return {
      activeName: 0
      // failDataBool:false
    };
  },
  computed: {
    projectInfo() {
      return this.$store.state.thirdProjects.formInfo;
    },
  },
  mounted() {
    let route = this.$route;
    this.getDetail(route.query.id);
    this.getAgentList();
  },
  methods: {
    handleClick(e) {
      console.log(e.index)
      if ((+e.index) == 0) {
        // this.failDataBool = false;
        this.getDetail(this.$route.query.id);
      } else {
        // this.failDataBool = true;
        this.getBidFailDetail(this.$route.query.id, e.index);
      }
    },
    checkTab(index) {
      if (index == 0) {
        // this.failDataBool = false;
        this.getDetail(this.$route.query.id);
      } else {
        // this.failDataBool = true;
        this.getBidFailDetail(this.$route.query.id, index);
      }
    },
    async getBidFailDetail(id, bid_times) {
      this.$loading();
      let res = await bidFailDetail({ id, bid_times });

      this.$loading().close();
      if (res.code == 200) {
        console.log(res.data.project_attachments4, '{{{}}}')
        this.$store.commit("thirdProjects/UPDATE_FORMINFO", {
          ...res.data,
          failDataBool: false,
          bid_fail_times: res.data.bid_times,
          input12: "true",
        });
        this.$store.commit(
          "thirdProjects/UPDATE_PROJECT_ATTACHMENTS",
          res.data.project_attachments0
        );
        this.$store.commit(
          "thirdProjects/UPDATE_RADIOLABELLIST",
          JSON.parse(res.data.small_company)
        );

        this.$store.commit(
          "thirdProjects/update_ImplementationCommissionForm", {
          type: 'chooseFile',
          data: res.data.project_attachments4
        });
        this.$store.commit(
          "thirdProjects/update_ImplementationCommissionForm", {
          type: 'purchase',
          data: res.data.project_attachments5
        });
        this.$store.commit(
          "thirdProjects/update_ImplementationCommissionForm", {
          type: 'file',
          data: res.data.agent_check_videos
        });
        // if (res.data.status > 6) {
        this.$store.commit(
          "thirdProjects/update_ImplementationCommissionForm",
          { type: "form", data: { agent_id: res.data.agent_id, choose_no: res.data.choose_no, choose_time: res.data.choose_time, no: res.data.no, } }
        );
        // if(res.data.status>=11){
        //招标信息替换
        let data = {
          ...res.data.bid_info,
          bid_file_issue: res.data.bid_file_issue,
          bid_publish_photo: res.data.bid_publish_photo,
          bid_register_file: res.data.bid_register_file,
          project_attachments: res.data.project_attachments1,
        };
        
        this.$store.commit("thirdProjects/update_bidBaseProject", data);
        this.$store.commit(
          "thirdProjects/update_startData_bid_files_list",
          res.data.bid_files_list
        );
        console.log(this.$store.state.thirdProjects.thirdData.startData.bid_units,'}}}')

        this.$store.commit(
          "thirdProjects/update_startData_bid_units",
          res.data.bid_units
        );
        console.log()
       
        // this.$store.commit(
        //   "thirdProjects/update_startData_project_attachments",
        //   res.data.project_attachments2
        // );
        
        let data1 = {
          ...res.data.bid_info,
          bid_success_photo: res.data.bid_success_photo,
          bid_success_notice: res.data.bid_success_notice,
          project_attachments: res.data.project_attachments3,
        };
        this.$store.commit("thirdProjects/update_resultData", data1);
        // }
      }
    },
    async bidFailFnc() {
      let res = await bidFail({ id: this.$route.query.id });
      console.log(res);
      if (res.code == 200) {
        this.$message.success("当前招标失败");
        this.getDetail(this.$route.query.id);
        return;
      }
      this.$message.error(res.msg);
    },
    async getDetail(id) {
      this.$loading();
      let res = await projectDetail(id);
      // console.log(res)
      this.$loading().close();
      if (res.code == 200) {
        this.$store.commit("thirdProjects/UPDATE_FORMINFO", {
          ...res.data,
          failDataBool: true,
          bid_fail_times: res.data.bid_fail_times,
          input12: "true",
        });
        this.$store.commit(
          "thirdProjects/UPDATE_PROJECT_ATTACHMENTS",
          res.data.project_attachments0
        );
        this.$store.commit(
          "thirdProjects/UPDATE_RADIOLABELLIST",
          JSON.parse(res.data.small_company)
        );
        this.$store.commit(
          "thirdProjects/update_ImplementationCommissionForm", {
          type: 'chooseFile',
          data: res.data.project_attachments4
        });
        this.$store.commit(
          "thirdProjects/update_ImplementationCommissionForm", {
          type: 'purchase',
          data: res.data.project_attachments5
        });
        this.$store.commit(
          "thirdProjects/update_ImplementationCommissionForm", {
          type: 'file',
          data: res.data.agent_check_videos
        });
        // if (res.data.status > 6) {
        this.$store.commit(
          "thirdProjects/update_ImplementationCommissionForm",
          { type: "form", data: { agent_id: res.data.agent_id, choose_no: res.data.choose_no, choose_time: res.data.choose_time, no: res.data.no, } }
        );
        //招标信息替换
        let data = {
          ...(res.data.bid_info
            ? res.data.bid_info
            : {
              bid_file_date: "",
              bid_publish_date: "",
              publish_link: "",
              bid_open_date: "",
              doubt: "",
            }),
          bid_file_issue: res.data.bid_file_issue,
          bid_publish_photo: res.data.bid_publish_photo,
          bid_register_file: res.data.bid_register_file,


          project_attachments: res.data.project_attachments1,
        };
        this.$store.commit("thirdProjects/update_bidBaseProject", data);

       
        this.$store.commit(
          "thirdProjects/update_startData_bid_files_list",
          res.data.bid_files_list
        );
        this.$store.commit(
          "thirdProjects/update_startData_bid_units",
          res.data.bid_units
        );
        this.$store.commit(
          "thirdProjects/update_startData_project_attachments",
          res.data.project_attachments2
        );
        
        // if(res.data.status>=24){
        let data1 = {
          ...res.data.bid_info,
          bid_success_photo: res.data.bid_success_photo,
          bid_success_notice: res.data.bid_success_notice,
          project_attachments: res.data.project_attachments3,
          bid_unit_type:res.data.bid_unit_type,
          bid_file:res.data.bid_file,
          file_compilation:res.data.file_compilation,
        };
        this.$store.commit("thirdProjects/update_resultData", data1);
        // }
      }
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
@import url("./mixins.scss");

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
    // max-width: 1000px;

    .form {
      // min-width: 500px;
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
</style>
