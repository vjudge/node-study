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
    produceMsg (payloads) {
        const producer = new Kafka.Producer(this.client);
        console.log('=producerMsg payload:', payloads)
        producer.on('ready', () => {
            producer.send(payloads, (err, data) => {
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
            payloads.push({ topic, partition: i+1 });
        }
        console.log('=consumeMsg payloads: ', payloads)
        const consumer = new Kafka.Consumer(this.client, payloads, {
            groupId: 'kafka-node-grp',
            protocol: ['roundrobin'],
            autoCommit: true,
            autoCommitIntervalMs: 5000,
            fetchMaxWaitMs: 1000,
            fetchMinBytes: 1,
            fetchMaxBytes: 1024 * 1024,
            fromOffset: false,
            encoding: 'utf8',
            keyEncoding: 'utf8'
        })

        consumer.on('message', (message) => {
            console.log('=consumeMsg.on message: ', message)
            consumer.commit(function(err, data) {
                console.log('=consumeMsg.commit err:', err)
                console.log('=consumeMsg.commit data:', data)
            })
        })
        // consumer.on('error', function (err) {
        //     console.log('consumeMsg error:', err)
        // })
    }

    // 消费消息
    consumeMsgByGrp (topic) {
        const consumeGrpOpts = {
            kafkaHost: '110.42.242.*:9092',
            groupId: 'kafka-node-grp',
            sessionTimeout: 15000,
            protocol: ['roundrobin'],
            fromOffset: 'earliest',
            outOfRangeOffset: "none",
            autoCommit: true,
            autoCommitIntervalMs: 1000,
            heartbeatInterval: 1000,
            maxTickMessages: 1
        }
        console.log('=consumeGrpOpts:', consumeGrpOpts, topic)
        const consumer = new Kafka.ConsumerGroup(consumeGrpOpts, topic)
        consumer.on("connect", () => {
            console.log("kafka consumerGroup connect");
        });

        consumer.on('message', (message) => {
            console.log('message: ', message)
        })

        // consumer.on("error", (err) => {
        //     console.error("consumeMsgByGrp Error: ", err);
        // });
    }

    async listGrp () {
        const admin = new Kafka.Admin(this.client);
        admin.listGroups((err, data) => {
            console.log('consumerGroup:', data);
            _.map(data, (val, key) => {
                admin.describeGroups([key], (err, res) => {
                    console.log(res)
                })
            })
        })
    }
}

module.exports = new KafkaClient()