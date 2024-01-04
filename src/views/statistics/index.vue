<template>
  <div>
    <div class="tab-icon">
      <img class="img" src="../../assets/liucheng.png" alt="" />
      <span class="span">筛选</span>
    </div>
    <el-form
      ref="form"
      size="small"
      inline
      :model="form"
      label-width="90px"
      class="form-container"
    >
      <el-form-item label="项目名称">
        <el-input clearable v-model="form.name" placeholder="请输入项目名称" />
      </el-form-item>
      <el-form-item label="项目类型">
        <el-select clearable v-model="form.type" placeholder="请选择项目类型">
          <el-option label="服务" value="service" />
          <el-option label="货物" value="goods" />
          <el-option label="工程" value="engineering" />
        </el-select>
      </el-form-item>
      <el-form-item label="所属部门">
        <el-select
        clearable
          v-model="form.demand_department_id"
          placeholder="请选择所属部门"
        >
          <el-option
            v-for="(item, index) in departmentList"
            :key="index"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="采购方式">
        <el-select
        clearable
          v-model="form.procurement_method"
          placeholder="请选择采购方式"
        >
          <el-option
            v-for="(item, index) in procurementMethodSelect"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="审核状态">
        <el-select clearable v-model="form.state" placeholder="请选择审核状态">
          <el-option
            v-for="(item, index) in stateList"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="申请时间">
        <el-date-picker
        clearable
          v-model="form.region"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-col :span="24">
          <el-button
            type="primary"
            @click="() => { form.current_page = 1;query();}"
          >
            搜索</el-button>

            <el-button
            type="success"
            @click="() => { form.current_page = 1;exportFnc();}"
          >
            导出</el-button>
        </el-col>
      </el-form-item>
    </el-form>
    <div style="overflow: hidden"></div>
    <div>
      <el-card class="box-card">
        <div style="font-size: 16px;margin-bottom: 10px;">总预算金额:{{ allData.total_budget }}</div>
        <div style="font-size: 16px;margin-bottom: 10px;">总审计金额:{{ allData.total_audit_amount }}</div>
        <div style="font-size: 16px;margin-bottom: 10px;">总中标金额:{{ allData.total_bid_success_amount }}</div>
      </el-card>
    </div>
    <div>
      <el-table
        :data="list"
        :header-cell-style="setTitle"
        style="width: 100%"
        border
        fit
        highlight-current-row
      >
        <el-table-column
          type="index"
          label="序号"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="id"
          label="项目编号"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="项目名称"
          width="180"
        ></el-table-column>
        <el-table-column prop="type_text" label="项目类型"></el-table-column>
        <el-table-column
          prop="procurement_method_text"
          label="采购方式"
        ></el-table-column>
        <el-table-column
          prop="demand_department"
          label="需求部门"
        ></el-table-column>
        <el-table-column prop="budget" label="预算金额"></el-table-column>
        <el-table-column prop="audit_amount" label="审计金额"></el-table-column>
        <el-table-column
          prop="bid_success_amount"
          label="中标金额"
        ></el-table-column>
        <!-- <el-table-column prop="remark" label="采购日期"></el-table-column> -->
      </el-table>
    </div>
    <div
      style="
        display: flex;
        justify-content: space-between;
        flex-direction: row-reverse;
      "
    >
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="form.current_page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="form.per_page"
        layout="total, sizes, prev, pager, next, jumper"
        :total="form.total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {
  projectList,
  projectDelete,
  departmentArr,
  projectStateList,
  projectExport
} from "@/api/project";
// import { addMixins } from './mixins'
export default {
  data() {
    return {
      form: {
        name: "",
        region: [],
        current_page: 1,
        per_page: 10,
        total: 10,
        apply_start_date: "",
        apply_end_date: "",
        demand_department_id: "",
        procurement_method: "",
      },
      list: [],
      procurementMethodSelect: [
        { label: "公开招标", value: 1 },
        { label: "邀请招标", value: 2 },
        { label: "竞争性谈判", value: 3 },
        { label: "竞争性磋商", value: 4 },
        { label: "单一来源采购", value: 5 },
        { label: "询价", value: 6 },
        { label: "其他", value: 7 },
        { label: "遴选采购", value: 8 },
        { label: "竟价采购", value: 9 },
        { label: "直选采购", value: 10 },
        { label: "自行直接采购“", value: 11 },
      ],
      stateList: [],
      departmentList: [],
      allData: {},
    };
  },
  watch: {
    "form.region"(a, b) {
      if (a.length > 0) {
        this.form.apply_start_date = a[0];
        this.form.apply_end_date = a[1];
      } else {
        this.form.apply_start_date = "";
        this.form.apply_end_date = "";
      }
    },
  },
  // mixins: [addMixins],
  mounted() {
    this.departmentFnc();
    this.getState();
    this.query();
  },
  methods: {
    async exportFnc(){
      let res = await projectExport(this.form);
      console.log(res)
      if(res.code==200){
        window.location.href = res.data.url;
      }
    },
    setTitle({ rowIndex, columnIndex }) {
      return "background:#D2DFF9;color:#404659;font-size:14px;";
    },
    async getState() {
      let res = await projectStateList();

      if (res.code == 200) {
        let arr = [];
        res.data.forEach((element, index) => {
          arr.push({ label: element, value: index });
        });
        this.stateList = arr;
      }
    },
    async departmentFnc() {
      let res = await departmentArr({ per_page: 1000 });
      console.log(res);
      if (res.code == 200) {
        this.departmentList = res.data.list;
      }
    },
    async query() {
      let form = {
        current_page: this.form.current_page,
        per_page: this.form.per_page,
      };
      let res = await projectList(this.form);
      console.log(res);
      if (res.code == 200) {
        this.form.total = res.data.total;
        this.list = res.data.list;
        this.allData = res.data;
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.form.per_page = val;
      this.form.current_page = 1;
      this.query();
    },
    handleCurrentChange(val) {
      this.form.current_page = val;
      console.log(`当前页: ${val}`);
      this.query();
    },
    openDetail(item) {
      this.resetFields();
      this.$router.push({
        name: "projectManagementDetail",
        params: { id: item.id },
      });
    },
    openEdit(item) {
      this.resetFields();
      this.$router.push({
        name: "projectManagementEdit",
        params: { id: item.id },
      });
    },
    projectAdd() {
      this.resetFields();
      this.$router.push({ name: "projectManagementAdd", params: {} });
    },
    deleteItem(item) {
      this.$confirm("此操作将删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await projectDelete(item.id);
          console.log(res);
          if (res.code === 200) {
            this.$message({
              type: "success",
              message: res.msg,
            });
            this.form.property = 1;
            this.query();
          } else {
            this.$message({
              type: "error",
              message: res.msg,
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/btn.scss";
.form-container {
  background-color: #fff;
  // padding-top: 20px;
}
.list {
  width: 100%;
  height: 100%;
  background-color: #f3f5f9;
  padding: 20px 0;
  box-sizing: border-box;

  .list-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;

    .add {
      width: 90px;
      height: 33px;
      background: linear-gradient(0deg, #2d6dff 0%, #6280f5 100%);
      border-radius: 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      color: white;

      span {
        margin-left: 5px;
        padding-top: 5px;
      }
    }
  }

  .item {
    background-color: white;
    border-radius: 6px;
    width: 100%;
    margin-bottom: 5px;
    position: relative;
    box-sizing: border-box;
    padding: 24px 0 18px 44px;
    // font-size: 14px;
    .item-top {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 27px;

      .title {
        color: #454d65;
        font-size: 14px;
        margin-right: 10px;
      }

      .status1,
      .status2,
      .status222,
      .status22 {
        box-sizing: border-box;
        padding: 0 5px;
        height: 24px;
        background: linear-gradient(0deg, #6280f5 0%, #2d6cff 100%);
        border-radius: 4px;
        margin-right: 10px;
        color: #fefeff;
        font-size: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .status2 {
        background: linear-gradient(0deg, #fc6435 0%, #fc4835 100%);
        color: white;
      }

      .status22 {
        background: linear-gradient(0deg, #394779 0%, #2a2e3e 100%);
      }

      .status222 {
        background: linear-gradient(0deg, #fcaa35 0%, #fca135 100%);
      }
    }

    .item-con {
      display: flex;
      justify-content: space-between;

      .item-con-left {
        font-size: 20px;

        .item-con-left-o,
        .item-con-left-t {
          // margin-right: 25px;
          display: flex;
          flex-wrap: wrap;
          align-items: center;

          div {
            min-width: 250px;
            margin-right: 25px;
          }
        }

        .item-con-left-o,
        .item-con-left-t {
          .label {
            color: #b2b6cc;
            font-size: 14px;
            margin-right: 12px;
          }

          .text {
            color: #60667a;
            font-size: 14px;
          }
        }

        // font-weight: 600;
      }

      .item-con-right {
        display: flex;
        flex-direction: row;
        align-items: center;

        box-sizing: border-box;
        position: absolute;
        top: 40%;
        right: 0;
        div {
          // margin: 0 5px;
          width: 70px;
          height: 33px;
          background: linear-gradient(0deg, #6280f5 0%, #2d6cff 100%);
          border-radius: 4px;
          margin-right: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          font-size: 12px;
        }

        .item-con-right-btn1 {
          background: linear-gradient(0deg, #6280f5 0%, #2d6cff 100%);
        }

        .item-con-right-btn2 {
          background-color: #dce3fd;
        }

        .item-con-right-btn3 {
          background: linear-gradient(0deg, #fc4835 0%, #fc6235 100%);
        }
      }
    }
  }
}
</style>
