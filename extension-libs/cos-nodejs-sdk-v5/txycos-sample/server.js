const fs = require('fs');
const config = require('config');
const COS = require('cos-nodejs-sdk-v5');

const cns = require('./cos');

const cosPath = 'tmp/222222.zip';
const localFilePath = '/Users/vjudge/Downloads/apache-tomcat-9.0.52.zip';

main ();

async function main () {
  // const cos = new COS({
  //   SecretId: config.get('SecretId'),
  //   SecretKey: config.get('SecretKey')
  // });
  const cos = cns.getTmpCos(); // 获取临时授权cos

  // const ret = await cns.putObject(cos, cosPath, localFilePath);
  // const ret = await cns.uploadFile(cos, cosPath, localFilePath);
  const ret = await cns.sliceUploadFile(cos, cosPath, localFilePath);
  console.log('====== ret', ret);
  return ret;
}








