module.exports = {
    getSts:  require('./get-sts'),
    getTmpCos: require('./tmp-cos'),
    putObject: require('./put-object'),
    ...require('./get-object-url'),
    uploadFile: require('./upload-file'),
    sliceUploadFile: require('./slice-upload-file'),
};