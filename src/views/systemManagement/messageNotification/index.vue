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
      <el-form-item label="标题名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="接收部门">
        <el-select clearable v-model="form.region">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="时间">
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
    <div style="margin-bottom: 10px; padding-left: 50px">
      <el-button size="small" @click="addBtn" type="primary">新增</el-button>
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
        <el-table-column
          type="index"
          label="序号"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="department"
          label="接收部门"
          width="180"
        >
        <template slot-scope="scope"><span>{{ scope.row.department.name }}</span></template>
    </el-table-column>
        <el-table-column prop="content" label="内容"></el-table-column>
        <el-table-column prop="created_at" label="发布时间"></el-table-column>
        <el-table-column
          align="center"
          prop="created_at"
          label="操作"
          width="300"
        >
          <template slot-scope="scope">
            <div
              style="display: flex; flex-direction: row; align-items: center"
            >
              <div class="btn btn1" @click="handleEdit(scope.row)">编辑</div>
              <div class="btn btn2" @click="deleteItem(scope.row)">删除</div>
              <!-- <div class="btn btn3" @click="handleType(2)">详情</div> -->
            </div>
            <!-- <el-button style="background: #DCE3FD;color: #3E72FB;border: none;"  @click="handleType(2)" type="primary" size="small">编辑</el-button>
                        <el-button style="background: linear-gradient(0deg, #FC4835 0%, #FC6235 100%);color: #FEFEFF;" @click="handleType(3)"  type="primary" size="small">删除</el-button>
                        <el-button style="background: linear-gradient(0deg, #6280F5 0%, #2D6CFF 100%);color: #FEFEFF;" @click="handleType(1)" type="primary" size="small">详情</el-button> -->
          </template>
        </el-table-column>
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

    <AddDialog ref="add"  @updateData="updateData" />
  </div>
</template>

<script>
// import Pagination from '@/components/Pagination'
import { noticeList,noticeDelete } from "@/api/project";
import AddDialog from "./add.vue";
export default {
  components: { AddDialog },
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
    updateData(){
        this.form.current_page = 1;
        this.query();
    },
    setTitle({ rowIndex, columnIndex }) {
      return "background:#D2DFF9;color:#404659;font-size:14px;";
    },
    async query() {
      let res = await noticeList(this.form);
      console.log(res);
      if (res.code == 200) {
        this.list = res.data.list;
        this.form.total = res.data.total;
      }
    },
    deleteItem(item) {
      this.$confirm("此操作将删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await noticeDelete(item.id);
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
    addBtn() {
      this.$refs.add.open();
    },
    handleEdit(row) {
      this.$refs.add.open(row);
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
    handleType(type) {
      this.$router.push({ name: "messageNotificationEdit", params: { id: 1 } });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/btn.scss";
.btn {
  width: 59px;
  height: 28px;
  background: #dce3fd;
  border-radius: 4px;
  margin-right: 16px;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn1 {
  background: #dce3fd;
  color: #3e72fb;
}

.btn2 {
  background: linear-gradient(0deg, #fc4835 0%, #fc6235 100%);
  color: #fefeff;
}

.btn3 {
  background: linear-gradient(0deg, #6280f5 0%, #2d6cff 100%);
  color: #fefeff;
}

.form {
  background-color: white;
  padding: 0 0 36px 0;
  margin-bottom: 21px;
}

.list {
  width: 100%;
  height: 100%;
  background-color: #ebeffe;
  // padding: 0 30px;

  // box-sizing: border-box;

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
