export const addMixins = {
    data() {
        return {
            stepsList: [
                { title: '项目信息录入' },
                { title: '实施委托' },
                { title: '开评标' },
                { title: '完成' },
            ],

        }
    },
    computed: {
        stepList() {
            // console.log(this.$store.state.projectManagementAdd.formInfo.input12,'----||')
            return [
                // {
                //     title: "需求单位",
                //     isInput: this.$store.state.projectManagementAdd.formInfo.demand_department_id,
                //     isActive: !this.$store.state.projectManagementAdd.formInfo.demand_department_id && this.$store.state.projectManagementAdd.formInfo.project_leader,
                // },
                {
                    title: "项目负责人",
                    isInput: this.$store.state.projectManagementAdd.formInfo.project_leader,
                    isActive: !this.$store.state.projectManagementAdd.formInfo.project_leader && this.$store.state.projectManagementAdd.formInfo.contact_phone,
                },
                {
                    title: "联系电话",
                    isInput: this.$store.state.projectManagementAdd.formInfo.contact_phone,
                    isActive: !this.$store.state.projectManagementAdd.formInfo.contact_phone && this.$store.state.projectManagementAdd.formInfo.name,
                },
                {
                    title: "项目名称",
                    isInput: this.$store.state.projectManagementAdd.formInfo.name,
                    isActive: !this.$store.state.projectManagementAdd.formInfo.name && this.$store.state.projectManagementAdd.formInfo.type,
                },
                {
                    title: "项目类型",
                    isInput: this.$store.state.projectManagementAdd.formInfo.type,
                    isActive: !this.$store.state.projectManagementAdd.formInfo.type && this.$store.state.projectManagementAdd.formInfo.audit_amount,
                },
                // {
                //     title: "项目编号",
                //     isInput: this.$store.state.projectManagementAdd.formInfo.no,
                //     isActive: !this.$store.state.projectManagementAdd.formInfo.no && this.$store.state.projectManagementAdd.formInfo.audit_amount,
                // },
                {
                    title: "审计金额",
                    isInput: this.$store.state.projectManagementAdd.formInfo.audit_amount,
                    isActive: !this.$store.state.projectManagementAdd.formInfo.audit_amount && this.$store.state.projectManagementAdd.formInfo.budget,
                },
                {
                    title: "预算金额",
                    isInput: this.$store.state.projectManagementAdd.formInfo.budget,
                    isActive: !this.$store.state.projectManagementAdd.formInfo.budget && this.$store.state.projectManagementAdd.formInfo.procurement_method,
                },
                {
                    title: "采购方式",
                    isInput: this.$store.state.projectManagementAdd.formInfo.procurement_method,
                    isActive: !this.$store.state.projectManagementAdd.formInfo.procurement_method && this.$store.state.projectManagementAdd.formInfo.public_date,
                },
                {
                    title: "采购意向公开日期",
                    isInput: this.$store.state.projectManagementAdd.formInfo.public_date,
                    isActive: !this.$store.state.projectManagementAdd.formInfo.public_date && this.$store.state.projectManagementAdd.formInfo.notice_link,
                },
                {
                    title: "采购意向公告链接",
                    isInput: this.$store.state.projectManagementAdd.formInfo.notice_link,
                    isActive: !this.$store.state.projectManagementAdd.formInfo.notice_link && this.$store.state.projectManagementAdd.formInfo.input12,
                },
                {
                    title: "是否面向中小微企",
                    isInput: this.$store.state.projectManagementAdd.formInfo.input12,
                    // isActive: !this.$store.state.projectManagementAdd.formInfo.input12 && (this.$store.state.projectManagementAdd.project_attachments[0].files.length > 0),
                    isActive: !this.$store.state.projectManagementAdd.formInfo.input12 && (this.$store.state.projectManagementAdd.ImplementationCommissionForm.input),
                   
                },
                {
                    title: "项目编号",
                    isInput: this.$store.state.projectManagementAdd.ImplementationCommissionForm.no,
                    isActive: !this.$store.state.projectManagementAdd.ImplementationCommissionForm.no && (this.$store.state.projectManagementAdd.ImplementationCommissionForm.choose_no ),
                },
                {
                    title: "抽取编号",
                    isInput: this.$store.state.projectManagementAdd.ImplementationCommissionForm.choose_no,
                    isActive: !this.$store.state.projectManagementAdd.ImplementationCommissionForm.choose_no && (this.$store.state.projectManagementAdd.ImplementationCommissionForm.choose_time),
                },
                {
                    title: "抽取时间",
                    isInput: this.$store.state.projectManagementAdd.ImplementationCommissionForm.choose_time,
                    isActive: !this.$store.state.projectManagementAdd.ImplementationCommissionForm.choose_time && (this.$store.state.projectManagementAdd.ImplementationCommissionForm.files.length > 0),
                },
                {
                    title: "抽取代理机构回执",
                    isInput: this.$store.state.projectManagementAdd.ImplementationCommissionForm.agent_receipt[0].files.length>0,
                    isActive: this.$store.state.projectManagementAdd.ImplementationCommissionForm.agent_receipt[0].files.length==0 && this.$store.state.projectManagementAdd.ImplementationCommissionForm.agent_id,
                },

                {
                    title: "采购代理名称",
                    isInput: this.$store.state.projectManagementAdd.ImplementationCommissionForm.agent_id,
                    isActive: !this.$store.state.projectManagementAdd.ImplementationCommissionForm.agent_id && (this.$store.state.projectManagementAdd.ImplementationCommissionForm.files.length > 0),
                },
                {
                    title: "抽取采购代理机构登记",
                    isInput: this.$store.state.projectManagementAdd.ImplementationCommissionForm.files.length>0,
                    isActive: this.$store.state.projectManagementAdd.ImplementationCommissionForm.files.length==0 && (this.$store.state.projectManagementAdd.project_attachments[0].files.length > 0),
                },
                {
                    title: "采购意向",
                    isInput: this.$store.state.projectManagementAdd.project_attachments[0].files.length > 0,
                    isActive: (this.$store.state.projectManagementAdd.project_attachments[0].files.length == 0) && ( this.$store.state.projectManagementAdd.project_attachments[1].files.length > 0),
                },
                {
                    title: "纪保预算审核报告书",
                    isInput: this.$store.state.projectManagementAdd.project_attachments[1].files.length > 0,
                    isActive: (this.$store.state.projectManagementAdd.project_attachments[1].files.length == 0) && ( this.$store.state.projectManagementAdd.project_attachments[2].files.length > 0),
                },
                {
                    title: "采购需求",
                    isInput: this.$store.state.projectManagementAdd.project_attachments[2].files.length > 0,
                    isActive: ( this.$store.state.projectManagementAdd.project_attachments[2].files.length == 0) && ( this.$store.state.projectManagementAdd.project_attachments[3].files.length > 0),
                },
                {
                    title: "实施计划",
                    isInput:  this.$store.state.projectManagementAdd.project_attachments[3].files.length > 0,
                    isActive: (this.$store.state.projectManagementAdd.project_attachments[3].files.length == 0) && ( this.$store.state.projectManagementAdd.project_attachments[4].files.length > 0),
                },
                {
                    title: "审查意见书",
                    isInput:  this.$store.state.projectManagementAdd.project_attachments[4].files.length > 0,
                    isActive: (this.$store.state.projectManagementAdd.project_attachments[4].files.length == 0) && ( this.$store.state.projectManagementAdd.project_attachments[5].files.length > 0),
                },
                {
                    title: "大队党委会",
                    isInput: this.$store.state.projectManagementAdd.project_attachments[5].files.length > 0,
                    isActive: ( this.$store.state.projectManagementAdd.project_attachments[5].files.length == 0) && ( this.$store.state.projectManagementAdd.project_attachments[6].files.length > 0),
                },
                {
                    title: "支队党委会",
                    isInput: this.$store.state.projectManagementAdd.project_attachments[6].files.length > 0,
                    isActive: false
                },




                // {
                //     title: "纪保预算审核报告书",
                //     isInput: this.$store.state.projectManagementAdd.fileForm.project_leader || this.$store.state.projectManagementAdd.fileForm.fileList2.length > 0,
                //     isActive: (!this.$store.state.projectManagementAdd.fileForm.project_leader && this.$store.state.projectManagementAdd.fileForm.fileList2.length == 0) && (this.$store.state.projectManagementAdd.fileForm.contact_phone || this.$store.state.projectManagementAdd.fileForm.fileList3.length > 0),
                // },
                // {
                //     title: "采购需求",
                //     isInput: this.$store.state.projectManagementAdd.fileForm.contact_phone || this.$store.state.projectManagementAdd.fileForm.fileList3.length > 0,
                //     isActive: (!this.$store.state.projectManagementAdd.fileForm.contact_phone && this.$store.state.projectManagementAdd.fileForm.fileList3.length == 0) && (this.$store.state.projectManagementAdd.fileForm.name || this.$store.state.projectManagementAdd.fileForm.fileList4.length > 0),
                // },

                // {
                //     title: "实施计划",
                //     isInput: this.$store.state.projectManagementAdd.fileForm.name || this.$store.state.projectManagementAdd.fileForm.fileList4.length > 0,
                //     isActive: (!this.$store.state.projectManagementAdd.fileForm.name && this.$store.state.projectManagementAdd.fileForm.fileList4.length == 0) && (this.$store.state.projectManagementAdd.fileForm.type || this.$store.state.projectManagementAdd.fileForm.fileList5.length > 0),
                // },
                // {
                //     title: "审查意见书",
                //     isInput: this.$store.state.projectManagementAdd.fileForm.type || this.$store.state.projectManagementAdd.fileForm.fileList5.length > 0,
                //     isActive: (!this.$store.state.projectManagementAdd.fileForm.type && this.$store.state.projectManagementAdd.fileForm.fileList5.length == 0) && (this.$store.state.projectManagementAdd.fileForm.no || this.$store.state.projectManagementAdd.fileForm.fileList6.length > 0),
                // },
                // {
                //     title: "大队党委会",
                //     isInput: this.$store.state.projectManagementAdd.fileForm.no || this.$store.state.projectManagementAdd.fileForm.fileList6.length > 0,
                //     isActive: (!this.$store.state.projectManagementAdd.fileForm.no && this.$store.state.projectManagementAdd.fileForm.fileList6.length == 0) && (this.$store.state.projectManagementAdd.fileForm.audit_amount || this.$store.state.projectManagementAdd.fileForm.fileList7.length > 0),
                // },
                // {
                //     title: "支队党委会",
                //     isInput: this.$store.state.projectManagementAdd.fileForm.audit_amount || this.$store.state.projectManagementAdd.fileForm.fileList7.length > 0,
                //     isActive: false,
                // }
            ]
        }
    },
    methods: {
        resetFields(){
            
            this.$store.commit('projectManagementAdd/UPDATE_FORMINFO',{
            project_leader: "",
            contact_phone: "",
            name: "",
            type: "",
            no: "",
            audit_amount: "",
            budget: "",
            procurement_method: '',
            public_date: "",
            notice_link: "",
            input12: "true",
            small_company:''})
            this.$store.commit('projectManagementAdd/UPDATE_PROJECT_ATTACHMENTS',[
                {type:'purchase_intention',title:'采购意向',description:'',files:[]},
                {type:'budget_audit_report',title:'纪保预算审核报告书',description:'',files:[]},
                {type:'purchase_demand',title:'采购需求',description:'',files:[]},
                {type:'act_plan',title:'实施计划',description:'',files:[]},
                {type:'check_opinion',title:'审查意见书',description:'',files:[]},
                {type:'main_party_committee',title:'大队党委会',description:'',files:[]},
                {type:'detachment_party_committee',title:'支队党委会',description:'',files:[]},
              ])
              this.$store.commit('projectManagementAdd/UPDATE_RADIOLABELLIST',[
                { label: '是:整体专门面向中小企业采购 (即100%)', child: [], checked: false, },
                {
                  label: '否: 预留预算总额的货物类、服务类项目不低于30%，工程类项目不低于40%，由需求单位根据实际情况填写专门面向中小企业采购。', child: [
                    { label1: '采购项目整体或者设置采购包专门面向中小企业采购', checked: false, },
                    { label1: '供应商以联合体形式参加采购活动，联合体中中小企业承担预算总额的', checked: false, label2: '%部分', num: '' },
                    { label1: '获得采购合同的供应商将采购项目中的', checked: false, label2: '%分包给一家或者多家中小企业', num: '' },
            
                  ], checked: false,
                },
                { label: '否:项目不适用专门面向中小企业，根据《政府采购促进中小企业发展管理办法》财库[2020] 46 号的规定，符合下列情形之一的，可不专门面向中小企业预留采购份额。', child: [], checked: false, },
              ])

              this.$store.commit(
                "projectManagementAdd/update_ImplementationCommissionForm", {
                type: 'file',
                data: []
            });
            this.$store.commit(
                "projectManagementAdd/update_ImplementationCommissionForm", {
                type: 'chooseFile',
                data: [{ type: 'agent_receipt', title: '抽取代理机构回执', description: '', files: [], is_required: 1 }]
            });
            this.$store.commit("projectManagementAdd/update_ImplementationCommissionForm",{type: 'form', data: { choose_no: '',choose_time: '', no: '', agent_id: '',}});
        },
        async auditFnc(){
            this.$refs.checkDialog.openDialog(true)
          },
          async auditFncEnd(){
            this.$refs.checkDialogEnd.openDialog(true)
          },
          async auditEmit(e){
            // console.log(e)
            let res = await projectAudit({id:this.$store.state.projectManagementAdd.formInfo.id,...e});
            // console.log(res)
            if(res.code==200){
              this.$message.success(res.msg);
              this.$router.go(-1)
              return
            }
            this.$message.error(res.msg);
          },
          async auditEmitEnd(e){
            // console.log(e)
            let res = await projectAudit({id:this.$store.state.projectManagementAdd.formInfo.id,...e});
            // console.log(res)
            if(res.code==200){
              this.$message.success(res.msg);
              this.$router.go(-1)
              return
            }
            this.$message.error(res.msg);
          },
      
    },

}