<template>
  <div>
    <div class="bid">
      <!-- <div class="background-icon">
                <span class="title">投标单位</span>
            </div> -->
      <div></div>
      <div class="add" @click="addForm">
        <img src="../../../assets/add_icon1.png" alt="" srcset="" />
        <span>添加单位</span>
      </div>
    </div>
    <div class="item-form">
      <div class="item" v-for="(item, index) in bid_units" :key="index">
        <!-- <el-input type="text" :rows="4" v-model="item.name" placeholder="我部已申请采购一批消防器材望上级批准。" v-show="true">  </el-input> -->
        <div style="width: 100%;margin-bottom: 20px;"><el-checkbox v-model="item.status" @change="(e)=>changeCheck(e,item,index)">该单位是否合格</el-checkbox></div>
        <div class="input1">
          <span class="color">*</span>参与投标单位:
          <el-input style="width: 200px" v-model="item.name" type="text" placeholder="请输入参与投标单位">
          </el-input>

        </div>

        <div class="input1">
          <span class="color">*</span>参与投标联系人:
          <el-input style="width: 200px" v-model="item.contact" type="text" placeholder="请输入参与投标联系人"></el-input>
        </div>
        <div class="input1">
          <span class="color">*</span>参与投标报价金额:
          <el-input style="width: 200px" v-model="item.amount" type="text" placeholder="请输入参与投标报价金额"></el-input>
        </div>
        <UploadCom style="width: 50%;" title="单位档案汇编" :fileList="item.unit_file_compilation" @updateFile="(e) => updateFile(e, item.unit_file_compilation, index)" />
        <UploadCom style="width: 50%;" title="投标文件" :fileList="item.files" @updateFile="(e) => updateFile(e, item.files, index)" />
       

        <div class="float" v-if="index > 2" @click="deleteItem(index)">
          <div>删除</div>
        </div>
        <div style="clear: both;"></div>
        <div style="width: 100%;">
          <div class="fen-float" style="" v-if="item.status"><el-button type="primary" @click="addScore(item)">添加打分</el-button></div>
          <div class="fen"  v-if="item.status">
            <div v-for="(value,inde) in item.scores" :key="inde" class="fen-it">
            <span>{{ enIndex[inde]||'aa' }}:</span>
           <div class="fen-item">
            <span class="fen-item-text">商务分</span>
            <el-input-number  v-model="value.business_score"  :min="0"  :controls="false"></el-input-number>
           </div>
           <div class="fen-item">
            <span class="fen-item-text">技术分</span>
            <el-input-number v-model="value.tech_score"  :min="0"  :controls="false"></el-input-number>
           </div>
           <div class="fen-item">
            <span class="fen-item-text">价格分</span>
            <el-input-number v-model="value.price_score"  :min="0"  :controls="false"></el-input-number>
           </div>
           <div class="fen-item">
            <span class="fen-item-text">总分</span>
            <el-input-number v-model="value.total_score"  :min="0"  :controls="false"></el-input-number>
           </div>
          </div>
          </div>
        </div>
      </div>
    </div>
   
    <div>
      <div style="display: flex;flex-direction: row;"
        v-if="projectInfo.reject_log && [20].includes(projectInfo.reject_log.status)">
        <span style="color: red;font-size: 14px;">部门录入审核意见:</span>
        <el-input :disabled="true" style="max-width: 300px;" type="textarea" :rows="4"
          v-model="projectInfo.reject_log.description"></el-input>
      </div>
    </div>
    <div style="
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
      ">
      <!-- v-if="projectInfo.status == 17" -->
      <el-button v-if="[15, 18, 20].includes(projectInfo.status)" @click="saveFnc(false)"
        v-permission="['project_registrar']" type="normal">保存草稿</el-button>
      <el-button @click="saveFnc(true)" v-if="[15, 18, 20].includes(projectInfo.status)"
        v-permission="['project_registrar']" type="primary">提交</el-button>
      <el-button @click="auditFnc" v-if="projectInfo.status == 19" v-permission="['department_auditor']"
        type="primary">审核</el-button>
      <!-- <el-button
        @click="auditFncEnd"
        v-if="projectInfo.status == 21"
        v-permission="['department_auditor']"
        type="primary"
        >终审</el-button
      > -->
    </div>
    <checkDialog ref="checkDialog" title="审核" @auditEmit="auditEmit" :radioList="[
      { label: '拒绝', value: 20 },
      { label: '通过', value: 21 },
    ]" />
    <!-- <checkDialog
      ref="checkDialogEnd"
      title="终审"
      @auditEmit="auditEmitEnd"
      :radioList="[
        { label: '拒绝', value: 22 },
        { label: '通过', value: 23 },
      ]"
    /> -->
  </div>
</template>

<script>
import UploadCom from "./uploadCom.vue";
import checkDialog from "@/components/checkDialog.vue";
import { bidOpenSave, bidOpenSubmit, projectAudit } from "@/api/project";

export default {
  components: { UploadCom, checkDialog },
  data() {
    return {
      enIndex:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','R','S','T','U','V','W','X','Y','Z']
    };
  },
  computed: {
    projectInfo() {
      return this.$store.state.thirdProjects.formInfo;
    },
    startData() {
      console.log(this.$store.state.thirdProjects.thirdData.startData);
      return this.$store.state.thirdProjects.thirdData.startData;
    },
    bid_units(){
      let bid_units= this.$store.state.thirdProjects.thirdData.startData.bid_units;
      bid_units.forEach((val)=>{
        // val.bool = val.status==1?true:false
        val.scores.forEach((item)=>{
          item.total_score = item.business_score+item.tech_score+item.price_score
        })
      })
      return bid_units;
    }
  },
  methods: {
    changeCheck(e,item,index){
      console.log(e,item,index)
      if(e){
        item.scores=[{business_score:0,tech_score:0,price_score:0,total_score:0,}]
      }
    },
    addScore(item){
      item.scores.push({business_score:0,tech_score:0,price_score:0,total_score:0,})
    },
    updateFile(e, item, index) {
      console.log(e, item, index);
      if (typeof e == "number") {
        item.splice(e, 1);
      } else {
        item.push(e);
      }
      console.log(this.$store.state.projectManagementAdd.project_attachments);
    },
    addForm() {
      this.startData.bid_units.push({
        amount: "",
        name: "",
        contact: "",
        files: [],
        status:false,
        scores:[{business_score:0,tech_score:0,price_score:0,total_score:0,}]
      });
    },
    deleteItem(index) {
      this.startData.bid_units.splice(index, 1);
    },
    async auditFnc() {
      this.$refs.checkDialog.openDialog(true);
    },
    async auditFncEnd() {
      this.$refs.checkDialogEnd.openDialog(true);
    },
    async auditEmit(e) {
      console.log(e);
      let res = await projectAudit({ id: this.projectInfo.id, ...e });
      console.log(res);
      if (res.code == 200) {
        this.$message.success(res.msg);
        this.$emit("updateDetail");
        this.$refs.checkDialog.openDialog(false);

        return;
      }
      this.$message.error(res.msg);
    },
    async auditEmitEnd(e) {
      console.log(e);
      let res = await projectAudit({ id: this.projectInfo.id, ...e });
      console.log(res);
      if (res.code == 200) {
        this.$message.success(res.msg);
        this.$emit("updateDetail");

        this.$refs.checkDialogEnd.openDialog(false);
        return;
      }
      this.$message.error(res.msg);
    },
    async saveFnc(reqBool) {
      if (!reqBool) {
        this.submitFnc();
        return;
      }
      let bid_units =
        this.$store.state.thirdProjects.thirdData.startData.bid_units;
      let bid_files_list =
        this.$store.state.thirdProjects.thirdData.startData.bid_files_list;
      let project_attachments =
        this.$store.state.thirdProjects.thirdData.startData.project_attachments;

      // return
      console.log(bid_units, "===");
      for (let i = 0; i < bid_units.length; i++) {
        // if(i<=2){
        if (
          !bid_units[i].amount ||
          !bid_units[i].name ||
          !bid_units[i].contact ||
          bid_units[i].files.length == 0
          || bid_units[i].unit_file_compilation.length == 0
        ) {
          this.$message.error("请填写满单位信息");
          return;
        }
        // }
      }

      for (let i = 0; i < bid_files_list.length; i++) {
        if (!bid_files_list[i].files&&bid_files_list[i].is_required==1) {
          this.$message.error("请上传文件");
          return;
        }
      }
      // for (let i = 0; i < project_attachments.length; i++) {
      //   if (project_attachments[i].files.length == 0) {
      //     this.$message.error("请上传附件");
      //     return;
      //   }
      // }

      let form = this.$store.state.thirdProjects.thirdData.startData;
      form.id = this.projectInfo.id;
      form.is_submit = 1;
      let res = await bidOpenSave(form);
      console.log(res);
      if (res.code == 200) {
        this.$message.success(res.msg);
        this.$emit("updateDetail");

        return;
      }
      this.$message.error(res.msg);
    },
    async submitFnc() {
      let form = this.$store.state.thirdProjects.thirdData.startData;
      form.id = this.projectInfo.id;
      let res = await bidOpenSave(form);
      console.log(res);
      if (res.code == 200) {
        this.$message.success(res.msg);
        this.$emit("updateDetail");

        return;
      }
      this.$message.error(res.msg);
    },
  },
};
</script>

<style lang="scss" scoped>
.item-form {
  .item {
    margin-bottom: 80px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    position: relative;

    .input,
    .input1 {
      width: 100%;
      font-size: 14px;
      margin-bottom: 15px;

      .color {
        color: red;
      }
    }
    .fen-float{
      margin-right: 41px;
        float: right;
      }
    .fen{
      width: 100%;
      display: flex;
      flex-direction: column;
      // justify-content: space-between;
      align-items: center;
      
      .fen-it{
        width: 100%;
      display: flex;
      flex-direction: row;
      // justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
        .fen-item{
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-right: 10px;
        .fen-item-text{
          font-size: 16px;
          margin-right: 10px;
        }
        .fen-item-input{
          width: 200px;
        }
      }
      }
    }

    .input1 {
      width: 33%;
    }
  }
}

.float {
  // padding-right: 30px;
  // padding-bottom: 20px;
  // float: right;
  position: absolute;
  right: 50px;

  div {
    width: 100px;
    height: 36px;
    background: #ffffff;
    border: 1px solid red;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.background-icon {
  width: 300px;
  height: 29px;
  margin-left: 30px;
  margin-top: 24px;
  margin-bottom: 24px;
  background: url("../../../assets/background_icon.png") no-repeat 100% 100%;
  padding-top: 5px;

  .title {
    padding-left: 9px;
    color: white;
    font-size: 14px;
  }
}

.bid {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .add {
    width: 100px;
    height: 36px;
    background: #ffffff;
    border: 1px solid #2d6cff;
    // border-image: linear-gradient(0deg, #2D6CFF, #2172FF) 10 10;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    // flex-direction: row;
    align-items: center;
    margin-right: 41px;

    img {
      width: 18px;
      height: 18px;
      margin-right: 7px;
    }

    span {
      color: #404659;
      font-size: 12px;
    }
  }
}

.box-right {
  display: flex;
  flex-grow: 1;
  background-color: white;
  box-sizing: border-box;
  // border-left: 1px solid #EAEDEC;

  .files {
    box-sizing: border-box;
    padding-top: 20px;
    // padding-left: 20px;
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
