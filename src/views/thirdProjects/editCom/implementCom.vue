<template>
    <div>
        <div>
          <div style="clear: both;"></div>
            <el-form ref="formInfo" :inline="true" :disabled="true" :rules="rules" :model="projectInfo" class="demo-form-inline"
              label-width="100px">
              <el-col :span="8">
                <el-form-item label="项目编号" prop="no" placeholder="请输入项目编号">
                  <el-input v-model="projectInfo.no" type="text" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="抽取编号" prop="choose_no" placeholder="请输入抽取编号">
                  <el-input v-model="projectInfo.choose_no" type="text" />
                </el-form-item>
              </el-col>
              
              <el-col :span="8">
                <el-form-item label="抽取时间" prop="choose_time">
                  <el-date-picker value-format="yyyy-MM-dd" v-model="projectInfo.choose_time" type="date"
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
                      <el-input type="textarea" :rows="4" v-model="item.description" placeholder="">
                      </el-input>
                    </div>
                  </div>
                  <div class="right">
                    <UploadCom title="附件" type="see" :fileList="item.files" @updateFile="(e) => updateFile(e, item, index)" />
                  </div>
                </div>

              </div>
            </el-col>
              <el-col :span="24">
                <el-form-item label="抽取采购代理机构登记" prop="files" label-width="170px">
                  <el-upload :action="uploadUrl" :headers="headers" list-type="picture-card" :limit="5"
                    :file-list="formInfo.files"  >
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
                  <el-select v-model="projectInfo.agent_id" placeholder="请选择采购代理名称">
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
</template>

<script>
import UploadCom from './uploadCom.vue'
import {
  projectDetail,
  agentList,
  saveImplement,
  submitImplement,
  projectAudit
} from "@/api/project";
import { getToken } from "@/utils/auth";
export default{
  components:{UploadCom},
    data(){
        return{
            rules: {
        agent_id: [
          { required: true, message: "请选择需求单位", trigger: "blur" },
        ],
        files: [{ required: true, message: "请上传图片或者视频", trigger: "blur" }],
      },
      agentArr: [],
        }
    },
    mounted() {
    this.getAgentList();
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
      return this.$store.state.thirdProjects.ImplementationCommissionForm;
    },
    projectInfo() {
      return this.$store.state.thirdProjects.formInfo;
    },
  },
  methods:{
    async getAgentList() {
      let res = await agentList();
      // console.log(res)
      if (res.code == 200) {
        this.agentArr = res.data;
      }
    },
  }
}
</script>


<style lang="scss" scoped>
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

          // .title {
          //   color: #404659;
          //   font-size: 14px;
          //   font-weight: 600;
          //   margin-bottom: 14px;
          // }

          // .upload {
          //   display: flex;
          //   flex-direction: column;
          //   background-color: red;
          //   .file-list {
          //     display: flex;
          //     flex-direction: column;

          //     .item {
          //       display: flex;
          //       flex-direction: row;
          //       align-items: center;
          //       margin-bottom: 13px;

          //       .file-icon {
          //         width: 16px;
          //         height: 13px;
          //         margin-right: 6px;
          //       }

          //       span {
          //         color: #404659;
          //         font-size: 14px;
          //         margin-right: 12px;
          //       }

          //       .delete {
          //         width: 14px;
          //         height: 15px;
          //       }
          //     }
          //   }

          //   .upload-btn {
          //     display: flex;
          //     justify-content: center;
          //     align-items: center;
             
          //     .btn {
          //       width: 100px;
          //       height: 36px;
          //       border: 1px solid #2D6CFF;
          //       // background: #FFFFFF;
          //       border-radius: 4px;
          //       margin-right: 19px;
          //     }

          //     span {
          //       font-size: 12px;
          //       color: #A6A9BC;
          //     }
          //   }
          // }
        }

        // align-items: center;
      }
    }
</style>