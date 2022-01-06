const config = require('config')
const _ = require('lodash')
const Kafka = require('kafka-node')

const DEFAULT_TPOIC_OPTS = {
    topic: "",

}

class KafkaClient {
    constructor(has_topic = true) {
        this.client = new Kafka.KafkaClient(config.get('kafka.connect_opts'))
        console.log('kafka:', config.get('kafka.connect_opts'))
    }

    // 创建主题
    async createTopic (topic, opts) {
        if (!topic) {
            return false;
        }
        let params = _.assign({ topic }, config.get('kafka.topic_opts'), opts);
        console.log('createTopic params:', params )

        const admin = new Kafka.Admin(this.client);
        admin.createTopics([params], (err, res) => {
            console.log('err:', err)
            console.log('res:', res)
        })


        // this.kafka.createTopics([params], (error, result) => {
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
    producerMsg (topic, msg) {
        const producer = new Kafka.Producer(this.client);
        const kv = new Kafka.KeyedMessage('key', 'message')
        const payload = [
            { topic, message: 'hi', partition: 0 },
            { topic, message: ['Hi', 'vjudge', kv] }
        ]
        producer.on('ready', () => {
            producer.send(payload, (err, data) => {
                console.log('err:', err)
                console.log('data:', data)
            })
        })
    }

    // 消费消息，从指定的主题获取消息
    consumerNsg (topic, userId) {

    }

    // 关闭连接
    close () {

    }
}

module.exports = new KafkaClient()