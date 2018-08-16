const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Settings = require('../src/config/Settings');
const Connection = require('./Connection');
const trackingResource = require('../src/resource/TrackingResource');

class App {

    constructor() {
        this.app = express();
        this.init();
    }

    init() {
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        this.app.use('/images', express.static(__dirname + '/uploads'));

        Connection.connect();
        trackingResource.router(this.app, __dirname);

        this.startServer();
    }

    startServer() {
        const server = this.app.listen(process.env.PORT || Settings.PORT, () => {
            console.log('[SERVER UP] http://localhost:' + server.address().port)
        });
        this.router();
    }

    router() {
        this.app.get('/api/', (req, res) => {
            res.send({
                api: 'tracking',
                router: '/api/tracking'
            })
        });
    }
}

module.exports = new App();