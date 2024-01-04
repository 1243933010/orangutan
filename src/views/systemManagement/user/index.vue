<template>
    <div style="height: 100%;">
        <div class="content">
            <div class="left">
                <div class="box">
                    <div class="item" v-for="(item, index) in treeList" :key="index">
                        <div class="title" @click="handleClick('parent',item, index)">
                            <span :class="index == parentInd ? 'active' : ''">{{ item.name }}</span>
                            <i v-if="item.all_child_department.length > 0 && index !== parentInd" class="el-icon-arrow-right"></i>
                            <i v-if="item.all_child_department.length > 0 && index == parentInd" class="el-icon-arrow-down"></i>

                        </div>
                        <div class="child">
                            <div class="item" v-for="(value, ind) in item.all_child_department" :key="ind">
                                <div class="title" @click="handleClick('child',value, ind, index)">
                                    <span :class="parentInd == index && childInd == ind ? 'active' : ''"> {{ value.name
                                    }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right">
                <el-form class="form" ref="form" size="small" inline :model="form" label-width="120px">
                    <el-form-item label="用户姓名" placeholder="请输入用户姓名">
                        <el-input v-model="form.nickname" />
                    </el-form-item>
                    <!-- <el-form-item label="部门名称">
                        <el-select v-model="form.region" placeholder="请输入用户姓名">
                            <el-option label="Zone one" value="shanghai" />
                            <el-option label="Zone two" value="beijing" />
                        </el-select>
                    </el-form-item> -->
                    <el-form-item label="状态">
                        <el-select  clearable v-model="form.state" placeholder="请选择状态">
                            <el-option label="正常" :value="1" />
                            <el-option label="异常" :value="0" />
                        </el-select>
                    </el-form-item>
                    <!-- <el-form-item label="时间">
                        <el-date-picker v-model="form.region" type="daterange" range-separator="至" start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item> -->
                    <el-form-item>
                        <el-button type="primary"  @click="()=>{form.current_page=1;query()}">搜索</el-button>
                        <!-- <el-button type="primary">重置</el-button> -->
                    </el-form-item>
                </el-form>
                <div style="margin-bottom: 10px;display: flex;flex-direction: row;padding-left: 50px;">
                    <div class="botton btn5" @click="addBtn">新增</div>
                    <!-- <div class="botton btn6" @click="addBtn">删除</div> -->
                    <!-- <div class="botton btn7" @click="addBtn">导出</div> -->
                </div>
                <div class="list">
                    <el-table :data="list" :header-cell-style="setTitle" style="width: 100%" border fit
                        highlight-current-row>
                        <el-table-column type="selection" width="45"></el-table-column>
                        <el-table-column type="index" label="序号" width="50"></el-table-column>
                        <el-table-column prop="nickname" label="姓名" width="200"></el-table-column>
                        <el-table-column prop="roles" label="用户角色" width="300">
                            <template slot-scope="scope">
                                <span>{{ JSON.stringify(scope.row.roles) }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="username" label="登录账号"></el-table-column>
                        <el-table-column prop="department" label="部门名称">
                            <template slot-scope="scope">
                                <span>{{ scope.row.department.name }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="mobile" label="手机号"></el-table-column>
                        <el-table-column prop="state" label="状态">
                            <template slot-scope="scope">
                                <span v-if="scope.row.state==1">正常</span>
                                <span style="color: red;" v-if="scope.row.state==0">异常</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="created_at" label="创建时间"></el-table-column>
                        <el-table-column align="center" prop="created_at" label="操作" width="300">
                            <template slot-scope="scope">
                                <div style="display: flex;flex-direction: row;align-items: center;">
                                    <div class="btn btn1" @click="handleEdit(scope.row)">编辑</div>
                                    <div class="btn btn2" @click="deleteItem(scope.row)">删除</div>
                                    <div class="btn btn3" @click="$refs.passwordRef.open(scope.row)">重置密码</div>
                                    <div class="btn btn4" @click="$refs.roleRef.open(scope.row)">分配角色</div>

                                </div>
                                <!-- <el-button style="background: #DCE3FD;color: #3E72FB;border: none;"  @click="handleType(2)" type="primary" size="small">编辑</el-button>
                        <el-button style="background: linear-gradient(0deg, #FC4835 0%, #FC6235 100%);color: #FEFEFF;" @click="handleType(3)"  type="primary" size="small">删除</el-button>
                        <el-button style="background: linear-gradient(0deg, #6280F5 0%, #2D6CFF 100%);color: #FEFEFF;" @click="handleType(1)" type="primary" size="small">详情</el-button> -->
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination style="text-align: right;" :current-page="form.current_page"
                        :page-sizes="[10, 20, 50, 100]" :page-size="form.per_page" :total="form.total"
                        layout="total, sizes, prev, pager, next, jumper" @size-change="pageSizeChangeHandle"
                        @current-change="pageCurrentChangeHandle" />
                </div>

            </div>
        </div>
        <AddDialog ref="add"  @updateData="updateData"  />
        <passwordDialog ref="passwordRef"  @updateData="updateData"  />
        <roleDialog ref="roleRef"  @updateData="updateData"  />


        
    </div>
</template>



<script>
import AddDialog from './add.vue'
import PasswordDialog from './password.vue'
import roleDialog from './role.vue'

import { userList,userDelete,departmentList } from '@/api/project'
export default {
    components: { AddDialog,PasswordDialog,roleDialog },
    data() {
        return {
            treeList: [],
            parentInd: 0,
            childInd: 0,
            form: {
                nickname: "",
                state: 1,
                department_id:'',
                current_page: 1,
                per_page: 10,
                total: 10
            },
            list: [],
        }
    },
    mounted() {
        console.log(this.$store.state.user);
        // this.query();
        this.getDepartment();
    },
    methods: {
        updateData(){
        this.form.current_page = 1;
        this.query();
    },
        async getDepartment() {
      let res = await departmentList();
      console.log(res);
      if (res.code == 200) {
        this.treeList = res.data;
        this.form.department_id = this.treeList[this.parentInd].id;
        if(this.treeList[this.parentInd].all_child_department.length){
            this.form.department_id = this.treeList[this.parentInd].all_child_department[this.childInd].id;
        }
        this.query();
       
      }
    },
        async query() {
            // let form = { current_page: this.form.current_page, per_page: this.form.per_page, }
            let res = await userList(this.form);
            console.log(res)
            if (res.code == 200) {
                this.list = res.data.list;
                this.form.total = res.data.total;
            }
        },
        addBtn() {
      this.$refs.add.open();
    },
    handleEdit(row) {
      this.$refs.add.open(row);
    },
        setTitle({ rowIndex, columnIndex }) {
            return "background:#D2DFF9;color:#404659;font-size:14px;";
        },
        handleClick(type,item, index, parentInd) {
            this.form.current_page = 1;
            this.form.department_id = item.id;
            if (type == 'parent') {
                this.parentInd = index;
                this.childInd = 0;
            } else {
                this.childInd = index;
                this.parentInd = parentInd
            }
            this.query()
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
        deleteItem(item) {
      this.$confirm("此操作将删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await userDelete(item.id);
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
    }
}
</script>


<style lang="scss" scoped>
.botton {
    width: 80px;
    height: 34px;
    background: #1D70FF;
    margin-right: 16px;
    border-radius: 4px;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.btn {
    width: 59px;
    height: 28px;
    background: #DCE3FD;
    color: #FFFFFF;
    border-radius: 4px;
    margin-right: 16px;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.btn1 {
    background: #DCE3FD;
    color: #3E72FB;
}

.btn2 {
    background: linear-gradient(0deg, #FC4835 0%, #FC6235 100%);
    color: #FEFEFF;
}

.btn3 {
    background: linear-gradient(0deg, #6280F5 0%, #2D6CFF 100%);
    color: #FEFEFF;
}

.btn4 {
    background: linear-gradient(0deg, #FFC22E 0%, #FF952E 100%);
    color: #FEFEFF;
}

.btn5 {
    background: #1D70FF;
    color: #FEFEFF;
}

.btn6 {
    background: linear-gradient(0deg, #FC4935 0%, #FC6235 100%);
    color: #FEFEFF;
}

.btn7 {
    background: #EAEDEC;
    color: #454D65;
}

.active {
    color: #2E6DFF;
}

.content {
    width: 98%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;


    .left {
        width: 310px;
        height: 100%;
        background-color: white;
        margin-right: 10px;
        padding-top: 26px;
        padding-left: 31px;
        color: #454D65;
        font-size: 14px;
        overflow-y: auto;

        .box {
            .item {
                margin-bottom: 10px;

                // font-size: 14px;
                .title {
                    cursor: pointer;
                    margin-bottom: 25px;

                    span {
                        margin-right: 12px;
                    }
                }

                .child {
                    padding-left: 20px;

                    .item {
                        cursor: pointer;
                        margin-bottom: 20px;
                    }
                }
            }
        }
    }

    .right {
        min-width: 500px;
        flex-grow: 1;

        .form {
            padding-top: 20px;
            background-color: white;
            margin-bottom: 30px;
        }

        // background: green;
    }
}</style>