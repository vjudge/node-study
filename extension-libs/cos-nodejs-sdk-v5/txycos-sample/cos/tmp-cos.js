import COS from 'cos-nodejs-sdk-v5';
import rp from 'request-promise';

export function getCos () {
    const cos = new COS({
        getAuthorization: async function (options, callback) {
            const ret: any = await rp({
                uri: 'http://127.0.0.1:8100/res/sts',
                method: 'GET',
                headers: { appkey }
            });
            // console.log('ret', ret.data);
            const stsParams = {
                TmpSecretId: ret.data.data.credentials.tmpSecretId,
                TmpSecretKey: ret.data.data.credentials.tmpSecretKey,
                XCosSecurityToken: ret.data.data.credentials.sessionToken,
                StartTime: ret.data.data.startTime, // 时间戳，单位秒，如：1580000000
                ExpiredTime: ret.data.data.expiredTime, // 时间戳，单位秒，如：1580000900
            }
            // console.log('stsParams', stsParams);
            callback(stsParams);
        }
    });
    return cos;
}

function