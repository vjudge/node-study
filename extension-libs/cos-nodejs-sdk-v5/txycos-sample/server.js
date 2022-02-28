const fs = require('fs');
const config = require('config');
const COS = require('cos-nodejs-sdk-v5');
const rp = require('request-promise');

const cns = require('./cos');

// // const cosPath = 'tmp/222222.zip';
// const cosPath = 'tmp/1645760371218/__delimiter__/co-res/a7e7275e3fe59f212951a9321819c7615ae454deb4385bb2167abb842e432938_44230.jpeg';
// const localFilePath = '/Users/vjudge/Downloads/architecture-diagram.jpeg';
// const localResPath = '/Users/vjudge/Downloads/get-object.jpeg';

// const cosPath = 'co-res/2bfb1c48e49c98bfff5048bdd38803a967d8d5afe2e5bc29cff4a032b0a55ad8_332696706.mp4';
// const localFilePath = '/Users/vjudge/Downloads/eeo-05.mp4';
// const localResPath = '/Users/vjudge/Downloads/big-file.mp4';

const cosPath = 'tmp/1645779206055/__delimiter__/co-res/481bf62cedf98c7c7a7727f5dc07f5aa2d063a112355c58ba68f6482b3a07a22_3341889.pdf';
const localFilePath = '/Users/vjudge/Downloads/翼鸥教育-补充医疗操作手册.pdf';
// const localResPath = '/Users/vjudge/Downloads/eeo-manual.pdf';

main ();

async function main () {
  const cos = new COS({
    SecretId: config.get('SecretId'),
    SecretKey: config.get('SecretKey')
  });
  // const cos = cns.getTmpCos(); // 获取临时授权cos

  const ret = await cns.putObject(cos, cosPath, localFilePath);
  // const ret = await cns.uploadFile(cos, cosPath, localFilePath);
  // const ret = await cns.sliceUploadFile(cos, cosPath, localFilePath);
  // const ret = await multiPartUpload(cos, cosPath, localFilePath);
  // const ret = await uploadByUrl(cos, cosPath);
  // const ret = await cns.getObjectUrl(cos, cosPath);
  // const ret = await cns.getDownloadUrl(cos, cosPath);
  // const ret = await cns.getObject(cos, cosPath, localResPath);
  // const ret = await cns.downloadFile(cos, cosPath, localResPath);
  // const movePath = 'tmp/3333.pdf'
  // const ret = await cns.moveSliceObject(cos, movePath, cosPath);
  console.log('====== ret', ret);
  return ret;
}

async function multiPartUpload (cos, cosPath, localFilePath) {
  const initRet = await cns.multipartInit(cos, cosPath);
  console.log('multiPartUpload.initRet', initRet);

  const uploadRet = await cns.multipartUpload(cos, cosPath, initRet.UploadId, localFilePath);
  console.log('multiPartUpload.uploadRet', uploadRet);

  const parts = [uploadRet];
  const ret = await cns.multipartComplete(cos, cosPath, initRet.UploadId, parts);
  console.log('multiPartUpload.ret', ret);
  return true;
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








