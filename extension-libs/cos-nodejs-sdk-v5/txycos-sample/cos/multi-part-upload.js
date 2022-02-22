const fs = require('fs');
const config = require('config');

exports.multipartInit = function multipartInit (cos, cosPath) {
    return new Promise((resolve, reject) => {
        cos.multipartInit(Object.assign({}, config.get('bucket'), {
            Key: cosPath,
        }), (err, data) => {
            if (err) {
                console.error('multipartInit.Error: ', err);
                return reject(err);
            }
            return resolve(data);
        });
    });
}

exports.multipartUpload = function (cos, cosPath, UploadId, localFilePath, PartNumber = '1') {
    return new Promise((resolve, reject) => {
        cos.multipartUpload(Object.assign({}, config.get('bucket'), {
            Key: cosPath,
            UploadId,
            PartNumber,
            Body: fs.createReadStream(localFilePath),
            ContentLength: fs.statSync(localFilePath).size,
        }), (err, data) => {
            if (err) {
                console.log('multipartUpload.Error: ', err);
                return reject(err);
            }
            return resolve({ PartNumber, ETag: data.ETag });
        });
    });
}

exports.multipartComplete = function (cos, cosPath, UploadId, Parts) {
    return new Promise((resolve, reject) => {
        cos.multipartComplete(Object.assign({}, config.get('bucket'), {
            Key: cosPath,
            UploadId,
            Parts,
        }), (err, data) => {
            if (err) {
                console.error('multipartComplete.Error: ', err);
                return reject(err);
            }
            return resolve(data);
        });
    });
}