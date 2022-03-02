const config = require('config')
const _ = require('lodash')
const express = require('express')
const compression = require('compression')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const debug = require('debug')('app:server')

const ProxyMiddleware = require('./middleware/proxy.middleware')

const app = express()
app.use(compression())
app.use(helmet())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


_.each(config.get('servers'), ({api_prefix, addrs}) => {
    app.use(api_prefix, ProxyMiddleware(api_prefix, addrs))
})

app.listen(config.get('port'), () => {
    console.log(`Server listening on port: ${config.get('port')}, NODE_ENV: ${process.env.NODE_ENV}`)
})


const app1 = express()
app1.use(compression())
app1.use(helmet())
app1.use(cookieParser())
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json())
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





