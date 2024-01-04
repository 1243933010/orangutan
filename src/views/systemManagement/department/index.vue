<template>
  <div>
    <div class="tab-icon">
      <img src="../../../assets/liucheng.png" alt="" />
      <span>筛选</span>
    </div>
    <!-- <el-form
      class="form"
      ref="form"
      size="small"
      inline
      :model="form"
      label-width="90px"
    >
    <el-form-item label="部门名称">
        <el-select v-model="form.demand_department_id" placeholder="请选择部门名称">
          <el-option v-for="(item, index) in departmentList" :key="index" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="用户状态">
        <el-select v-model="form.state">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="()=>{form.current_page=1;query()}">搜索</el-button>
      </el-form-item>
    </el-form> -->
    <div style="margin-bottom: 10px; padding-left: 40px">
      <el-button size="small" @click="addBtn" type="primary">新增</el-button>
    </div>
    <div class="list">
      <el-table
        row-key="id"
        :tree-props="{ children: 'children' }"
        default-expand-all
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
          prop="name"
          label="部门名称"
          width="180"
        ></el-table-column>
        <el-table-column prop="sort" label="排序" width="180"></el-table-column>
        <el-table-column prop="state" label="状态"></el-table-column>
        <el-table-column prop="created_at" label="创建时间"></el-table-column>
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
              <!-- <div class="btn btn3" @click="handleType(2)">重置密码</div> -->
            </div>
            <!-- <el-button style="background: #DCE3FD;color: #3E72FB;border: none;"  @click="handleType(2)" type="primary" size="small">编辑</el-button>
                        <el-button style="background: linear-gradient(0deg, #FC4835 0%, #FC6235 100%);color: #FEFEFF;" @click="handleType(3)"  type="primary" size="small">删除</el-button>
                        <el-button style="background: linear-gradient(0deg, #6280F5 0%, #2D6CFF 100%);color: #FEFEFF;" @click="handleType(1)" type="primary" size="small">详情</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-pagination style="text-align: right;" :current-page="paginationObj.page" :page-sizes="[10, 20, 50, 100]"
                :page-size="paginationObj.pageSize" :total="paginationObj.total"
                layout="total, sizes, prev, pager, next, jumper" @size-change="pageSizeChangeHandle"
                @current-change="pageCurrentChangeHandle" /> -->
    </div>

    <AddDialog ref="add" @updateData="query" />
  </div>
</template>

<script>
// import Pagination from '@/components/Pagination'
import AddDialog from "./add.vue";
import { departmentList, departmentDelete,departmentArr } from "@/api/project";
export default {
  components: { AddDialog },
  data() {
    return {
      form: {

      },
      list: [],
      departmentList:[]
    };
  },
  mounted() {
    console.log(this.$store.state.user);
    this.query();
    this.departmentFnc();
  },
  methods: {
    async departmentFnc(){
      let res = await departmentArr({per_page:1000});
            console.log(res)
            if (res.code == 200) {
                this.departmentList = res.data.list;
            }
    },
    handleEdit(row) {
      this.$refs.add.open(row);
    },
    setTitle({ rowIndex, columnIndex }) {
      return "background:#D2DFF9;color:#404659;font-size:14px;";
    },
    async query() {
      let res = await departmentList();
      console.log(res);
      if (res.code == 200) {
        //   this.list = res.data;
        res.data.forEach((element) => {
          element.children = element.all_child_department;
        });
        this.list = res.data;
      }
    },
    addBtn() {
      this.$refs.add.open();
    },
    deleteItem(item) {
      this.$confirm("此操作将删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await departmentDelete(item.id);
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
    openDetail(item) {
      console.log(item);
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
