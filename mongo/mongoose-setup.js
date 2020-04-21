const mongoose = require("mongoose");
const config = require("../shared/config");

mongoose.connect(config.mongoConnection, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true,
  useUnifiedTopology: true
}, (err) => {
  if(err) {
      console.log('Some problem with the connection ' +err);
  } else {
      console.log('The Mongoose connection is ready');
  }
});