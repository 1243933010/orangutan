<template>
  <div>
      <el-dialog title="添加用户" center :visible.sync="dialogVisible" width="50%" :show-close="false">
          <div class="close">
              <img @click="dialogVisible=false" src="../../../assets/close_icon.png" alt="" srcset="">
          </div>
          
          <el-form class="form" ref="formInfo" :inline="true" center  :rules="rules" size="small" :model="formInfo" label-width="100px">              
                  <el-form-item label="登录密码" prop="password">
                    <el-input v-model="formInfo.password" placeholder="请输入登录密码" />
                  </el-form-item>
          </el-form>
          <div class="btn">
              <div class="btn1"  @click="cancelFnc">取消</div>
              <div class="btn2"  @click="addMessage">确定</div>
              
          </div>
      </el-dialog>
  </div>
</template>


<script>
import { resetPassword } from '@/api/project'
export default {
  data() {
      return {
          formInfo: {
              password:'',
          },
          dialogVisible: false,
          rules: {
              password: [
                  { required: true, message: '请输入密码', trigger: 'blur' },
              ],
          },
      }
  },


  methods: {
      cancelFnc(){
          this.formInfo={
            password:'',
          }
          this.dialogVisible = false;
      },
      async addMessage() {
          this.$refs.formInfo.validate(async(valid) => {
           if (valid) {
              let res  = await resetPassword(this.formInfo); 
          console.log(res)
          if (res.code == 200) {
              this.$message.success(res.msg);
              this.$emit('updateData')
              this.dialogVisible = false;
              return
          }
          this.$message.error(res.msg);
        } else {
         
          return false;
        }

      });
         
      },
      open(row) {
         this.formInfo= {
              password:''
          }
          if (row) {
              this.formInfo.id = row.id;
          }
          this.dialogVisible = true;
      },

  }
}
</script>

<style lang="scss" scoped>
.close {
  position: absolute;
  top: 8px;
  right: 10px;
}
::v-deep .el-dialog__header {
  background: linear-gradient(0deg, #2E6DFF 0%, #6280F5 100%);

  .el-dialog__title {
      color: white;
      font-size: 16px;
      font-weight: 600;
  }
}

.upload {
  width: 100px;
  height: 36px;
  background: #FFFFFF;
  border: 1px solid #2D6CFF;
  // border-: linear-gradient(0deg, #2D6CFF, #2172FF) 10 10;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;

  img {
      margin-right: 5px;
  }
}

.btn {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  div {
      width: 86px;
      height: 36px;
      background: #DCE3FD;
      border-radius: 4px;
      font-size: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 10px;
  }

  .btn1 {
      background: #DCE3FD;
      color: #2D6CFF;
  }

  .btn2 {
      background: linear-gradient(0deg, #6280F5 0%, #2D6CFF 100%);
      color: #FEFEFF;
  }
}
</style>

