const _ = require('lodash');
const COS = require('cos-nodejs-sdk-v5');

const getSts = require('./get-sts');

module.exports = function getTmpCos () {
    const start = performance.now();
    const cos = new COS({
        getAuthorization: async function (options, callback) {
            const ret = await getSts();
            // console.log('getCos.ret', ret);
            const params = {
                TmpSecretId: ret.credentials.tmpSecretId,
                TmpSecretKey: ret.credentials.tmpSecretKey,
                XCosSecurityToken: ret.credentials.sessionToken,
                StartTime: ret.startTime, // 时间戳，单位秒，如：1580000000
                ExpiredTime: ret.expiredTime, // 时间戳，单位秒，如：1580000900
            }
            // console.log('getCos.params', params);
            callback(params);
        }
    });
    return cos;
}
