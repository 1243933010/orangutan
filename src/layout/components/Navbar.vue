<template>
  <div class="navbar">
    <!-- <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    /> -->
    <div class="back" @click="back">返回</div>

    <span class="radio"></span>
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">


    </div>


  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import Search from '@/components/HeaderSearch'
export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    Search
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device'
    ])
  },
  data() {
    return {
      dialogVisible: false,
      list: [
        { title: '标题', content: '内容', time: '199966' },
        { title: '标题', content: '内容', time: '199966' },
        { title: '标题', content: '内容', time: '199966' }
      ],
      listLoading: false
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    async openMessage() {
      this.dialogVisible = true
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.right-menu-tz {
  margin-left: 15px;
  padding-top: 15px;

  // display: flex;
  // justify-content: center;
  // align-items: center;
  img {
    width: 20px;
    height: 27px;
  }
}

.navbar {
  border-radius: 10px 10px 0 0;
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;

  .back {
    width: 60px;
    height: 31px;
    background: #FFFFFF;
    border: 1px solid #EAEDEC;
    border-radius: 6px;
    color: #404659;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 17px;
    margin-left: 20px;
    cursor: pointer;
  }

  .radio {
    width: 10px;
    height: 10px;
    background: linear-gradient(0deg, #FF8A01 0%, #FF4F01 100%);
    border-radius: 50%;
  }

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
