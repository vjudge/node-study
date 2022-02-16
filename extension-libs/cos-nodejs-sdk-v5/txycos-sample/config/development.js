module.exports = {
    SecretId: '',
    SecretKey: '',
    APPID: '',
    Expires: 900,
    bucket: {
        shortBucket: '',
        Bucket: '',
        Region: '',
        StorageClass: 'STANDARD',
        SliceSize: 10 * 1024 * 1024, // 大于 10M 进行分块上传
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
            // 'name/cos:uploadFile',
        ]
    }
}