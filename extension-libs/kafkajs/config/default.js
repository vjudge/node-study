module.exports = {
  kafka: {
    connect_opts: {
      clientId: "my-app",
      brokers: [
        "110.42.242.203:9092",
        // "127.0.0.1:9092",
        // "127.0.0.1:9093",
        // "127.0.0.1:9094"
      ]
    },
    topic: {
      ctopt: {
        validateOnly: false,
        waitForLeaders: true,
        timeout: 5000
      },
      tscfg: {
        numPartitions: 3,
        replicationFactor: 3,
        protocol: ["roundrobin"],
        configEntries: [
          { name: "compression.type", value: "gzip" }
        ]
      }
    }
  }
}