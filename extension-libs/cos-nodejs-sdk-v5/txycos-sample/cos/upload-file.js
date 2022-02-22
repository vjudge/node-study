const config = require('config');
const _ = require('lodash');

module.exports = function uploadFile (cos, cosPath, localFilePath) {
    const start = performance.now();
    return new Promise((resolve, reject) => {
        cos.uploadFile(Object.assign({}, config.get('bucket'), {
            Key: cosPath,
            FilePath: localFilePath,
            // onTaskReady: function(taskId) {},
            // onHashProgress: function (progressData) {},
            onProgress: function (progressData) {
                console.log(JSON.stringify(progressData));
            }
        }), function(err, data) {
            const end = performance.now();
            console.log(`uploadFile: ${_.floor(end - start, 2)}ms`);
            if (err) {
                console.error('uploadFile err: ', err);
                return reject(err);
            }
            console.log('uploadFile.data:', data);
            return resolve(data);
        });
    });
}