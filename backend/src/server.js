import app from "./app.js";
import "dotenv/config";
import connectDB from "./db/connection.js";

connectDB()
  .then(() => {
    const port = process.env.PORT;
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Mongo DB connection Error from server.js: " + error);
  });
