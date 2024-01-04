<template>
  <div>
    <el-form
      ref="formInfo"
      :disabled="disabled"
      :inline="true"
      :rules="rules"
      :model="formInfo"
      class="demo-form-inline"
      label-width="100px"
    >
      <!-- <el-col :span="12">
        <el-form-item label="需求单位" prop="demand_department_id">
          <el-select v-model="formInfo.demand_department_id" placeholder="请选择需求单位">
            <el-option v-for="(item,index) in selectList" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-col> -->
      <el-col :span="12">
        <el-form-item
          label="项目负责人"
          prop="project_leader"
          placeholder="请输入项目负责人"
        >
          <el-input v-model="formInfo.project_leader" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          label="联系电话"
          prop="contact_phone"
          placeholder="请输入联系电话"
        >
          <el-input v-model="formInfo.contact_phone" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="项目名称" prop="name" placeholder="请输入项目名称">
          <el-input v-model="formInfo.name" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="项目类型" prop="type">
          <el-select v-model="formInfo.type" placeholder="请选择项目类型">
            <el-option label="服务" value="service" />
            <el-option label="货物" value="goods" />
            <el-option label="工程" value="engineering" />
          </el-select>
        </el-form-item>
      </el-col>
      <!-- <el-col :span="12">
        <el-form-item label="项目编号" prop="no" placeholder="请输入项目编号">
          <el-input v-model="formInfo.no" />
        </el-form-item>
      </el-col> -->
      <el-col :span="12">
        <el-form-item
          label="审计金额"
          prop="audit_amount"
          placeholder="请输入审计金额"
        >
          <el-input v-model="formInfo.audit_amount" type="number"  />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          label="预算金额"
          prop="budget"
          placeholder="请输入预算金额"
        >
          <el-input v-model="formInfo.budget" type="number" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="采购方式" prop="procurement_method">
          <el-select
            v-model="formInfo.procurement_method"
            placeholder="请选择采购方式"
          >
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="(item, index) in procurementMethodList"
              :key="index"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="采购意向公开日期" prop="public_date">
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="formInfo.public_date"
            type="date"
            placeholder="请选择采购意向公开日期"
          >
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item
          label="采购意向公告链接"
          prop="notice_link"
          placeholder="请输入采购意向公告链接"
          label-width="150px"
        >
          <el-input v-model="formInfo.notice_link" type="text" />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="" prop="input12">
          <div class="form-title" style="padding-left: 20px">
            <span><span style="color: red">*</span> 是否面向中小微企：</span>
          </div>
          <div v-for="(item, index) in radioLabelList" :key="index">
            <div class="radio-item" @click="setIndex(index)">
              <div
                class="radio-class"
                :class="item.checked ? 'active' : ''"
              ></div>
              <span>{{ item.label }}</span>
            </div>
            <div
              class="radio-item-child"
              v-if="item.child.length > 0 && item.checked"
            >
              <div
                class="radio-item"
                v-for="(ite, ind) in item.child"
                :key="ind"
                @click="setChildIndex(item, ite, ind)"
              >
                <div
                  class="radio-class"
                  :class="ite.checked ? 'active' : ''"
                ></div>
                <span
                  >{{ ite.label1 }}
                  <el-input
                    v-if="ite.num !== undefined"
                    style="width: 10%"
                    v-model="ite.num"
                    size="small"
                    type="text"
                  ></el-input>
                  <span>{{ ite.label2 }}</span>
                </span>
              </div>
            </div>
          </div>
        </el-form-item>
      </el-col>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    pageStatus: {
      type: String,
      default: "detail",
    },
  },
  data() {
    return {
      rules: {
        // demand_department_id: [
        //   { required: true, message: '请选择需求单位', trigger: 'blur' },
        // ],
        project_leader: [
          { required: true, message: "请输入项目负责人", trigger: "blur" },
        ],
        contact_phone: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          // {
          //   pattern:/^1[3456789]\d{9}$/,
          //   message: "请输入正确的手机号码或者座机号",
          // },
        ],
        name: [{ required: true, message: "请输入项目名称", trigger: "blur" }],
        type: [{ required: true, message: "请选择项目类型", trigger: "blur" }],
        no: [{ required: true, message: "请输入项目编号", trigger: "blur" }],
        audit_amount: [
          { required: true, message: "请输入审计金额", trigger: "blur" },
        ],
        budget: [
          { required: true, message: "请输入预算金额", trigger: "blur" },
        ],
        procurement_method: [
          { required: true, message: "请选择采购方式", trigger: "blur" },
        ],
        public_date: [
          { required: true, message: "请选择日期", trigger: "blur" },
        ],
        notice_link: [
          {
            required: true,
            message: "请输入采购意向公告链接",
            trigger: "blur",
          },
        ],

        // input12: [
        //     { required: true, message: '请选择采购代理机构名称', trigger: 'blur' },
        // ],
      },
      activeIndex: 0,
      childRadioBool: false,
      childRadioIndex: 0,

      procurementMethodSelect: [
        [
          { label: '公开招标', value: 1 },
          { label: '邀请招标', value: 2 },
          { label: '竞争性谈判', value: 3 },
          { label: '竞争性磋商', value: 4 },
          { label: '单一来源采购', value: 5},
          { label: '询价', value: 6},
          { label: '其他', value: 7 },

        ], [
          { label: '遴选采购', value: 8 },
          { label: '竟价采购', value: 9 },
          { label: '直选采购', value: 10 },
          { label: '自行直接采购', value: 11 },
        ]
      ],
      isFirstTime: true
    };
  },
  watch: {
    radioLabelList: {
      handler(newValue, oldValue) {
        newValue.forEach((element, index) => {
          if (element.checked && index !== 1) {
            this.formInfo.input12 = "true";
          } else if (element.checked && index == 1) {
            element.child.forEach((val, ind) => {
              if (val.checked && val.num == undefined) {
                this.formInfo.input12 = "true";
              } else if (val.checked && val.num !== undefined && !val.num) {
                this.formInfo.input12 = "";
              } else if (val.checked && val.num !== undefined && val.num) {
                this.formInfo.input12 = "true";
              }
            });
          }
        });
        // console.log(
        //   this.formInfo.input12,
        //   this.$store.state.projectManagementAdd.formInfo.input12,
        //   "6666666"
        // );
      },
      deep: true,
    },
    'formInfo.audit_amount'(newValue,oldValue){
      let price = 1000000;
      if(this.formInfo.type=='engineering'){
        price = 1200000;
      }else{
        price = 1000000;
      }
      // console.log(oldValue,'oldvalue')
      if((+oldValue)>=price&&newValue<price){
        this.formInfo.procurement_method = ''
      }else if((+newValue)>=price&&oldValue<price){
        
        if(oldValue==''){
          
        }else{
          this.formInfo.procurement_method = ''
        }
      }
    }
  },
  computed: {
    procurementMethodList(){
         let price = 1000000;
      if(this.formInfo.type=='engineering'){
        price = 1200000;
      }else{
        price = 1000000;
      }
      console.log('this.formInfo.audit_amount',this.isFirstTime)
      if((+this.formInfo.audit_amount)>=price){
        return this.procurementMethodSelect[0]
      }else{
        return this.procurementMethodSelect[1]
      }
    },
    formInfo() {
      return this.$store.state.projectManagementAdd.formInfo;
    },
    selectList() {
      return [
        {
          label: this.$store.state.user.department,
          value: this.$store.state.user.department,
        },
      ];
    },
    radioLabelList() {
      if (this.disabled !== true) {
        return this.$store.state.projectManagementAdd.radioLabelList;
      } else {
        let arr = [];
        this.$store.state.projectManagementAdd.radioLabelList.forEach((val) => {
          if (val.checked) {
            arr.push(val);
          }
        });
        return arr;
      }
    },
  },
  methods: {

    verifyForm(callback) {
      this.$refs.formInfo.validate((valid) => {
        callback(valid);
        if (valid) {
          return true;
        } else {
          return false;
        }
      });
    },
    setIndex(ind) {
      // this.activeIndex = ind;
      this.childRadioBool = false;
      this.radioLabelList.forEach((element) => {
        element.checked = false;
      });
      this.radioLabelList[ind].checked = true;
      if (ind == 1) {
        this.childRadioBool = true;
        this.childRadioIndex = 0;
      }
      // console.log(this.$store.state.projectManagementAdd.radioLabelList)
    },
    setChildIndex(item, ite, ind) {
      item.child.forEach((element) => {
        element.checked = false;
        if (element.num !== undefined) {
          element.num = "";
        }
      });
      this.childRadioIndex = ind;
      ite.checked = true;
      // console.log(this.$store.state.projectManagementAdd.radioLabelList)
    },
  },
};
</script>

<style lang="scss" scoped>
.radio-item-child {
  padding-left: 20px;
}

.radio-item {
  display: flex;
  flex-direction: row;
  padding-left: 20px;
  // align-items: center;
  cursor: pointer;

  span {
    max-width: 80%;
    display: flex;
    flex-wrap: wrap;
  }

  .radio-class {
    border: 1px solid #dcdfe6;
    border-radius: 100%;
    width: 14px;
    height: 14px;
    background-color: #fff;
    position: relative;
    cursor: pointer;
    display: inline-block;
    box-sizing: border-box;
    margin-top: 10px;
    margin-right: 10px;

    &::after {
      content: "";
      width: 0;
      height: 0;
      border-radius: 50%;
      transform: translate(-50%, -50%) scale(0);
      transition: transform 0.15s ease-in;
      position: absolute;
      left: 50%;
      top: 50%;
      background-color: white;
    }

    &.active {
      background: #409eff;

      &::after {
        width: 5px;
        height: 5px;
        transform: translate(-50%, -50%) scale(1);
      }
    }
  }
}

.box {
  // padding-bottom: 35px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;

  .box-left {
    display: flex;
    height: auto;
    background-color: white;
    max-width: 1000px;

    .form {
      min-width: 500px;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      background-color: white;
      padding-bottom: 35px;
    }

    // max-width: 1100px;
    .step1 {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      box-sizing: border-box;
      padding: 74px 0 0 58px;
      margin-bottom: 37px;

      .item {
        font-size: 14px;
        color: #1d70ff;
        margin-right: 46px;
        display: flex;
        flex-direction: row;
        align-items: center;

        img {
          width: 14px;
          margin-right: 15px;
        }

        span {
          margin-right: 18px;
        }

        div {
          width: 80px;
          height: 2px;
          background: linear-gradient(
            90deg,
            #1d70ff 0%,
            rgba(29, 112, 255, 0) 100%
          );
        }
      }

      .active {
        color: #a6a9bc;

        div {
          background: linear-gradient(
            90deg,
            #a6a9bc 0%,
            rgba(166, 169, 188, 0) 100%
          );
        }
      }
    }
  }
}
</style>
