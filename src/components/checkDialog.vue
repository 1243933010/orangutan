<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <div>
        <div style="margin-bottom: 15px;">
          <el-radio-group v-model="status">
            <el-radio
              v-for="(item, index) in radioList"
              :key="index"
              :label="item.value"
              >{{ item.label }}</el-radio
            >
          </el-radio-group>
        </div>
        <div>
          <el-input
            type="textarea"
            :rows="4"
            placeholder="驳回意见"
            v-model="description"
          >
          </el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitFnc"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    radioList: {
      type: Array,
      default: [{}],
    },
  },
  data() {
    return {
      centerDialogVisible: false,
      status:undefined,
      description:''
    };
  },
  methods: {
    openDialog(bool) {
      this.centerDialogVisible = bool;
    },
    submitFnc(){
      if(!this.status){
        return
      }
      this.$emit('auditEmit',{status:this.status,description:this.description})
    }
  },
};
</script>
