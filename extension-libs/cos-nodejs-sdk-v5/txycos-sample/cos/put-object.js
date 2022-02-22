const fs = require('fs');
const config = require('config');
const _ = require('lodash');

module.exports = function putObject (cos, cosPath, localFilePath) {
    const start = performance.now();
    return new Promise((resolve, reject) => {
        cos.putObject(Object.assign({}, config.get('bucket'), {
            Key: cosPath,
            Body: fs.createReadStream(localFilePath),
            ContentLength: fs.statSync(localFilePath).size,
            onProgress: function(progressData) {
                console.log(JSON.stringify(progressData));
            }
        }), (err, data) => {
            const end = performance.now();
            console.log(`putObject: ${_.floor(end - start, 2)}ms`);
            if (err) {
                console.error(`[${localFilePath}] Error`, err);
                return reject(null);
            }
            return resolve(data);
        });
    });
}






