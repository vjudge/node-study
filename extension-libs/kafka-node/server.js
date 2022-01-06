const sdk = require('./sdk')
const kafkaClient = require('./kafka-client')

main();

async function main() {
    await producerMsg()
}

async function producerMsg () {
    let result = await kafkaClient.producerMsg('kafka-node-test')
    console.log('result:', result)
    return result
}

async function createTopic () {
    let thisIP = sdk.getIPAddress();
    let topic = await kafkaClient.createTopic(thisIP);
    console.log('topic:', topic)
}
