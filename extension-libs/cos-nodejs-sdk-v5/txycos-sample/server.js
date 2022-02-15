const fs = require('fs');
const uuid = require('uuid');
const COS = require('cos-nodejs-sdk-v5');

const SecretId = 'AKIDEH5cssb4GBpDLCn8CzVkjQq0uXtynLcb';
const SecretKey = 'kIabEafV4NPAevwg9LGuHNDm45qKXT8W';
const APPID = '1253686866';
const Bucket = 'eeo-' + APPID;
const Region = 'ap-shanghai';

const cos = new COS({ SecretId, SecretKey });

const filePath = '/Users/vjudge/Downloads/apache-tomcat-9.0.52.zip';

const time = console.time('上传花费时间: ');
cos.putObject(Object.assign({ Bucket, Region }, {
  Key: uuid.v4(),
  StorageClass: 'STANDARD',
  Body: fs.createReadStream(filePath),
  ContentLength: fs.statSync(filePath).size,
  // onProgress: function(progressData) {
  //   console.log(JSON.stringify(progressData));
  // }
}), function(err, data) {
  console.timeEnd('上传花费时间: ');
    console.log(err || data);
});










