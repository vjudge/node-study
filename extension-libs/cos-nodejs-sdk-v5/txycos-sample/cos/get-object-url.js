const config = require('config');
const _ = require('lodash');

exports.getDownloadUrl = function (cos, cosPath) {
    const start = performance.now();
    return getObjectUrl(cos, cosPath).then((data) => {
        const ret = data + (data.indexOf('?') > -1 ? '&' : '?') + 'response-content-disposition=attachment';
        const end = performance.now();
        console.log(`获取资源时长: ${_.floor(end - start, 2)}ms`);
        return ret;
    }).catch((err) => {
        console.error('getDownloadUrl.Error:', err);
        return ;
    });
}

exports.getUploadUrl = function (cos, cosPath) {
    const start = performance.now();
    return getObjectUrl(cos, cosPath, 'PUT').then((data) => {
        const end = performance.now();
        console.log(`获取资源时长: ${_.floor(end - start, 2)}ms`);
        return data;
    }).catch((err) => {
        console.error('getUploadUrl.Error:', err);
        return ;
    });
}

function getObjectUrl (cos, cosPath, Method = 'GET') {
    const start = performance.now();
    return new Promise((resolve, reject) => {
        cos.getObjectUrl(Object.assign({}, config.get('bucket'), {
            Key: cosPath,
            Method,
            Sign: true,
            // Query: {}, /* 传入的请求头部需包含在实际请求中，能够防止用户篡改签入此处的HTTP请求头部 */
            // Headers: {
            //   host: 'xxx' /* 指定host访问，非指定的host访问会报错403 */
            // },
        }), (err, data) => {
            const end = performance.now();
            console.log(`获取资源时长: ${_.floor(end - start, 2)}ms`);
            if (err) {
                return reject(err);
            }
            return resolve(data.Url);
        });
    });
}
exports.getObjectUrl = getObjectUrl;