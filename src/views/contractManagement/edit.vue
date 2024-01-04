<template>
  <div style="height: auto">
    <div class="box">
      <div class="box-left">
        <div class="steps">
          <Steps :stepList="stepList" />
        </div>

        <div>
          <div class="tab-icon">
            <img class="img" src="../../assets/liucheng.png" alt="">
            <span class="span">项目新建</span>
          </div>
          <BasicMsg :disabled="true" />
          <div>
            <el-form ref="formInfo" :inline="true" :rules="rules" :disabled="true" :model="projectInfo" class="demo-form-inline"
              label-width="100px">
              <el-col :span="12">
                <el-form-item label="采购代理名称" prop="agent_id" label-width="115px">
                  <el-select v-model="projectInfo.agent_id" placeholder="请选择采购代理名称">
                    <el-option v-for="(item, index) in agentArr" :key="index" :label="item.name" :value="item.id" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="抽取采购代理机构登记" prop="files" label-width="170px">
                  <el-upload :action="uploadUrl" :headers="headers" list-type="picture-card" :limit="1"
                    :file-list="projectInfo.files" >
                    <i slot="default" class="el-icon-plus"></i>
                    <div class="el-upload__tip" slot="tip">
                      只能上传图片或视频
                    </div>
                    <div slot="file" slot-scope="{ file }">
                      <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                      <span class="el-upload-list__item-actions">
                        <span class="el-upload-list__item-delete" @click="handleRemove(file)">
                          <i class="el-icon-delete"></i>
                        </span>
                      </span>
                    </div>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-form>
          </div>
        </div>

      </div>
      <div class="box-right">
        <div class="files">
          <div class="header">
            <div class="title1">
              <img src="../../assets/liucheng.png" alt="">
              <span>附件</span>
            </div>
            <div class="upload" @click="uploadFile" v-if="[27,30,32,34].includes(+formInfo.status)"   v-permission="['project_registrar']">
              <span>上传合同</span>
            </div>
          </div>
          <div>

            <el-table :data="contractList" style="width: 100%">
              <el-table-column type="index" label="序号" width="100">
              </el-table-column>
              <el-table-column prop="name" label="合同名称" width="350">
              </el-table-column>
              <el-table-column prop="created_at" label="上传时间" width="350">
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="300">
                <template slot-scope="scope">
                  <div class="btnn">
                    <div class="btn5"  v-if="[29,30,32,34].includes(+formInfo.status)" @click="deleteItem(scope.row)"   v-permission="['project_registrar']">删除</div>
                    <div class="btn4" @click="downLoadFile(scope)">下载</div>
                  </div>
                </template>
              </el-table-column>
            </el-table>
           <div style="display: flex;justify-content: center;align-items: center;width: 100%;padding-top: 40px;">
            <el-button type="primary"  v-if="formInfo.status == 30"  @click="submitFnc"  v-permission="['project_registrar']">提交合同</el-button>
            <el-button  @click="auditFnc"  v-if="formInfo.status == 31" v-permission="['department_auditor']"  type="primary">初审</el-button>
            <el-button   @click="auditFncEnd" v-if="formInfo.status == 33" v-permission="['department_auditor']"  type="primary">终审</el-button>
           </div>
          </div>
        </div>
      </div>
    </div>
    <Dialog ref="dialog" />
    <checkDialog ref="checkDialog" title="初审"  @auditEmit="auditEmit" :radioList="[ { label: '拒绝', value: 32 }, { label: '通过', value: 33 },]" />
    <checkDialog ref="checkDialogEnd" title="终审"  @auditEmit="auditEmitEnd" :radioList="[ { label: '拒绝', value: 34 }, { label: '通过', value: 35 },]" />
  </div>
</template>
    
<script>
import Steps from "@/components/steps.vue";
import BasicMsg from './basicMsg.vue'
import Dialog from './dialog.vue'
import { submitContract,projectDetail,projectAudit,agentList,deleteContract  } from "@/api/project";
import { getToken } from "@/utils/auth";
import { addMixins } from './mixins'
import checkDialog from "@/components/checkDialog.vue";
export default {
  mixins: [addMixins],
  components: { Steps, BasicMsg,Dialog,checkDialog },
  data() {
    return {
      rules: {
        agent_id: [
          { required: true, message: "请选择需求单位", trigger: "blur" },
        ],
        files: [{ required: true, message: "请上传图片或者视频", trigger: "blur" }],
      },
      tableData:[],
      agentArr: [],
    };
  },

  mounted() {
    let route = this.$route;
    // console.log( this.$store.getters)
    this.getDetail(route.query.id);
    this.getAgentList();
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
      // console.log(this.$store.state.projectManagementAdd.ImplementationCommissionForm,'---')
      return this.$store.state.projectManagementAdd.ImplementationCommissionForm;
    },
    formInfo() {
      return this.$store.state.projectManagementAdd.formInfo;
    },
    
  },
  methods: {
    deleteItem(item){
      this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          let res = await deleteContract(item.id);
          // console.log(res)
          if(res.code===200){
            this.$message({
            type: 'success',
            message: res.msg
          });
          this.getDetail(this.formInfo.id);

          }else{
            this.$message({
            type: 'error',
            message: res.msg
          });
          }
         
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    downLoadFile(scope){
      window.open(scope.row.url)
    },
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
    async getAgentList() {
      let res = await agentList();
      // console.log(res)
      if (res.code == 200) {
        this.agentArr = res.data;
      }
    },
    async submitFnc(){
           let res = await submitContract(this.formInfo.id);
          //  console.log(res)
           if(res.code==200){
            this.$message.success(res.msg)
            this.getDetail(this.$route.query.id)
            return
           }
           this.$message.error(res.msg)
    },
    uploadFile(){
      this.$refs.dialog.open()
    },
    async auditFnc(){
            this.$refs.checkDialog.openDialog(true)
          },
          async auditFncEnd(){
            this.$refs.checkDialogEnd.openDialog(true)
          },
          async auditEmit(e){
            // console.log(e)
            let res = await projectAudit({id:this.$store.state.projectManagementAdd.formInfo.id,...e});
            // console.log(res)
            if(res.code==200){
              this.$message.success(res.msg);
              this.$refs.checkDialog.openDialog(false)
              this.getDetail(this.$route.query.id)
              return
            }
            this.$message.error(res.msg);
          },
          async auditEmitEnd(e){
            // console.log(e)
            let res = await projectAudit({id:this.$store.state.projectManagementAdd.formInfo.id,...e});
            // console.log(res)
            if(res.code==200){
              this.$message.success(res.msg);
              this.$refs.checkDialogEnd.openDialog(false)
              this.getDetail(this.$route.query.id)
              return
            }
            this.$message.error(res.msg);
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
    width: 50%;

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
    // flex-grow: 1;
    width: 50%;
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
    