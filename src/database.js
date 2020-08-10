const mongoose = require("mongoose");

mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
/*mongoose
  .connect("mongodb://127.0.0.1:27017/hoodbackend")*/
 mongoose
  .connect(
    "mongodb+srv://hood:hooddatabase@cluster0.kc4fi.mongodb.net/hood?retryWrites=true&w=majority"
  )
  .then((db) => console.log("DB is connected"))
  .catch((err) => console.error(err));
