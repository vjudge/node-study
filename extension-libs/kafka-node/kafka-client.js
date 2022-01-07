const config = require('config')
const _ = require('lodash')
const Kafka = require('kafka-node')

const DEFAULT_TPOIC_OPTS = {
    topic: "",

}

class KafkaClient {
    constructor(has_topic = true) {
        this.client = new Kafka.KafkaClient(config.get('kafka.connect_opts'))
        console.log('KafkaClient kafka:', config.get('kafka.connect_opts'))
    }

    // 创建主题
    async createTopic (topic, opts) {
        if (!topic) {
            return false;
        }
        let params = _.assign({ topic }, config.get('kafka.topic_opts'), opts);
        console.log('=createTopic params:', params )

        const admin = new Kafka.Admin(this.client);
        admin.createTopics([params], (err, res) => {
            console.log('=createTopic err:', err)
            console.log('=createTopic res:', res)
            if (!err) {
                return true
            }
            return false
        })

        // const client = new Kafka.KafkaClient({kafkaHost: '127.0.0.1:9092'});
        // client.createTopics([params], (error, result) => {
        //     console.log('createTopic error:', error)
        //     console.log('createTopic result:', result)
        //     if (error) {
        //         throw error;
        //     }
        //     console.log(`${topic} created successfully!`);
        //     this.topic = result[0];
        //     return result[0];
        // })
    }

    // 生产消息，并放入对应的主题
    produceMsg (payload) {
        const producer = new Kafka.Producer(this.client);
        console.log('=producerMsg payload:', payload)
        producer.on('ready', () => {
            producer.send(payload, (err, data) => {
                console.log('=producerMsg err:', err)
                console.log('=producerMsg data:', data)
            })
        })
        producer.on('error', function (error) {
            console.error('produceMsg error:', error)
        })
    }

    // 消费消息，从指定的主题获取消息
    consumeMsg (topic, partition) {
        let payloads = []
        for (let i = 0; i < partition; i ++) {
            payloads.push({ topic });
        }
        console.log('=consumeMsg payloads: ', payloads)
        const consumer = new Kafka.Consumer(this.client, payloads, {
            groupId: 'test-grp',
            autoCommit: true,
            fetchMaxWaitMs: 1000,
            fetchMaxBytes: 1024 * 1024
        })
        consumer.on('message', (message) => {
            console.log('=consumeMsg message: ', message)
            consumer.commit(function(err, data) {
                console.log('=consumeMsg err:', err)
                console.log('=consumeMsg data:', data)
            })
        })
        // consumer.on('error', function (err) {
        //     console.log('consumeMsg error:', err)
        // })
    }

    // 消费消息
    consumeMsgByGrp (topic) {
        const consumeGrpOpts = {
            host: '110.42.242.203:9092',
            groupId: 'test-grp',
            sessionTimeout: 15000,
            protocol: ['roundrobin'],
            fromOffset: 'earliest'
        }
        console.log('=consumeGrpOpts:', consumeGrpOpts, topic)
        const consumer = new Kafka.ConsumerGroup(_.assign({ id: 'consumer' }, consumeGrpOpts), [topic])
        consumer.on('message', async (message) => {
            console.log('message: ', message)
        })
    }
}

module.exports = new KafkaClient()