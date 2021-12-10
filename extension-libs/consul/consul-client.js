const config = require('config')
const Consul = require('consul')

class ConsulClient {
    constructor() {
        this.consul = new Consul({
            host: config.get('consul.host'),
            port: config.get('consul.port'),
            promisify: true
        })
        // this.consul = new Consul({
        //     baseUrl: config.get('consul.url') + '/v1',
        //     defaults: {
        //         token: config.get('consul.token')
        //     },
        //     promisify: true
        // })
    }

    async register (cfg) {
        this.consul.agent.service.register(cfg, function(err, result){
            if(err){
                throw err;
            }
            console.log(cfg.name +' 注册成功！');
        })
    }

    async getKV (key) {
        const result = await this.consul.kv.get(key);
        if (!result) {
            return null;
        }
        return JSON.parse(result.Value);
    }

    async setKV (key, val) {
        this.consul.kv.set(key, JSON.stringify(val))
        return true
    }

}

module.exports = new ConsulClient()