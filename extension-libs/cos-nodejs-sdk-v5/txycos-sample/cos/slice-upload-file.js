const config = require('config');
const _ = require('lodash');

module.exports = function sliceUploadFile (cos, cosPath, localFilePath) {
    const start = performance.now();
    return new Promise((resolve, reject) => {
        cos.sliceUploadFile(Object.assign({}, config.get('bucket'), {
            Key: cosPath,
            FilePath: localFilePath,
            onTaskReady: function(taskId) {
                console.log(taskId);
            },
            onHashProgress: function (progressData) {
                console.log(JSON.stringify(progressData));
            },
            onProgress: function (progressData) {
                console.log(JSON.stringify(progressData));
            }
        }), function(err, data) {
            const end = performance.now();
            console.log(`资源上传时长: ${_.floor(end - start, 2)}ms`);
            if (err) {
                console.error('sliceUploadFile err: ', err);
                return reject(err);
            }
            // console.log('sliceUploadFile.data:', data);
            return resolve(data);
        });
    });
}