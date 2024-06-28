const mongoose = require("mongoose");

mongoose
  .connect(process.env.DATA_BASE)
  .then(() => {
    console.log("___MongoDB Server Connected____");
  })
  .catch((err) => {
    console.log(`___MongoDB Server Not Connected reason :: ${err}____`);
  });
