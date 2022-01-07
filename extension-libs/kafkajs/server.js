const sdk = require('./sdk');
const kafka = require('./kafka-client');

main()

async function main() {
    // await sendMsg();
    await consumeMsg();
    // await createTopic();
}

async function sendMsg () {
    let topic = 'kafkajs-test';
    let messages = [{id: 1, type: 2, value: '你好'}, {id: 2, type: 3, value: 'vjudge'}];
    await kafka.sendMsg(topic, messages);
    console.log('send message successfully.')
    return true;
}

async function consumeMsg () {
    let topic = 'kafkajs-test';
    let groupId = 'kafkajs-grp';
    await kafka.consumeMsg(topic, groupId)
}

async function createTopic () {
    let thisIp = sdk.getIPAddress();
    let result = await kafka.createTopic('serv-' + thisIp);
    console.log('result:', result);
    return result
}