const _ = require('lodash')
const request = require('request')
const rp = require('request-promise')
const debug = require('debug')('app:proxy')

// module.exports = function (apiPrefix, addrs) {
//     return async function (req, res, next) {
//         debug('proxy.init ', JSON.stringify({ apiPrefix, addrs }))
//         const params = {
//             uri: `${addrs[0].host_serv}${apiPrefix}${req.url}`,
//             method: req.method,
//             headers: req.headers,
//             qs: req.query,
//             body: req.body,
//             timeout: 30 * 1000,
//             json: true,
//             resolveWithFullResponse: true,
//             // formData: undefined,
//         }
//         debug('params ', JSON.stringify(params))
//         // // ============================
//         // const proxyRet = await rp(params)
//         // debug('proxyRet: ', Object.keys(proxyRet), Object.keys(req), proxyRet.body)
//         // res.headers = proxyRet.headers
//         // return res.status(res.statusCode).json(proxyRet.body)
//         // =============================
//         req.pipe(request.post(params.uri, { form: req.body }), { end: false }).pipe(res)
//         // debug('=== res', res, Object.keys(res))
//         res.on('data', (data) => {
//             return res.status(res.statusCode).json({data})
//         })
//     }
// }

module.exports = async function rpServProxy (req, apiPrefix, addrs) {
    debug('proxy.init ', JSON.stringify({ apiPrefix, addrs }))
    const params = {
        uri: `${addrs[0].host_serv}${req.url}`,
        method: req.method,
        headers: req.headers,
        qs: req.query,
        body: req.body,
        timeout: 10 * 1000,
        json: true,
        resolveWithFullResponse: true,
        // formData: undefined,
    }
    debug('params ', JSON.stringify(params))
    // // ============================
    const proxyRet = await rp(params)
    return proxyRet
    // debug('proxyRet: ', Object.keys(proxyRet), Object.keys(req), proxyRet.body)
    // res.headers = proxyRet.headers
    // return res.status(res.statusCode).json(proxyRet.body)
    // =============================
    // req.pipe(request.post(params.uri, { form: req.body }), { end: false }).pipe(res)
    // debug('=== res', res, Object.keys(res))
    // res.on('data', (data) => {
    //     return res.status(res.statusCode).json({data})
    // })
}