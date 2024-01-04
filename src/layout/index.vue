<template>
  <div class="pages">
    <!-- <div class="header">
      <div class="city-bg">
        <img src="../assets/city_bg.png" class="img" />
      </div>

      <div class="left-log">
        <div class="logo">
          <img src="../assets/logo.png" class="img" />
        </div>
        <div class="platform-name">采购业务工作管理系统</div>
      </div>

      <div class="avatar-team-name">
        <div class="message-icon" @click="openMessage" v-if="noticeNum>0">
          <el-badge :value="noticeNum" class="item">
            <img src="../assets/message_yellow.png" class="img" />
          </el-badge>
        </div>
        <div class="team-name">{{ name }}</div>
        <div class="avatar">
          <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
            <div class="avatar-wrapper">
              <img :src="avatar||'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80'" class="user-avatar">
              <i class="el-icon-caret-bottom" />
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item divided @click.native="goMe">
                <span style="display:block;">个人中心</span>
              </el-dropdown-item>
              <el-dropdown-item divided @click.native="logout">
                <span style="display:block;">退出</span>
              </el-dropdown-item>
              
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div> -->

    <div :class="classObj" class="app-wrapper">
      <div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
      <sidebar class="sidebar-container" />
      <div :class="{ hasTagsView: needTagsView }" class="main-container">
        <div :class="{ 'fixed-header': fixedHeader }">
          <navbar />
          <tags-view v-if="needTagsView" />
        </div>
        <app-main />
      </div>
    </div>
    <el-dialog title="代办事项"  center :visible.sync="dialogVisible" width="50%" :show-close="false">
      <div class="close">
        <img @click="dialogVisible=false" src="../assets/close_icon.png" alt="" srcset="">
      </div>
      <el-table :data="list" border fit highlight-current-row style="z-index: 10000;position: relative;">
        <el-table-column align="center" label="ID" width="95">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column label="项目名称">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="部门" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.demand_department }}</span>
          </template>
        </el-table-column>
        <el-table-column label="经办人" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.project_leader }}</span>
          </template>
        </el-table-column>
        <el-table-column label="项目状态" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.status_text }}</span>
          </template>
        </el-table-column>
        <el-table-column label="审核时间" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.updated_at }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <!-- {{ scope.row.time }} -->
            <el-button type="primary" @click="handleData(scope.row)">处理</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import RightPanel from '@/components/RightPanel'
import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState, mapGetters } from 'vuex'
import {needDo,userNoticeList} from '@/api/project'
export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    RightPanel,
    Settings,
    Sidebar,
    TagsView
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader,
      name:state => state.user.name,
      avatar:state => state.user.avatar,

    }),
    ...mapGetters([
      'sidebar',
      'avatar',
      'device',
      'user'
    ]),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
      list: [],
      listLoading: false,
      noticeNum:0
    }
  },
  mounted(){
    let dialog = localStorage.getItem('dialog');
    // console.log(dialog)
    // if(dialog=='true'){
      
      this.getList();
      localStorage.setItem('dialog',false)
    // }
    this.query();
  },
  methods: {
    async query() {
            let res = await userNoticeList(this.form);
            // console.log(res);
            if (res.code == 200) {
                this.noticeNum = res.data.length;
            //     this.list = [
            // {id:1,notice:{content: "22233444",created_at: "2023-12-26T05:52:51.000000Z",department_id: 1,id: 7,title: "test2",updated_at: "2023-12-26T05:52:51.000000Z"}},
            // {id:2,notice:{content: "22233444",created_at: "2023-12-26T05:52:51.000000Z",department_id: 1,id: 7,title: "test2",updated_at: "2023-12-26T05:52:51.000000Z"}}]
            }
        },
    handleData(item){
      // console.log(item)
      //this.$router.push({ path: "/projectManagementDetail",query:{id:item.id} }),
      let url = '';
      if([0,2,4].includes(item.status)){
         url = '/projectManagementEdit'
      }
      if([1,3].includes(item.status)){
         url = '/projectManagementDetail'
      }
      if([5,6,7,8,9,10].includes(item.status)){
        url = 'ImplementationCommission/edit'
      }
      if([11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28].includes(item.status)){
         url = 'thirdProjects/edit'
      }
      if([29,30,31,32,33,34,35].includes(item.status)){
         url = 'contractManagement/edit'
      }
      this.dialogVisible = false;
      this.$router.push({ path: url,query:{id:item.id} });
    },
    async getList(){
      let res = await needDo();
      // console.log(res)
      if(res.code==200){
        if(res.data.total>0){
        this.dialogVisible = true;
        this.list = res.data.projects;
       }
      }
    },
    async goMe(){
      this.$router.push({name:"meCenter"})
    },
    async logout() {
      localStorage.clear();
      this.clearCookies();
      // await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    async openMessage() {
      // console.log('1111')
      // this.dialogVisible = true
      this.$router.push({name:'messageCenter'})
    },
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
     clearCookies() {
    // 获取当前所有的 cookie
    var cookies = document.cookie.split(";");

    // 遍历所有 cookie，并将其过期时间设置为过去的时间
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";
::v-deep .el-dialog__header {
    background: linear-gradient(0deg, #2E6DFF 0%, #6280F5 100%);

    .el-dialog__title {
        color: white;
        font-size: 16px;
        font-weight: 600;
    }
    
}
.close{
      position: absolute;
      top: 10px;
      right: 18px;
      img{
        width: 31px;
        height: 31px;
      }
    }
.pages {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.header {
  padding: 20px 50px 20px 30px;
  display: flex;
  justify-content: space-between;
  height: 85px;
  background: linear-gradient(0deg, #EEF4FA 0%, #7DBCED 100%);
  position: relative;

  .city-bg {
    width: 300px;
    position: absolute;
    top: 50%;
    right: 100px;
    transform: translateY(-50%);

    .img {
      width: 100%;
    }
  }

  .left-log {
    display: flex;

    .logo {
      margin-right: 55px;
      height: 100%;
      font-size: 0;

      img {
        height: 100%;
      }
    }

    .platform-name {
      color: #FC5535;
      font-size: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .avatar-team-name {
    display: flex;
    align-items: center;

    .message-icon {
      margin-right: 20px;
      width: 18px;
      font-size: 0;

      .img {
        width: 100%;
      }
    }

    .team-name {
      margin-right: 15px;
      color: #333;
      font-size: 16px;
      font-weight: bold;
    }

    .avatar {
      border-radius: 50%;
      border: 4px solid #E5E5E5;
      width: 48px;
      height: 48px;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      .img {
        width: 100%;
        height: 100%;
        background-color: #fff;
      }
    }
  }
}

.app-wrapper {
  @include clearfix;
  position: relative;
  width: 100%;
  min-height: 10%;
  flex-grow: 1;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.mobile .fixed-header {
  width: 100%;
}
</style>
