<template>
  <div>
    <div class="tab-icon">
      <img src="../../../assets/liucheng.png" alt="" />
      <span>筛选</span>
    </div>
    <el-form
      class="form"
      ref="form"
      size="small"
      inline
      :model="form"
      label-width="90px"
    >
      <el-form-item label="系统模块" props="name">
        <el-input v-model="form.name" placeholder="请输入系统模块" />
      </el-form-item>
      <el-form-item label="操作人员">
        <el-select clearable v-model="form.region" placeholder="请输入操作人员">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="类型">
        <el-select clearable v-model="form.region" placeholder="请输入类型">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select clearable v-model="form.region" placeholder="请输入状态">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="操作时间" placeholder="请输入操作时间">
        <el-date-picker
        clearable
          v-model="form.region"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
        <el-button type="primary">重置</el-button>
      </el-form-item>
    </el-form>
    <div style="margin-bottom: 8px; padding-left: 50px">
      <!-- <el-button style="background: linear-gradient(0deg, #FC4935 0%, #FC6235 100%);color: white;"
                size="small">删除</el-button> -->
      <el-button size="small">导出</el-button>
    </div>
    <div class="list">
      <el-table
        :data="list"
        :header-cell-style="setTitle"
        style="width: 100%"
        border
        fit
        highlight-current-row
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column
          prop="id"
          label="日志编号"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="module_text"
          label="系统模块"
          width="180"
        ></el-table-column>
        <el-table-column prop="method" label="操作类型"></el-table-column>
        <!-- <el-table-column prop="title2" label="请求方式"></el-table-column> -->
        <el-table-column prop="nickname" label="操作人员"></el-table-column>
        <el-table-column prop="ip" label="主机"></el-table-column>
        <el-table-column prop="status" label="操作状态"></el-table-column>
        <el-table-column prop="created_at" label="操作日期"></el-table-column>
        <!-- <el-table-column
          align="center"
          prop="created_at"
          label="操作状态"
          width="200"
        >
          <template slot-scope="scope">
            <span>详细</span>
          </template>
        </el-table-column> -->
      </el-table>
      <el-pagination
        style="text-align: right"
        :current-page="form.current_page"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="form.per_page"
        :total="form.total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="pageSizeChangeHandle"
        @current-change="pageCurrentChangeHandle"
      />
    </div>
  </div>
</template>

<script>
import { logList } from "@/api/project";
export default {
  data() {
    return {
      form: {
        name: "",
        region: "",
        current_page: 1,
        per_page: 10,
        total: 10,
      },
      list: [],
    };
  },
  mounted() {
        console.log(this.$store.state.user);
        this.query();
    },
  methods: {
    setTitle({ rowIndex, columnIndex }) {
      return "background:#D2DFF9;color:#404659;font-size:14px;";
    },
    async query() {
      let res = await logList(this.form);
      console.log(res);
      if (res.code == 200) {
        this.list = res.data.list;
        this.form.total = res.data.total;
      }
    },
    // 分页, 每页条数
    pageSizeChangeHandle(val) {
      this.page = 1;
      this.pageSize = val;
      this.query();
    },
    // 分页, 当前页
    pageCurrentChangeHandle(val) {
      this.page = val;
      this.query();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/btn.scss";
.form {
  background-color: white;
  // padding-top: 30px;
  margin-bottom: 30px;
}

.list {
  width: 100%;
  height: 100%;
  background-color: #ebeffe;
  padding: 0 30px;
  box-sizing: border-box;

  .list-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .item {
    background-color: white;
    border-radius: 20px;
    width: 100%;

    .item-top {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 15px;
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

        // font-weight: 600;
      }

      .item-con-right {
        display: flex;
        flex-direction: row;
        align-items: center;

        div {
          margin: 0 5px;
        }
      }
    }
  }
}
</style>
