const sdk = require('./sdk')
const kafkaClient = require('./kafka-client')
const Kafka = require("kafka-node");

main();

async function main() {
    // await produceMsg()
    await consumeMsg()
    // await consumeMsgByGrp()
    // await createTopic()
}

async function produceMsg () {
    let topic = 'kafka-node-test';
    const kv = new Kafka.KeyedMessage('key', 'message')
    const payload = [
        { topic, message: 'hi', partition: 0 },
        { topic, message: ['Hi', 'vjudge', kv], partition: 1 }
    ]
    let result = await kafkaClient.produceMsg(payload)
    console.log('producerMsg result:', result)
    return result
}

async function consumeMsg () {
    let topic = 'kafka-node-test';
    await kafkaClient.consumeMsg(topic, 1)
}

async function consumeMsgByGrp () {
    let topic = 'kafka-node-test';
    await kafkaClient.consumeMsgByGrp(topic)
}

async function createTopic () {
    let topic = 'kafka-node-test';
    await kafkaClient.createTopic(topic);

    let thisIP = sdk.getIPAddress();
    let result = await kafkaClient.createTopic('serv-kn-' + thisIP);
    console.log('createTopic result:', result)
}
