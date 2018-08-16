const fs = require('fs');
const path = require('path');

class Utils {

    constructor() {
    }

    createImage(image, fileName, callBackSuccess) {
        fs.writeFile(path.resolve(__dirname, '../uploads/' + fileName + '.png'),
            image.replace(/^data:image\/png;base64,/, ''), 'base64', () => {
                callBackSuccess();
            }
        );
    }

    deleteImage(fileName, callBackSuccess ){
        console.log(fileName);
        fs.unlink(path.resolve(__dirname, '../uploads/' + fileName + '.png'), (err) => {
            if (err) throw err;
            console.log('successfully');
          });
    }
}


module.exports = new Utils();