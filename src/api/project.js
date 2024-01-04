import request from '@/utils/request'

//新增页面保存草稿
export function projectAdd(data) {
  return request({
    url: '/project/add',
    method: 'post',
    data
  })
}
//编辑页面保存草稿
export function projectEdit(data) {
  return request({
    url: `/project/edit/${data.id}`,
    method: 'post',
    data
  })
}

//项目管理列表
export function projectList(params) {
  return request({
    url: '/project/list',
    method: 'get',
    params
  })
}

//项目管理详情
export function projectDetail(pv) {
  return request({
    url: `/project/info/${pv}`,
    method: 'get',
  })
}


//项目管理提交
export function projectSubmit(data) {
  return request({
    url: `/project/submit`,
    method: 'post',
    data
  })
}

//项目管理审核
export function projectAudit(data) {
  return request({
    url: `/project/audit`,
    method: 'post',
    data
  })
}

//项目管理删除
export function projectDelete(data) {
  return request({
    url: `/project/destroy/${data}`,
    method: 'post'
  })
}


//---------------

//实施委托列表
export function implementList(params) {
  return request({
    url: `/project/implement_list`,
    method: 'get',
    params
  })
}

//实施委托列表
export function agentList() {
  return request({
    url: `/project/agent_list`,
    method: 'get',
  })
}

//实施委托保存草稿
export function saveImplement(data) {
  return request({
    url: `/project/save_implement_data/${data.id}`,
    method: 'post',
    data
  })
}

//实施委托提交
export function submitImplement(id) {
  return request({
    url: `/project/submit_implement`,
    method: 'post',
    data: { id }
  })
}



//-------
//第三方列表
export function agentProjectList(params) {
  return request({
    url: `/project/agent_project_list`,
    method: 'get',
    params
  })
}
//保存招标信息
export function bidBaseSave(data) {
  return request({
    url: `/project/bid_base_save`,
    method: 'post',
    data
  })
}
//提交招标信息
export function bidBaseSubmit(id) {
  return request({
    url: `/project/submit_bid_base`,
    method: 'post',
    data: { id }
  })
}

//保存开评标信息
export function bidOpenSave(data) {
  return request({
    url: `/project/bid_open_save`,
    method: 'post',
    data
  })
}
//提交开评标信息
export function bidOpenSubmit(id) {
  return request({
    url: `/project/submit_bid_open`,
    method: 'post',
    data: { id }
  })
}

//保存中标信息
export function bidResultSave(data) {
  return request({
    url: `/project/bid_result_save`,
    method: 'post',
    data
  })
}
//提交中标信息
export function resultOpenSubmit(id) {
  return request({
    url: `/project/submit_bid_result`,
    method: 'post',
    data: { id }
  })
}



//-----
//弹窗
export function needDo() {
  return request({
    url: `/user/need_do`,
    method: 'get'
  })
}



//-----

//合同列表
export function contractList(params) {
  return request({
    url: `/project/contract_project_list`,
    method: 'get',
    params
  })
}

//保存合同
export function saveContract(data) {
  return request({
    url: `/contract/save_contract`,
    method: 'post',
    data
  })
}

//提交合同
export function submitContract(id) {
  return request({
    url: `/contract/submit_contract`,
    method: 'post',
    data: { id }
  })
}


//删除合同
export function deleteContract(id) {
  return request({
    url: `/contract/delete/${id}`,
    method: 'post',
  })
}


//------部门
//部门列表
export function departmentList(params) {
  return request({
    url: `/department/tree`,
    method: 'get',
    params
  })
}

//部门列表
export function departmentArr(params) {
  return request({
    url: `/department/index`,
    method: 'get',
    params
  })
}


//部门新增
export function departmentAdd(data) {
  return request({
    url: `/department/add`,
    method: 'post',
    data
  })
}

//部门修改
export function departmentEdit(data) {
  return request({
    url: `/department/edit/${data.id}`,
    method: 'post',
    data
  })
}


//部门删除
export function departmentDelete(id) {
  return request({
    url: `/department/delete/${id}`,
    method: 'post',
  })
}




//----用户

//角色列表
export function roleList(params) {
  return request({
    url: `/role/index`,
    method: 'get',
    params
  })
}

//添加角色
export function roleAdd(data) {
  return request({
    url: `/role/add`,
    method: 'post',
    data
  })
}

//编辑角色
export function roleEdit(data) {
  return request({
    url: `/role/edit/${data.id}`,
    method: 'post',
    data
  })
}


//用户权限
export function roluserPermissionseList() {
  return request({
    url: `/user/user_permissions`,
    method: 'get',
  })
}




//-----

//消息列表
export function noticeList(params) {
  return request({
    url: `/notice/index`,
    method: 'get',
    params
  })
}

//消息删除
export function noticeDelete(id) {
  return request({
    url: `/notice/delete/${id}`,
    method: 'post',
  })
}

//编辑消息
export function noticeEdit(data) {
  return request({
    url: `/notice/edit/${data.id}`,
    method: 'post',
    data
  })
}

//添加消息
export function noticeAdd(data) {
  return request({
    url: `/notice/add`,
    method: 'post',
    data
  })
}

//----

//代理列表
export function agentArr(params) {
  return request({
    url: `/agent/index`,
    method: 'get',
    params
  })
}


//-----------

//角色列表
export function userList(params) {
  return request({
    url: `/user/index`,
    method: 'get',
    params
  })
}


//编辑角色
export function userEdit(data) {
  return request({
    url: `/user/edit/${data.id}`,
    method: 'post',
    data
  })
}

//添加角色
export function userAdd(data) {
  return request({
    url: `/user/add`,
    method: 'post',
    data
  })
}


//角色删除
export function userDelete(id) {
  return request({
    url: `/user/delete/${id}`,
    method: 'post',
  })
}


//角色删除
export function resetPassword(data) {
  return request({
    url: `/user/reset_password`,
    method: 'post',
    data
  })
}

//分配角色
export function setUserRoles(data) {
  return request({
    url: `/user/set_user_roles/${data.id}`,
    method: 'post',
    data
  })
}


//----

//日志列表
export function logList(params) {
  return request({
    url: `/operate/log_list`,
    method: 'get',
    params
  })
}



//状态列表
export function projectStateList() {
  return request({
    url: `/project/project_status`,
    method: 'get',
  })
}



//--导出接口
export function projectExport(params) {
  return request({
    url: `/project/export`,
    method: 'get',
    params
  })
}


//--登录用户消息列表
export function userNoticeList(params) {
  return request({
    url: `/notice/user_notice_list`,
    method: 'get',
    params
  })
}

//--登录用户消息标记已读
export function userRead(data) {
  return request({
    url: `/notice/set_read`,
    method: 'post',
    data
  })
}


//--代理列表
export function agentsList(params) {
  return request({
    url: `/agent/index`,
    method: 'get',
    params
  })
}



//添加代理
export function agentAdd(data) {
  return request({
    url: `/agent/add`,
    method: 'post',
    data
  })
}

//编辑代理
export function agentEdit(data) {
  return request({
    url: `/agent/edit/${data.id}`,
    method: 'post',
    data
  })
}


//代理删除
export function agentDelete(id) {
  return request({
    url: `/agent/delete/${id}`,
    method: 'post',
  })
}


//代理删除
export function uploadSlice(data) {
  return request({
    url: `/user/upload_slice`,
    method: 'post',
    data
  })
}

//上传小文件
export function uploadFile(data) {
  return request({
    url: `/user/upload_file`,
    method: 'post',
    data
  })
}


//招标失败
export function bidFail(data) {
  return request({
    url: `/project/bid_fail`,
    method: 'post',
    data
  })
}

//招标失败详情
export function bidFailDetail(params) {
  return request({
    url: `/project/bid_fail_detail`,
    method: 'get',
    params
  })
}

