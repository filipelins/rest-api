const SqlUtils = require('../utils/SqlUtils');

class TrackableRepository extends SqlUtils {

    constructor() {
        super();
        this.table = 'trackablesViro';
    }

    get(callBackSucces, callBackFail) {
        this.GET(this.table, response => { callBackSucces(response) }, err => { callBackFail(err)});
    }

    getBy(id,callBackSucces, callBackFail) {
        this.GETBY(this.table, id, response => { callBackSucces(response) }, err => { callBackFail(err)});
    }

    createTrackable(data,callBackSucces,callBackFail) {
        this.POST(this.table, data, (response) => { callBackSucces(response) }, err => { callBackFail(err)});
    }

    updateTrackable(data,callBackSucces,callBackFail) {
        this.PUT(this.table, data, (response) => { callBackSucces(response) }, err => { callBackFail(err)});
    }

    delete(id,callBackSucces, callBackFail) {
        this.DELETE(this.table, id, (data) => { callBackSucces(data) }, err => { callBackFail(err)});
    }
}

module.exports =  TrackableRepository;