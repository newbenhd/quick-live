const db = require("./utils/db");
const app = require("./server");

const port = process.env.PORT || 5000;
db.open()
  .then(() => {
    app.listen(port, () => {
      console.log(`Connected to server on port ${port}`);
    });
  })
  .catch(e => {
    throw new Error("Fail to connect to database");
  });
