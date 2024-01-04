<template>
  <div>
    <div class="left-form">
      <div class="file-form">
        <div class="file-form-item">
          <div class="left"></div>
          <div class="right">
            <div class="title">
              <span><span v-if="is_required == 1" style="color: red">*</span> {{ title }}</span>
            </div>
            <div class="upload">
              <div class="file-list">
                <div class="item" v-for="(item, index) in fileList" :key="index">
                  <div class="file-icon">
                    <img src="../../../assets/file_icon.png" alt="" srcset="" />
                  </div>
                  <span class="span">{{ item.title }}.{{ item.type }}</span>
                  <div class="delete" style="width: 20px; margin-right: 10px" @click="deleteFile(item, index)">
                    <img v-if="type == 'add'" style="width: 100%" src="../../../assets/delete_icon.png" alt=""
                      srcset="" />
                  </div>
                  <div style="font-size: 22px" @click="seeDetail(item, index)">
                    <i class="el-icon-zoom-in"></i>
                  </div>
                </div>
              </div>
              <div class="upload-btn">
                <div class="btn" v-if="type == 'add'">
                  <img class="img" src="../../../assets/upload_icon.png" alt="" srcset="" />
                  <!-- :action="uploadUrl"
                                        :headers="headers" -->
                  <el-upload class="upload-demo" :action="uploadUrl" :headers="headers" :show-file-list="false" :limit="3"
                    :on-exceed="handleExceed" :file-list="fileList" :on-progress="uploadVideoProcess"
                    :http-request="httpRequest" :on-success="handleSuccess">
                    <!-- :http-request="httpRequest" -->
                    <div style="
                          display: flex;
                          flex-direction: row;
                          align-items: center;
                        ">
                      <div class="upload">
                        <span class="span">上传文件</span>
                      </div>
                    </div>
                  </el-upload>
                </div>
                <span>文件名格式：xxxxx项目-文件名称(例委托招标函) 支持扩展名: .rar .zip .doc 、docx .pdf.jpg..</span>


              </div>
            </div>
            <el-progress v-if="progressFlag" :percentage="loadProgress"></el-progress>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getToken } from "@/utils/auth";
import { uploadSlice, uploadFile } from '@/api/project.js'
export default {
  props: {
    is_required: {
      type: Number | undefined,
      default: 1
    },
    type: {
      type: String,
      default: "add",
    },
    title: {
      type: String,
      default: "test",
    },
    fileList: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      loadProgress: 0, // 动态显示进度条
      progressFlag: false, // 关闭进度条
    };
  },
  computed: {
    uploadUrl() {
      return process.env.VUE_APP_UPLOAD_API + "/user/upload_file";
    },
    headers() {
      return {
        Authorization: `Bearer ${getToken()}`,
      };
    },
  },
  methods: {
    async httpRequest(e, a, b) {
      console.log(e, a, b);
      // if(!e.file.name.includes('项目')){
      //   this.$message.error('文件名称请使用对应项目格式,例如xxxx项目-委托招标函')
      //   return
      // }

      this.progressFlag = true; // 显示进度条
      let data = await this.beforeUpload(e.file)
      // console.log(data)

      if (data.length > 0) {
        let e = data[0];
        e.data.title = e.data.file_name;
        this.$emit("updateFile", e.data);
      }
    },
    uploadVideoProcess(event, file, fileList) {
      this.progressFlag = true; // 显示进度条
      this.loadProgress = parseInt(event.percent); // 动态获取文件上传进度
      if (this.loadProgress >= 100) {
        this.loadProgress = 100;
        setTimeout(() => {
          this.progressFlag = false;
        }, 1000); // 一秒后关闭进度条
      }
    },

    seeDetail(item, index) {
      if (item.url) {
        window.open(item.url);
      }
    },
    deleteFile(item, index) {
      // this.fileList.splice(index,1)
      this.$emit("updateFile", index, item);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length
        } 个文件`
      );
    },
    handleProgress(e, file, fileList) {
      // console.log(e, file, fileList);
    },
    handleSuccess(e, file, fileList) {
      // console.log(e, file, fileList, "----");
      if (e.code === 200) {
        e.data.title = e.data.file_name;
        this.$emit("updateFile", e.data);
        // this.fileList.push(e.data);
      }
    },
    async uploadSmallFile(file) {
      let res = await uploadFile()
    },
    async beforeUpload(file) {
      // 在这里进行切片处理
      const chunkSize = 2 * 1024 * 1024; // 2MB
      const chunks = Math.ceil(file.size / chunkSize);
      const promises = [];

      console.log(chunks, '---')
      if (file.size == 0) {
        this.$message.error('不能上传空文件')
        this.progressFlag = false;
        this.loadProgress = 0;
        return
      }
      for (let i = 0; i < chunks; i++) {
        const start = i * chunkSize;
        const end = start + chunkSize;
        const chunk = file.slice(start, end);
        this.loadProgress = +(i * ((100 / chunks))).toString().split('.')[0];
        // console.log(file)
        const formData = new FormData();
        formData.append("filename", file.name);  //文件名
        formData.append("file", chunk);
        formData.append("chunk", i + 1);   //第几片
        formData.append("chunkLength", chunks);  //总片数
        formData.append("uuid", file.uid);  //uuid


        // 发送切片请求
        const promise = await this.uploadChunk(formData);
        if (promise.code == 200 && promise.data.url) {
          promises.push(promise);
        }

      }


      // 返回一个 Promise.all，确保所有切片上传完成后再继续整体上传
      this.progressFlag = false;
      this.loadProgress = 0;
      return Promise.all(promises);
    },
    async uploadChunk(formData) {

      // 发送切片上传请求
      return await uploadSlice(formData);
    },
    handleSuccess(response, file, fileList) {

      // 整体上传成功后的处理
      // console.log("上传成功", response,file,fileList);
    },
    handleError(error, file, fileList) {
      // 上传失败的处理
      console.error("上传失败", error);
    },
  },
};
</script>

<style lang="scss" scoped>
// @import url('../mixins.scss');
.left-form {
  .file-form {
    .file-form-item {
      display: flex;
      flex-direction: row;
      margin-bottom: 40px;

      .left {
        width: 1px;

        .title {
          color: #404659;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 14px;
        }
      }

      .right {
        width: 100%;
        box-sizing: border-box;

        .title {
          color: #404659;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 14px;
        }

        .upload {
          display: flex;
          flex-direction: column;

          .file-list {
            display: flex;
            flex-direction: column;

            .item {
              display: flex;
              flex-direction: row;
              align-items: center;
              flex-wrap: nowrap;
              margin-bottom: 13px;

              .file-icon {
                width: 18px;
                height: 15px;
                margin-right: 10px;

                img {
                  width: 100%;
                }
              }

              .span {
                color: #404659;
                font-size: 16px;
                margin-right: 12px;
                max-width: 200px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: normal;
                // display: -webkit-box;
                // -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
              }

              .delete {}
            }
          }

          .upload-btn {
            display: flex;
            align-items: center;
            font-size: 12px;
            color: #a6a9bc;
            flex-direction: row;

            .btn {
              min-width: 100px;
              height: 36px;
              border: 1px solid #2d6cff;
              border-radius: 4px;
              margin-right: 19px;
              font-size: 12px;
              color: #404659;
              display: flex;
              justify-content: center;
              align-items: center;

              .upload-demo {
                display: flex;
                justify-content: row;
                align-items: center;
              }

              .img {
                margin-right: 6px;
              }
            }

            .span {
              font-size: 12px;
              color: #a6a9bc;
              padding-top: 2px;
            }
          }
        }
      }
    }
  }
}
</style>
