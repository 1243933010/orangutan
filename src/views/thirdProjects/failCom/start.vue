<template>
  <div>
    <el-row>
      <el-col :span="20">
        <div style="display: flex; flex-direction: row; flex-wrap: wrap">
          <div
            style="width: 33%"
            v-for="(item, index) in startData.bid_files_list"
            :key="index"
          >
            <UploadCom
              :title="item.title"
              :fileList="item.files"
              @updateFile="(e) => updateFile(e, item.files)"
            />
          </div>
        </div>
      </el-col>
    </el-row>

   <div style="width: 80%;">
    <BidCom />
   </div>
  </div>
</template>

<script>
import BidCom from "./bid.vue";

import UploadCom from "./uploadCom.vue";
export default {
  components: { UploadCom, BidCom },
  data() {
    return {};
  },
  computed: {
    projectInfo() {
      return this.$store.state.thirdProjects.formInfo;
    },
    startData() {
      console.log(
        this.$store.state.thirdProjects.thirdData.startData,
        "=========="
      );
      return this.$store.state.thirdProjects.thirdData.startData;
    },
  },
  methods: {
    updateFile(e, item, index) {
      console.log(e, item, index, "|||");
      if (typeof e == "number") {
        item.splice(e, 1);
      } else {
        item.push(e);
      }
      console.log(this.$store.state.thirdProjects.thirdData);
    },
  },
};
</script>
