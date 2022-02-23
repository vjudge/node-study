module.exports = {
    SecretId: 'AKIDEH5cssb4GBpDLCn8CzVkjQq0uXtynLcb',
    SecretKey: 'kIabEafV4NPAevwg9LGuHNDm45qKXT8W',
    APPID: '1253686866',
    bucket: {
        shortBucket: 'co-engine',
        Bucket: 'co-engine-1253686866',
        Region: 'ap-beijing',
        StorageClass: 'STANDARD',
        Expires: 900,
        SliceSize: 1 * 1024 * 1024, // 大于 1M 进行分块上传
        AsyncLimit: 3,
    },
    stsOpts: { // direct upload
        allowPrefix: 'tmp/*',
        allowActions: [
            // 简单上传
            'name/cos:PutObject',
            // 'name/cos:PostObject',
            // 分片上传
            'name/cos:multipartInit',
            'name/cos:InitiateMultipartUpload',
            'name/cos:ListMultipartUploads',
            'name/cos:ListParts',
            'name/cos:UploadPart',
            'name/cos:CompleteMultipartUpload',
            'name/cos:AbortMultipartUpload',
            // 高级上传
            'name/cos:uploadFile',
            // 其他
            'name/cos:getObjectUrl',
        ]
    }
}