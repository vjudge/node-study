const config = require('config');
const _ = require('lodash');
const { Kafka } = require('kafkajs');

class KafkaClient {
    constructor () {
        this.kafka = new Kafka(config.get('kafka.connect_opts'));
        console.log('kafka: ', config.get('kafka.connect_opts'));
    }

    async sendMsg (topic, messages) {
        const producer = this.kafka.producer();
        await producer.connect();

        await producer.send({ topic, messages });

        await producer.disconnect();
        return true
    }

    async consumeMsg (topic, groupId) {
        const consumer = this.kafka.consumer({ groupId })
        await consumer.connect();
        await consumer.subscribe({ topic, fromBeginning: true })
        console.log('--------------------------')
        await consumer.run({
            autoCommit: true,
            // partitionsConsumedConcurrently: 2,
            eachMessage: async ({ topic, partition, message }) => {
                await consumer.commitOffsets([{
                    topic: topic,
                    partition: partition,
                    offset: Number(message.offset) + 1
                }]);
                console.log('---consumeMsg.topic:', topic, partition)
                console.log('---consumeMsg.message', {
                    key: message.key,
                    value: message.value.toString(),
                    headers: message.headers
                })
            }
        });

        const errorTypes = ['unhandledRejection', 'uncaughtException']
        const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2']

        errorTypes.map(type => {
            process.on(type, async e => {
                try {
                    console.log(`process.on ${type}`)
                    console.error(e)
                    await consumer.disconnect()
                    process.exit(0)
                } catch (_) {
                    process.exit(1)
                }
            })
        })

        signalTraps.map(type => {
            process.once(type, async () => {
                try {
                    await consumer.disconnect()
                } finally {
                    process.kill(process.pid, type)
                }
            })
        })
        // await consumer.disconnect();
    }

    async createTopic (topic, tcfg) {
        let topics = [_.assign({ topic }, config.get('kafka.topic.tscfg'), tcfg)];
        let params = _.assign({ topics }, config.get('kafka.topic.ctopt'));
        console.log('createTopic params:', params);
        const admin = this.kafka.admin();
        await admin.connect();
        let result = await admin.createTopics(params);
        await admin.disconnect();
        return result;
    }

}


module.exports = new KafkaClient();