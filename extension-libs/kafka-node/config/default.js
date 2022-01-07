module.exports = {
  "kafka": {
    "connect_opts": {
      "kafkaHost": "127.0.0.1:9092",
      "kafkaHost": "110.42.242.*:9092",
      "connectTimeout": 10000,
      "requestTimeout": 30000,
      "autoConnect": true,
      "reconnectOnIdle": true,
      "maxAsyncRequests": 10,
      versions: { disabled: false, requestTimeout: 500 }
    },
    "topic_opts": {
      "partitions": 3,
      "replicationFactor": 3,
      "configEntries": [ // Optional set of config entries
        {
          "name": "compression.type",
          "value": "zstd"
        },
        {
          "name": "min.compaction.lag.ms",
          "value": "50"
        }
      ]
    }
  }
}