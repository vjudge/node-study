const fs = require('fs');
const config = require('config');
const _ = require("lodash");

exports.multipartInit = function multipartInit (cos, cosPath) {
    const start = performance.now();
    return new Promise((resolve, reject) => {
        cos.multipartInit(Object.assign({}, config.get('bucket'), {
            Key: cosPath,
        }), (err, data) => {
            const end = performance.now();
            console.log(`multipartInit: ${_.floor(end - start, 2)}ms`);
            if (err) {
                console.error('multipartInit.Error: ', err);
                return reject(err);
            }
            return resolve(data);
        });
    });
}

exports.multipartUpload = function (cos, cosPath, UploadId, localFilePath, PartNumber = '1') {
    const start = performance.now();
    return new Promise((resolve, reject) => {
        cos.multipartUpload(Object.assign({}, config.get('bucket'), {
            Key: cosPath,
            UploadId,
            PartNumber,
            Body: fs.createReadStream(localFilePath),
            ContentLength: fs.statSync(localFilePath).size,
        }), (err, data) => {
            const end = performance.now();
            console.log(`multipartUpload: ${_.floor(end - start, 2)}ms`);
            if (err) {
                console.log('multipartUpload.Error: ', err);
                return reject(err);
            }
            return resolve({ PartNumber, ETag: data.ETag });
        });
    });
}

exports.multipartComplete = function (cos, cosPath, UploadId, Parts) {
    const start = performance.now();
    return new Promise((resolve, reject) => {
        cos.multipartComplete(Object.assign({}, config.get('bucket'), {
            Key: cosPath,
            UploadId,
            Parts,
        }), (err, data) => {
            const end = performance.now();
            console.log(`multipartComplete: ${_.floor(end - start, 2)}ms`);
            if (err) {
                console.error('multipartComplete.Error: ', err);
                return reject(err);
            }
            return resolve(data);
        });
    });
}