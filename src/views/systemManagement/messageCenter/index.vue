<template>
    <div>
        <div style="margin-bottom: 10px;display: flex;flex-direction: row;padding-left: 30px;padding-top: 20px;">
            <div class="botton btn5" @click="addBtnFnc">标记已读</div>
        </div>
        <div class="list">
            <el-table :data="list" style="width: 100%" border fit highlight-current-row  @selection-change="handleSelectionChange">
                <el-table-column type="selection" label="勾选" width="45"></el-table-column>
                <el-table-column type="index" label="序号" width="100"></el-table-column>
                <el-table-column prop="notice" label="消息标题" >
                    <template slot-scope="scope">
                        <span>{{ scope.row.notice.title }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="notice" label="消息内容" >
                    <template slot-scope="scope">
                        <span>{{ scope.row.notice.content }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="notice" label="创建时间" >
                    <template slot-scope="scope">
                        <span>{{ scope.row.notice.created_at }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="notice" label="更新时间" >
                    <template slot-scope="scope">
                        <span>{{ scope.row.notice.updated_at }}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="created_at" label="操作" width="300">
                    <template slot-scope="scope">
                        <div style="margin-bottom: 10px;display: flex;flex-direction: row;padding-left: 50px;">
                            <!-- <div class="botton btn5" @click="goDetail(item)">详情</div> -->
                            <div class="botton btn7" @click="addBtn(scope.row)">标记已读</div>
                            <!-- <div class="botton btn6" @click="addBtn">删除</div> -->
                        </div>

                    </template>
                </el-table-column>
            </el-table>
            <!-- <el-pagination style="text-align: right;" :current-page="paginationObj.page" :page-sizes="[10, 20, 50, 100]"
                :page-size="paginationObj.pageSize" :total="paginationObj.total"
                layout="total, sizes, prev, pager, next, jumper" @size-change="pageSizeChangeHandle"
                @current-change="pageCurrentChangeHandle" /> -->
        </div>

    </div>
</template>



<script>

import { noticeList, userNoticeList,userRead } from '@/api/project'
export default {
    data() {
        return {
            form: {
                // name: '',
                // region: ''
            },
            list: [],
            selectList:[]
        }
    },
    mounted() {
        console.log(this.$store.state.user);
        this.query();
    },
    methods: {
        handleSelectionChange(e){
            console.log(e)
            this.selectList = e;
        },
        goDetail(item) {
            this.$router.push({ path: '/messageCenter/detail' })
        },
        async addBtnFnc(){
            if(this.selectList.length==0){
                this.$message({
                        type: 'error',
                        message: '请先勾选数据'
                    });
                    return
            }
            let ids = this.selectList.map((val)=>val.id)
            console.log(ids)
            let res = await userRead({ids});
                console.log(res)
                if (res.code === 200) {
                    this.$message({
                        type: 'success',
                        message: res.msg
                    });
                    this.form.property = 1;
                    this.query()
                } else {
                    this.$message({
                        type: 'error',
                        message: res.msg
                    });
                }

        },
        addBtn(item) {
            // this.$refs.add.open();
            this.$confirm('标记该消息已读, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let res = await userRead({ids:[item.id]});
                console.log(res)
                if (res.code === 200) {
                    this.$message({
                        type: 'success',
                        message: res.msg
                    });
                    this.form.property = 1;
                    this.query()
                } else {
                    this.$message({
                        type: 'error',
                        message: res.msg
                    });
                }

            })
        },
        async query() {
            let res = await userNoticeList(this.form);
            console.log(res);
            if (res.code == 200) {
                this.list = res.data;
            //     this.list = [
            // {id:1,notice:{content: "22233444",created_at: "2023-12-26T05:52:51.000000Z",department_id: 1,id: 7,title: "test2",updated_at: "2023-12-26T05:52:51.000000Z"}},
            // {id:2,notice:{content: "22233444",created_at: "2023-12-26T05:52:51.000000Z",department_id: 1,id: 7,title: "test2",updated_at: "2023-12-26T05:52:51.000000Z"}}]
            }
        },
        deleteItem(item) {
            this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let res = await departmentDelete(item.id);
                console.log(res)
                if (res.code === 200) {
                    this.$message({
                        type: 'success',
                        message: res.msg
                    });
                    this.form.property = 1;
                    this.query()
                } else {
                    this.$message({
                        type: 'error',
                        message: res.msg
                    });
                }

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        onCancel() {
            this.$message({
                message: 'cancel!',
                type: 'warning'
            })
        },
        openDetail(item) {
            console.log(item)
        },
        // 分页, 每页条数
        pageSizeChangeHandle(val) {
            this.page = 1
            this.pageSize = val
            this.query()
        },
        // 分页, 当前页
        pageCurrentChangeHandle(val) {
            this.page = val
            this.query()
        },
        handleType(type) {
            this.$router.push({ name: 'messageNotificationEdit', params: { id: 1 } })
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/btn.scss";

.botton {
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

.btn5 {
    background: linear-gradient(0deg, #6280F5 0%, #2D6CFF 100%);
    color: #FEFEFF;
}

.btn6 {
    background: linear-gradient(0deg, #FC4935 0%, #FC6235 100%);
    color: #FEFEFF;
}

.btn7 {
    background: #DCE3FD;
    color: #3E72FB;
}

.form {
    // padding-top: 20px;
    background-color: white;
    margin-bottom: 30px;
}

.list {
    width: 100%;
    height: 100%;
    background-color: #EBEFFE;
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
}</style>