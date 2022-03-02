const config = require('config')
const _ = require('lodash')
const express = require('express')
const compression = require('compression')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const formidable = require('formidable')
const querystring = require('querystring')

const debug = require('debug')('app:server')

const rpServProxy = require('./middleware/proxy.middleware')

const app = express()
app.use(compression())
app.use(helmet())
app.use(cookieParser())
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json())


// _.each(config.get('servers'), ({api_prefix, addrs}) => {
//     app.use(api_prefix, ProxyMiddleware(api_prefix, addrs))
// })

app.all('*', (req, res, next) => {
    const urlPath = `${req.url}`.split('/')
    const apiPrefix = `/${urlPath[1]}`
    debug('NotFound: ', req.url, apiPrefix)

    let body = ''
    req.on('data', (chunk) => {
        body += chunk
    })

    req.on('end', () => {
        debug('req.headers[content-type]: ', req.headers['content-type'])
        if (!req.headers['content-type']) {
            req.headers['content-type'] = 'application/json'
        }
        if (req.headers['content-type'].indexOf('application/json') !== -1) {
            // JSON 格式请求体解析
            req.body = body ? JSON.parse(body) : undefined
        } else if (req.headers['content-type'].indexOf('multipart/form-data') !== -1) {
            let file = querystring.parse(body, '\r\n', ':');
            debug('form-data: ', file)
            let fileInfo = file['Content-Disposition'].split('; ');
            let fileName = '';
            let ext = '';
            for (let value in fileInfo) {
                if (fileInfo[value].indexOf("filename=") != -1) {
                    fileName = fileInfo[value].substring(10, fileInfo[value].length - 1);

                    if (fileName.indexOf('\\') != -1) {
                        fileName = fileName.substring(fileName.lastIndexOf('\\') + 1);
                    }
                    ext = fileName.substr(fileName.indexOf('.') + 1, fileName.length);
                }
            }
            debug('file: ', file, fileName, ext)
            req.file = file
        } else if (req.headers['content-type'].indexOf('application/octet-stream') !== -1) {
            // TODO: Raw 格式请求体解析
        } else if (req.headers['content-type'].indexOf('text/plain') !== -1) {
            // TODO: text 文本格式请求体解析
        } else if (req.headers['content-type'].indexOf('application/x-www-form-urlencoded') !== -1) {
            // TODO: URL-encoded 格式请求体解析
        } else {
            // TODO: 其它格式解析
        }
        // 数据解析成功，开始请求
        debug('=== req.body: ', req.body)
        return rpServProxy(req, apiPrefix, config.get('servers.serv1.addrs')).then((proxyRet) => {
            // debug('proxyRet: ', proxyRet)
            return res.status(proxyRet.statusCode).json(proxyRet.body)
        }).catch((err) => {
            console.log('============ app =============')
            console.log('=== Error: ', err)
            console.log('============ app =============')
        })
    })
})

app.listen(config.get('port'), () => {
    console.log(`Server listening on port: ${config.get('port')}, NODE_ENV: ${process.env.NODE_ENV}`)
})


const app1 = express()
app1.use(compression())
app1.use(helmet())
app1.use(cookieParser())
// app1.use(bodyParser.urlencoded({ extended: true }))
app1.use(bodyParser.json())
app1.use('/serv1/info', (req, res, next) => {
    console.log('app1.req: ', {body: req.body, query: req.query})
    return res.status(200).json({ url: req.url, desc: 'success', body: req.body, query: req.query })
})
app1.use((req, res, next) => {
    console.log('* app1.req.body: ', req.body)
    return res.status(400).json({ url: req.url, desc: 'faild' })
})
app1.listen('3000', () => {
    console.log(`Server listening on port: ${3000}, NODE_ENV: ${process.env.NODE_ENV}`)
})
// app1.listen('3100', () => {
//     console.log(`Server listening on port: ${3000}, NODE_ENV: ${process.env.NODE_ENV}`)
// })





