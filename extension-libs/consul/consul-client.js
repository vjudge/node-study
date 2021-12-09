const Consul = require('consul')

const consul = new Consul({
    host: '127.0.0.1',
    port: 8500,
    promisify: true
})
