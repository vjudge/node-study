const _ = require('lodash');
const config = require('config');

// 移动文件(支持分片): 先复制, 再删除
exports.moveSliceObject = function moveSliceObject (cos, cosPath, copyPath) {
    const start = performance.now();
    return sliceCopyFile.then((data) => {
        cos.deleteObject(Object.assign( {
            Key: copyPath,
        }, config.get('bucket')), function(err, data) {
            const end = performance.now();
            console.log(`moveSliceObject: ${_.floor(end - start, 2)}ms`);
            if (err) {
                console.error('moveSliceObject Error: ', err, JSON.stringify({ cosPath, copyPath }));
                return false;
            }
            return true;
        });
    })
}

// 移动文件: 先复制, 再删除
exports.moveObject = function moveObject (cos, cosPath, copyPath) {
    const start = performance.now();
    return putObjectCopy.then((data) => {
        cos.deleteObject(Object.assign( {
            Key: copyPath,
        }, config.get('bucket')), function(err, data) {
            const end = performance.now();
            console.log(`moveObject: ${_.floor(end - start, 2)}ms`);
            if (err) {
                console.error('moveObject Error: ', err, JSON.stringify({ cosPath, copyPath }));
                return false;
            }
            return true;
        });
    })
}

// 分块复制
function sliceCopyFile (cos, cosPath, copyPath) {
    const start = performance.now();
    const CopySource = `${config.get('bucket.Bucket')}.cos.${config.get('bucket.Region')}.myqcloud.com/${copyPath}`;
    return new Promise((resolve, reject) => {
        cos.sliceCopyFile(Object.assign({
            Key: cosPath,
            CopySource,
            ChunkSize: 5 * 1024 * 1024, // 分块大小 10 M
            SliceSize: 10 * 1024 * 1024, // 超过500M 进行分块
            // onProgress: (progressData) => { }
            }, config.get('bucket')), (err, data) => {
            const end = performance.now();
            console.log(`sliceCopyFile: ${_.floor(end - start, 2)}ms`);
            if (err) {
                console.error('sliceCopyFile Error: ', err, JSON.stringify({ cosPath, copyPath }));
                return reject(err);
            }
            return resolve(data);
        });
    });
}

// 复制对象
function putObjectCopy (cos, cosPath, copyPath) {
    const start = performance.now();
    const CopySource = `${config.get('bucket.Bucket')}.cos.${config.get('bucket.Region')}.myqcloud.com/${copyPath}`;
    return new Promise((resolve, reject) => {
        cos.putObjectCopy(Object.assign( {
            Key: cosPath,
            CopySource,
        }, config.get('bucket')), (err, data) => {
            const end = performance.now();
            console.log(`putObjectCopy: ${_.floor(end - start, 2)}ms`);
            if (err) {
                console.error('putObjectCopy Error: ', err, JSON.stringify({ cosPath, copyPath }));
                return reject(err);
            }
            return resolve(data);
        });
    });
}