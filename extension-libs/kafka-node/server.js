const sdk = require('./sdk')
const kafkaClient = require('./kafka-client')
const Kafka = require("kafka-node");

main();

async function main() {
    // await produceMsg()
    await consumeMsg()
    // await consumeMsgByGrp()
    // await createTopic()
    // await listGrp();
}

async function produceMsg () {
    let topic = 'kafka-node-test';
    let thisIP = sdk.getIPAddress();
    let topicIp = 'serv-kn-' + thisIP;
    const kv = new Kafka.KeyedMessage('key', 'message')
    const payloads = [
        { topic, messages: 'hello world.', partition: 0 },
        { topic, messages: 'This is a message.', partition: 2 },
        { topic: topicIp, messages: ['Hi', 'vjudge.', kv], partition: 1 }
    ]
    let result = await kafkaClient.produceMsg(payloads)
    console.log('producerMsg result:', result)
    return result
}

async function consumeMsg () {
    let topic = 'kafka-node-test';
    await kafkaClient.consumeMsg(topic, 2)
}

async function consumeMsgByGrp () {
    let topic = 'kafka-node-test';
    await kafkaClient.consumeMsgByGrp(topic)
}

async function createTopic () {
    let topic = 'kafka-node-test';
    await kafkaClient.createTopic(topic);

    let thisIP = sdk.getIPAddress();
    let topicIp = 'serv-kn-' + thisIP;
    let result = await kafkaClient.createTopic(topicIp);
    console.log('createTopic result:', result)
}

async function listGrp () {
    await kafkaClient.listGrp();
}