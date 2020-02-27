import service from '../utils/request';

export default {
    post (url, data) {
        return service({
            method: 'post',
            url,
            data
        })
    },
    get (url, data) {
        return service({
            method: 'get',
            url,
            data
        })
    },
    put (url, data) {
        return service({
            method: 'put',
            url,
            data
        })
    },
    update (url, data) {
        return service({
            method: 'update',
            url,
            data
        })
    },
    delete (url, data) {
        return service({
            method: 'delete',
            url,
            data
        })
    }
}
