module.exports = {
    getSts:  require('./get-sts'),
    getTmpCos: require('./tmp-cos'),
    putObject: require('./put-object'),
    ...require('./get-object-url'),
    ...require('./multi-part-upload'),
    uploadFile: require('./upload-file'),
    sliceUploadFile: require('./slice-upload-file'),
};