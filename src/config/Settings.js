const Settings = {
  BASE_URL: ['http://localhost:3000', 'https://fpf-tracking.herokuapp.com'],
  PORT: 3000,
  DEV: {
    HOST: 'localhost',
    USER: 'root',
    PASS: '123456',
    DATABASE: 'arcontentmanager',
    PORT: 3306
  },
  PROD: {
    HOST: 'us-cdbr-iron-east-04.cleardb.net',
    USER: 'b1772d4732f1b2',
    PASS: '985a7642',
    DATABASE: 'heroku_50b73ca53a72440'
  }
}

module.exports = Settings;