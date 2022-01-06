module.exports = {
  kafka: {
    connect_opts: {
      clientId: "my-app",
      brokers: [
        "127.0.0.1:9092",
        "127.0.0.1:9093",
        "127.0.0.1:9094"
      ]
    },
    topic: {
      ctopt: {
        validateOnly: true,
        waitForLeaders: true,
        timeout: 5000
      },
      tscfg: {
        numPartitions: 3,
        replicationFactor: 3,
        configEntries: [
          { name: "compression.type", value: "zstd" }
        ]
      }
    }
  }
}