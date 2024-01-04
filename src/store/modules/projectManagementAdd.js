

const state = {
  formInfo: {
    demand_department:'',
    // demand_department_id: "",
    project_leader: "",
    contact_phone: "",
    name: "",
    type: "",
    no: "",
    audit_amount: "",
    budget: "",
    procurement_method: "",
    public_date: "",
    notice_link: "",
    input12: "",
    small_company:'',//是否面向小微企业，不展示
  },
  project_attachments:[
    {type:'purchase_intention',title:'采购意向',description:'',files:[],is_required:1},
    {type:'budget_audit_report',title:'纪保预算审核报告书',description:'',files:[],is_required:1},
    {type:'purchase_demand',title:'采购需求',description:'',files:[],is_required:1},
    {type:'act_plan',title:'实施计划',description:'',files:[],is_required:1},
    {type:'check_opinion',title:'一般性审查意见书',description:'',files:[],is_required:1},
    {type:'main_party_committee',title:'大队党委会',description:'',files:[],is_required:0},
    {type:'detachment_party_committee',title:'支队党委会',description:'',files:[],is_required:1},
    {type:'master_check_opinion',title:'重点审查意见书',description:'',files:[],is_required:0},
    {type:'force_check_opinion',title:'驻点审查意见书（支队级）',description:'',files:[],is_required:0},
    {type:'other_opinions',title:'其他意见书',description:'',files:[],is_required:0},
    {title: "采购计划备案附件", type: "purchase_record",description:'',files:[],is_required:1},


  ],
  radioLabelList: [
    { label: '是:整体专门面向中小企业采购 (即100%)', child: [], checked: false, },
    {
      label: '否: 预留预算总额的货物类、服务类项目不低于30%，工程类项目不低于40%，由需求单位根据实际情况填写专门面向中小企业采购。', child: [
        { label1: '采购项目整体或者设置采购包专门面向中小企业采购', checked: false, },
        { label1: '供应商以联合体形式参加采购活动，联合体中中小企业承担预算总额的', checked: false, label2: '%部分', num: '' },
        { label1: '获得采购合同的供应商将采购项目中的', checked: false, label2: '%分包给一家或者多家中小企业', num: '' },

      ], checked: false,
    },
    { label: '否:项目不适用专门面向中小企业，根据《政府采购促进中小企业发展管理办法》财库[2020] 46 号的规定，符合下列情形之一的，可不专门面向中小企业预留采购份额。', child: [], checked: false, },
  ],
  //实施委托
  ImplementationCommissionForm:{
    choose_no:'',
    choose_time:'',
    no:'',
    agent_id: '',
    agent_receipt:[{type:'agent_receipt',title:'抽取代理机构回执',description:'',files:[],is_required:1}],
    purchase_meeting:[{type:'purchase_meeting',title:'采购例会（支队/大队）',description:'',files:[],is_required:1}],
    files: []
  },
  contractList:[],
  thirdData:{
    bidBaseProject:{
      bid_file_date:'',
      bid_publish_date:'',
      publish_link:'',
      bid_open_date:'',
      doubt:"",
      bid_publish_photo:[],
      // bid_register_file:[],
      bid_file_issue:[],
      project_attachments:[
        // {type:'purchase_meeting',title:'支队/大队采购例会',description:'',files:[],is_required:1},
        {type:'bid_authorization',title:'委托招标函',description:'',files:[],is_required:1},
        {type:'purchase_file_confirm',title:'采购文件确认函',description:'',files:[],is_required:1},
      ]
    },
    startData:{
      bid_files_list:[
        {type:'bid_user_login',title:'投标人签到表',files:[],is_required:1},
        {type:'bid_open_log',title:'开标记录表',files:[],is_required:1},
        {type:'buyer_auth_bid',title:'采购人评标代表授权书',files:[],is_required:1},
        {type:'committee_login',title:'评标委员会签到表',files:[],is_required:1},
        {type:'bid_rules',title:'评标规则',files:[],is_required:1},
        {type:'quality_check',title:'资格审查表、符合性审查表',files:[],is_required:1},
        {type:'bid_process_file',title:'评标过程资料',files:[],is_required:1},
        {type:'bid_report',title:'评标报告',files:[],is_required:1},
        {type:'bid_result_confirm',title:'评标结果确认函',files:[],is_required:1},
      ],
      bid_units:[
        {amount:'',name:"",contact:'',files:[]},
        {amount:'',name:"",contact:'',files:[]},
        {amount:'',name:"",contact:'',files:[]},
      ],
      project_attachments:[
        {type:'expert_info',title:'参与评审专家信息',files:[],description:'',is_required:1},
      ]
    },
    resultData:{
      bid_success_amount:'',
      bid_success_unit:'',
      bid_success_phone:'',
      bid_success_contact:'',
      bid_success_link:'',
      bid_success_publish_date:'',
      // bid_success_unit_type:'',
      bid_success_unit_per:'',
      bid_success_notice_date:'',
      bid_success_photo:[],
      bid_success_notice:[],
      project_attachments:[
        {type:'accusation_question',title:'相关资料（如质疑答复、投书处理决定等）',files:[],description:'',is_required:0},
      ],
      bid_file:[],
      bid_unit_type:[],
      file_compilation:[]
    }
  }
}


const mutations = {
  UPDATE_FORMINFO: (state, form) => {
    state.formInfo = form;
  },
  UPDATE_PROJECT_ATTACHMENTS:(state,list)=>{
    state.project_attachments = list;
  },
  UPDATE_RADIOLABELLIST:(state,list)=>{
    state.radioLabelList = list;
  },
  update_ImplementationCommissionForm:(state,data)=>{
    // console.log(type,data,'}}}')
    if(data.type=='form'){
      state.ImplementationCommissionForm.choose_no = data.data.choose_no;
      state.ImplementationCommissionForm.choose_time = data.data.choose_time;
      state.ImplementationCommissionForm.no = data.data.no;
      state.ImplementationCommissionForm.agent_id = data.data.agent_id;
    }else if(data.type=='file'){
      state.ImplementationCommissionForm.files = data.data;
    }else if(data.type=='chooseFile'){
      state.ImplementationCommissionForm.agent_receipt = data.data;
    }else if(data.type=='purchase'){
      state.ImplementationCommissionForm.purchase_meeting = data.data;
    }
    
  },
  update_contractList:(state,list)=>{
    state.contractList = list;
  },

   ///==========
  update_bidBaseProject:(state,form)=>{
    state.thirdData.bidBaseProject = form;
  },

  update_startData_bid_files_list:(state,list)=>{
    state.thirdData.startData.bid_files_list = list;
  },
  update_startData_bid_units:(state,list)=>{
    state.thirdData.startData.bid_units = list;
  },
  update_startData_project_attachments:(state,list)=>{
    state.thirdData.startData.project_attachments = list;
  },
  update_resultData:(state,form)=>{
    state.thirdData.resultData = form;
  },
  // update_resultData_bid_unit_type:(state,list)=>{
  //   state.thirdData.resultData.bid_unit_type = list;
  // },
  // update_resultData_bid_file:(state,list)=>{
  //   state.thirdData.resultData.bid_file = list;
  // },
  // update_resultData_file_compilation:(state,list)=>{
  //   state.thirdData.resultData.file_compilation = list;
  // },
}

export default {
  namespaced: true,
  state,
  mutations,
}

