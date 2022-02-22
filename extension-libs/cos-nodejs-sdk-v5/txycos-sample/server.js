const fs = require('fs');
const config = require('config');
const COS = require('cos-nodejs-sdk-v5');
const rp = require('request-promise');

const cns = require('./cos');

// const cosPath = 'tmp/222222.zip';
// const localFilePath = '/Users/vjudge/Downloads/apache-tomcat-9.0.52.zip';

const cosPath = 'tmp/222222.jpeg';
const localFilePath = '/Users/vjudge/Downloads/architecture-diagram.jpeg';

main ();

async function main () {
  // const cos = new COS({
  //   SecretId: config.get('SecretId'),
  //   SecretKey: config.get('SecretKey')
  // });
  const cos = cns.getTmpCos(); // 获取临时授权cos

  // const ret = await cns.putObject(cos, cosPath, localFilePath);
  // const ret = await cns.uploadFile(cos, cosPath, localFilePath);
  // const ret = await cns.sliceUploadFile(cos, cosPath, localFilePath);
  // const ret = await uploadByUrl(cos, cosPath);
  // const ret = await cns.getObjectUrl(cos, cosPath);
  const ret = await cns.getDownloadUrl(cos, cosPath);
  console.log('====== ret', ret);
  return ret;
}

async function uploadByUrl (cos, cosPath) {
  const uploadUrl = await cns.getUploadUrl(cos, cosPath);
  const req = rp({
    uri: uploadUrl,
    method: 'PUT'
  });
  const readStream = fs.createReadStream(localFilePath);
  readStream.pipe(req);
  return true;
}








