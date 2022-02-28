const config = require('config');
const _ = require('lodash');

// 分块下载
exports.downloadFile = function downloadFile (cos, cosPath, localResPath) {
    const start = performance.now();
    return new Promise((resolve, reject) => {
        cos.downloadFile(Object.assign({}, config.get('bucket'), {
            Key: cosPath,
            FilePath: localResPath,
            ChunkSize: 50 * 1024 * 1024, // 分块大小 10 M
            ParallelLimit: 5, // 分块并发数
            RetryTimes: 3, // 分块失败重试次数
            // onTaskReady: function (taskId) { },
            // onProgress: function (progressData) { },
        }), (err, data) => {
            const end = performance.now();
            console.log(`downloadFile: ${_.floor(end - start, 2)}ms`);
            if (err) {
                console.error('downloadFile Error: ', err, JSON.stringify({ cosPath, localResPath }));
                return reject(err);
            }
            return resolve(true);
        });
    });
}

// 下载
exports.getObject = function getObject (cos, cosPath, Output) {
    const start = performance.now();
    return new Promise((resolve, reject) => {
        const params = Object.assign({}, config.get('bucket'), {
            Key: cosPath,
            Output,
        });
        if (Output) {
            params.Output = Output;
        }
        cos.getObject(params, (err, data) => {
            const end = performance.now();
            console.log(`getObject: ${_.floor(end - start, 2)}ms`);
            if (err) {
                console.error('getObject Error: ', err, JSON.stringify({ cosPath, Output }));
                return reject(err);
            }
            return Output? resolve(true) : resolve(data.Body);
        });
    });
}

