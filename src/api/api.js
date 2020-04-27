var host = 'http://47.94.146.245:11010/'
const href = window.location.href
export var Api = {
    activityInfo: `${host}activity/get/`, // 获取活动信息
    getUserId: `${host}userinfo/code/get/`, // 通过code获取userid
    getUserInfo: `${host}userinfo/get/`, // 获取用户信息
    uploadFile: `${host}upload/file`, // 附件上传
    activitySave: `${host}activity/save`, // 创建活动
    getActivityList: `${host}activity/list/`, // 获取活动列表
    delete: `${host}activity/delete/`, // 删除活动
    watchList: `${host}watch/list`, // 获取分享列表
    updateActivity: `${host}activity/update` // 编辑殴打
}
