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