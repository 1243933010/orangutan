<template>
    <div>
        <div>
            <el-form ref="formInfo" :inline="true" :disabled="true" :rules="rules" :model="formInfo" class="demo-form-inline"
              label-width="100px">
              <el-col :span="12">
                <el-form-item label="采购代理名称" prop="agent_id" label-width="115px">
                  <el-select v-model="formInfo.agent_id" placeholder="请选择采购代理名称">
                    <el-option v-for="(item, index) in agentArr" :key="index" :label="item.name" :value="item.id" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="抽取采购代理机构登记" prop="files" label-width="170px">
                  <el-upload :action="uploadUrl" :headers="headers" list-type="picture-card" :limit="1"
                    :file-list="formInfo.files"  >
                    <i slot="default" class="el-icon-plus"></i>
                    <div class="el-upload__tip" slot="tip">
                      只能上传图片或视频
                    </div>
                    <div slot="file" slot-scope="{ file }">
                      <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                    </div>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-form>
          </div> 
    </div>
</template>

<script>
import {
  projectDetail,
  agentList,
  saveImplement,
  submitImplement,
  projectAudit
} from "@/api/project";
import { getToken } from "@/utils/auth";
export default{
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
      return this.$store.state.projectManagementAdd.formInfo;
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