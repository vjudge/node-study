const config = require('config');
const _ = require('lodash');
const STS = require('qcloud-cos-sts');

module.exports = function getSts () {
    const start = performance.now();
    const policy = {
        version: '2.0',
        statement: [{
            action: config.get('stsOpts.allowActions'),
            effect: 'allow',
            principal: {'qcs': ['*']},
            'resource': [
                'qcs::cos:' + config.get('bucket.Region') + ':uid/' + config.get('APPID') + ':prefix//' + config.get('APPID') + '/' + config.get('bucket.shortBucket') + '/' + config.get('stsOpts.allowPrefix'),
            ],
        }],
    };
    console.log('policy = ', JSON.stringify(policy));
    return new Promise((resolve, reject) => {
        STS.getCredential({
            secretId: config.get('SecretId'),
            secretKey: config.get('SecretKey'),
            proxy: '',
            durationSeconds: 1800, // 密钥有效期
            policy: policy
        }, function (err, data) {
            const end = performance.now();
            console.log(`获取临时密钥耗时: ${_.floor(end - start, 2)}ms`);
            if (err) {
                console.error(`getSts: `, err);
                return resolve(null);
            }
            return resolve(data);
        });
    });
}