const TrackableRepository = require('../repository/TrackingRepository');
const Settings = require('../config/Settings');
const Utils = require('../utils/Utils');



class TrackbaleService extends TrackableRepository {

	constructor() {
		super()
	}

	getAll(res) {
		this.get(response => {
			const path = (process.env.NODE_ENV !== 'production') ? Settings.BASE_URL[0] : Settings.BASE_URL[1];
			response.forEach(trackable => {
				trackable.target = `${path}/images/${trackable.target}.png`;
			});

			res.send(response)
		}, error => {
			res.send(error)
		});
	}

	getById(res, id) {
		this.getBy(id, (response) => {
			res.send(response)
		}, err => {
			error(res, err)
		});
	}

	create(res, data) {
		const fileName = Date.now().toString();
		Utils.createImage(data.target, fileName, () => {
			data.target = fileName;
			this.createTrackable(data, response => {
				res.send(response);
			}, error => {
				res.send(error);
			});
		});
	}

	update(res, data) {
		this.updateTrackable(data, response => {
			res.send(response);
		}, error => {
			res.send(error)
		});
	}

	remove(res, id) {


		this.getBy(id, (response) => {
			res.send(response[0])
			Utils.deleteImage(response[0].target)

			
		}, err => {
			error(res, err, 'Target nao encontrado')
		});


		// this.delete(id, (data) => {
		// 	res.send({
		// 		message: 'Trackable Removido'
		// 	})
		// }, error => {
		// 	res.send(error)
		// });
		
	}
}

module.exports = TrackbaleService;