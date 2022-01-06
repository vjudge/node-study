const config = require('config')
const _ = require('lodash')
const Kafka = require('kafka-node')
const {kafka} = require("./config/default");

const DEFAULT_TPOIC_OPTS = {
    topic: "",

}

class KafkaClient {
    constructor(has_topic = true) {
        this.kafka = new Kafka.KafkaClient(config.get('kafka.connect_opts'))
    }

    createTopic (opts) {
        if (!opts.topic) {
            return false
        }
        let params = _.assign(config.get('kafka.topic_opts'), opts)
        this.topic = this.kafka.createTopics([params], (error, result) => {
        })
    }
}

module.exports = new KafkaClient()