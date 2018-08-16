const multer  = require('multer')
const crypto = require('crypto');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/uploads/')
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(16, function (err, raw) {
      if (err) return cb(err)
      
      cb(null, raw.toString('hex') + file.originalname)
    })
  }
});

const upload = multer({ storage: storage });
const TrackbaleService = require('../service/TrackingService');

class TrackingResource extends TrackbaleService {

  constructor(){
    super();
  }

  router(app, dir) {

    app.get('/api/tracking', (req, res) => {
      this.getAll(res)
    });

    app.get('/api/tracking/:id', (req, res) => {
      this.getById(res, req.params.id);
    });

    app.post('/api/tracking', upload.single('image'), (req, res) => {
      this.create(res, req.body, dir);
    });

    app.put('/api/tracking/:id', upload.single('image'),(req, res) => {
      this.update(res, req.body);
    });

    app.delete('/api/tracking/:target_id', (req, res) => {
      this.remove(res, req.params.target_id);
    });
  }

}

module.exports = new TrackingResource();