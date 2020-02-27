var host = 'http://47.94.146.245:11010/'
const href = window.location.href
export var Api = {
    getUserId: `${host}userinfo/code/get/`, // 通过code获取userid
    getUserInfo: `${host}userinfo/get/`, // 获取用户信息
    uploadFile: `${host}upload/file`, // 附件上传
    activitySave: `${host}activity/save`, // 创建活动
    getActivityList: `${host}activity/list/` // 获取活动列表
}
