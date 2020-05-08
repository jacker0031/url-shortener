let mongo = require("mongodb");
let mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true ,  useUnifiedTopology: true  });
mongoose.set('useFindAndModify', false);
let Schema = mongoose.Schema;

var urlSchema = new Schema({
  original_url: String,
  short_url: String,
  count: {type:Number,default:0}
});

var Url = mongoose.model("Url", urlSchema);

function isValidShortUrl(short_url) {
  Url.find({ short_url: short_url }, function(err, results) {
    return results;
  });

}


module.exports = Url;