const _ = require('lodash')
const debug = require('debug')('test');


const servNodes =  [{"nodeId":"8a1c81e4-9f0e-6421-a54e-96e01b843da0","serviceId":"res-serv:10.254.74.126:9603","serviceName":"res-serv","address":"10.254.74.126","port":9603,"status":"critical","servUrl":"http://res.co-engine.com:8100","instance":3,"apiPrefix":"/res","protocol":"http"},{"nodeId":"8a1c81e4-9f0e-6421-a54e-96e01b843da0","serviceId":"res-serv:10.254.74.126:9602","serviceName":"res-serv","address":"10.254.74.126","port":9602,"status":"critical","servUrl":"http://res.co-engine.com:8100","instance":2,"apiPrefix":"/res","protocol":"http"},{"nodeId":"8a1c81e4-9f0e-6421-a54e-96e01b843da0","serviceId":"res-serv:10.254.74.126:8100","serviceName":"res-serv","address":"10.254.74.126","port":8100,"status":"critical","servUrl":"http://res.co-engine.com:8100","instance":1,"apiPrefix":"/res","protocol":"http"},{"nodeId":"8a1c81e4-9f0e-6421-a54e-96e01b843da0","serviceId":"res-serv:10.254.74.126:8600","serviceName":"res-serv","address":"10.254.74.126","port":8600,"status":"critical","servUrl":"http://res.co-engine.com:8100","instance":1,"apiPrefix":"/res","protocol":"http"},{"nodeId":"8a1c81e4-9f0e-6421-a54e-96e01b843da0","serviceId":"res-serv:10.254.74.126:9000","serviceName":"res-serv","address":"10.254.74.126","port":9000,"status":"critical","servUrl":"http://res.co-engine.com:8100","instance":1,"apiPrefix":"/res","protocol":"http"}]

getServAddr(servNodes, 3)

function getServAddr (servNodes, cnt) {
    debug(`servNodes: [${cnt}]`, JSON.stringify(servNodes))
    // 负载均衡(轮询)
    const baseIns = _.map(servNodes, 'instance')
    debug('baseIns.init: ', JSON.stringify({ baseIns, cnt }))
    for (let i = 1; i < baseIns.length; i++) {
        baseIns[i] = baseIns[i] + baseIns[i - 1]
    }
    const mod = cnt % baseIns[baseIns.length - 1]
    debug(`${cnt} % ${baseIns[baseIns.length - 1]} = ${mod}`)
    let i = baseIns.length - 1
    while (i >= 0) {
        if (mod > baseIns[i]) {
            break
        }
        i --
    }
    debug(`servNodes[${i + 1}]:${mod}`, JSON.stringify({ serNode: servNodes[i + 1], baseIns, i, mod, cnt }))
    return servNodes[i + 1]
}