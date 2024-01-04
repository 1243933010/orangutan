<template>
  <div class="step">
    <div class="title">
      <div class="icon">
        <img src="../assets/liucheng.png" srcset="" />
      </div>
      <span>流程指引</span>
    </div>
    <ul class="step-list">
      <!-- <div class="line">
        <div class="done" :style="`height: ${stepCount * 53}px`"></div>
        <div
          class="doing"
          :style="`height: calc(100% - ${stepCount * 53}px)`"
        ></div>
      </div> -->
      <li class="step-item" v-for="(item, index) in stepList" :key="index"
        :class="{ undone: item.isActive, done: item.isInput }">
        <div class="space-box" v-if="index !== 0"></div>
        <div class="line" v-if="index !== 0"></div>
        <div class="step-text">
          <div class="icon">
            <img src="../assets/gou.png" class="img" />
          </div>
          <div class="text" :class="item.isActive?'file-text':''">{{ item.title }}</div>
          <!-- <div class="text " v-if="item.isActive">请输入{{ item.title }}</div> -->

        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    stepList: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      stepH: 53,
      stepCount: 0,
      isOver: false,
    };
  },
  mounted() { },
};
</script>

<style lang="scss" scoped>
.step {
  width: 150px;
  height: 100%;
  background-color: #fff;
  box-sizing: border-box;
  min-height: 50%;
  flex-grow: 1;
  border-right: 2px solid #EAEDEC;

  .title {
    display: flex;
    align-items: center;
    margin-bottom: 42px;
    padding-top: 20px;
    .icon {
      width: 14px;
      margin-right: 8px;

      img {
        width: 100%;
      }
    }

    span {
      color: #404659;
      font-size: 16px;
    }
  }

  .step-list {
    margin: 0;
    padding: 0;
    position: relative;

    .step-item {
      margin: 0;
      padding: 0;
      list-style: none;
      position: relative;
      z-index: 1;

      .step-text {
        display: flex;
        align-items: center;

        position: absolute;
        bottom: 0;
        left: 0;

        .icon {
          margin-right: 8px;
          border-radius: 50%;
          border: 2px solid #a6a9bc;
          padding: 3px;
          width: 16px;
          height: 16px;
          background-color: #fff;

          display: flex;
          align-items: center;
          justify-content: center;

          img {
            width: 10px;
          }
        }

        .text {
          font-size: 14px;
          color: #404659;
        }
        .file-text{
          color: red;
        }
      }

      &.done {
        .step-text {
          .icon {
            background-color: #3961f8;
            border: none;
          }
        }

        .line {
          background: linear-gradient(0deg, #3958f8 0%, #378cf7 100%);
          transition: height 0.5s;
        }
      }

      &.undone {
        .step-text {
          .icon {
            border-color: #3961f8;
          }
        }
      }

      &.undone+.done {
        .line {
          background: #eaedec;
          transition: height 0.5s;
        }
      }

      &:first-child {
        .step-text {
          position: static;
        }
      }

      .space-box {
        width: 100%;
        height: 53px;
      }

      .line {
        width: 3px;
        height: 100%;
        background: #eaedec;

        position: absolute;
        top: 0;
        left: 6px;
      }
    }
  }
}
</style>
