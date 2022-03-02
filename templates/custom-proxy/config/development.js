module.exports = {
    port: parseInt(process.env.HTTP_PORT) || 8888,
    servers: {
        serv1: {
            api_prefix: '/serv1',
            addrs: [
                {
                    host_serv: 'http://localhost:3000',
                    instance: 2
                },
                {
                    host_serv: 'http://localhost:3100',
                    instance: 3
                }
            ]
        },
        serv2: {
            api_prefix: '/serv2',
            addrs: [
                {
                    host_serv: 'http://localhost:4000',
                    instance: 1
                },
                {
                    host_serv: 'http://localhost:4100',
                    instance: 3
                }
            ]
        },
        serv3: {
            api_prefix: '/serv3',
            addrs: [
                {
                    host_serv: 'http://localhost:5000',
                    instance: 1
                },
                {
                    host_serv: 'http://localhost:5100',
                    instance: 2
                }
            ]
        }
    }
}