<template>
  <div style="height: auto">
    <div class="box">
      <div class="box-left">
        <div class="steps">
          <Steps :stepList="stepList" />
        </div>
        <div class="form">
          <div class="step1">
            <div class="item" :class="index !== 0 ? 'active' : ''" v-for="(item, index) in stepsList" :key="index">
              <img v-if="index == 0" src="../../assets/step_icon_check.png" alt="" srcset="">
              <img v-if="index !== 0" src="../../assets/step_icon.png" alt="" srcset="">
              <span>{{ item.title }}</span>
              <div></div>
            </div>
          </div>

          <BasicMsg ref="basicMsg" :disabled="false" />
          <div >
            <div style="display: flex;flex-direction: row;" v-if="projectInfo.reject_log&&[14][2,4].includes(projectInfo.reject_log.status)">
              <span style="color: red;font-size: 14px;">部门录入审核意见:</span>
              <el-input :disabled="true" style="max-width: 300px;" type="textarea" :rows="4"
                v-model="projectInfo.reject_log.description"></el-input>
            </div>
          </div>
          <div class="btnn">
            <!-- <div class="btn1">取消</div> -->
            <div class="btn2" @click="submitFnc(true)"  v-if="formInfo.id&&[0,2,4].includes(formInfo.status)" v-permission="['department_auditor']">提交</div>
            <div class="btn3" @click="submitFnc(false)"   v-if="[0,2,4].includes(formInfo.status)" v-permission="['department_auditor']">保存草稿</div>
            <!-- <div class="btn4">通过</div> -->
            <!-- <div class="btn5" @click="$router.go(-1)">驳回</div> -->
          </div>
        </div>
      </div>
      <AnnexCom />
    </div>
  </div>
</template>


<script>



import Steps from "@/components/steps.vue";
import { addMixins } from './mixins'
import AnnexCom from './annex.vue'
import BasicMsg from './basicMsg1.vue'
import { mapState, mapGetters } from 'vuex'
import { projectEdit,projectAdd,projectDetail,projectSubmit } from "@/api/project";
export default {
  mixins: [addMixins],
  components: { Steps, AnnexCom, BasicMsg },
  data() {
    return {

    };
  },

  mounted() {
    let route = this.$route;
    console.log( route)
    this.getDetail(route.query.id);
  },
  computed: {
    // ...mapGetters([
    //   'stepList'
    // ]),
    formInfo(){
      console.log( this.$store.state.projectManagementAdd.formInfo)
      return this.$store.state.projectManagementAdd.formInfo
    }
    
  },
  methods: {
    async submitForm() {
      let res = await projectSubmit({id:this.$store.state.projectManagementAdd.formInfo.id})
      console.log(res)
      if(res.code==200){
        this.$message.success(res.msg);
        // this.$router.go(-1)
        this.getDetail(this.$route.query.id)
        return
      }
      this.$message.error(res.msg);
    },
    async getDetail(id){
      let res = await projectDetail(id);
      console.log(res.data.attachments_content,JSON.parse(res.data.small_company))
      if(res.code==200){
        // this.$store.commit('projectManagementAdd/UPDATE_RADIOLABELLIST',JSON.parse(res.data.small_company));
        // this.$store.commit('projectManagementAdd/UPDATE_FORMINFO',{...res.data,input12:'true'});
        // res.data.project_attachments0.forEach((val)=>{
        //   val.title = val.file_name
        // })
        // this.$store.commit('projectManagementAdd/UPDATE_PROJECT_ATTACHMENTS',res.data.project_attachments0);
        let arr = JSON.parse(res.data.small_company);
        let input12 = ''
        arr.forEach((element,index)=>{
          if(element.checked&&index!==1){
              input12 = 'true'
          }else if(element.checked&&index==1){
            element.child.forEach((val,ind)=>{
              if(val.checked&&val.num==undefined){
                input12 = 'true'
              }else if(val.checked&&val.num!==undefined&&!val.num){
                input12 = ''
              }else if(val.checked&&val.num!==undefined&&val.num){
               input12 = 'true'
              }
            })
          }
        })
       this.$nextTick(()=>{
        this.$store.commit('projectManagementAdd/UPDATE_RADIOLABELLIST',JSON.parse(res.data.small_company));
        this.$store.commit('projectManagementAdd/UPDATE_FORMINFO',{...res.data,input12:input12});
        this.$store.commit('projectManagementAdd/UPDATE_PROJECT_ATTACHMENTS',res.data.project_attachments0);
        
       })

      }
    },
    onSubmit() {
      console.log("submit!");
    },
    async submitFnc(reqBool) {
      let state = this.$store.state.projectManagementAdd;
      let form = {...state.formInfo};
      form.project_attachments = state.project_attachments
      form.radioLabelList = state.radioLabelList;
      form.small_company = JSON.stringify(state.radioLabelList)
      console.log(reqBool)
    
      if(reqBool){
        let bool = false;
       this.$refs.basicMsg.verifyForm((bools)=>{
        bool = bools
      })
      let fileBool = true;
      this.$store.state.projectManagementAdd.project_attachments.forEach((val,ind)=>{
        if(val.files.length==0&&val.is_required==1){
          fileBool = false;
        }
      })
      if(!bool){
        this.$message.error('表单必须填写')
        return
      }
      if(!fileBool){
        this.$message.error('附件必须上传')
        return
      }
      form.is_submit = 1;
      }
      let res = await projectEdit(form);
      console.log(res)
      if(res.code==200){
        this.$message.success(res.msg);
        this.getDetail(this.$route.query.id);
        // this.$router.go(-1)
        return
      }
      this.$message.success(res.msg);
    },

  },
};
</script>

<style lang="scss" scoped>
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
  padding-top: 100px;

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
    // max-width: 1000px;
    width: 55%;
    .form {
      width: 75%;
      // min-width: 500px;
      display: flex;
      flex-direction: column;
      // flex-grow: 1;
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
        margin-right: 26px;
        display: flex;
        flex-direction: row;
        align-items: center;

        img {
          width: 14px;
          margin-right: 15px;
        }

        span {
          margin-right: 8px;
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
    width: 40%;
    // flex-grow: 1;
    background-color: white;
    box-sizing: border-box;
    border-left: 1px solid #EAEDEC;

    .files {
      box-sizing: border-box;
      padding-top: 20px;
      padding-left: 20px;
      width: 100%;
      .file-form{width: 100%;}
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
    }
  }
}</style>
