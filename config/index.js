const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  port: process.env.PORT,
  mongoUrl: process.env.MONGO_URL,
  incidencesPhotoFolder: process.env.INCIDENCES_PHOTO_FOLDER,
  secret: process.env.SECRET
};