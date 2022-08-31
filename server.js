const app = require('./app')
const dataBase = require('../models/dataBase')

const PORT = process.env.PORT || 3000;

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000")
// })

db.then(() => {
  app.listen(PORT, () => {
    console.log(`Database connection successful. PORT: ${PORT}`);
  });
}).catch(err => {
  console.log(`Server run failed. Error: ${err.message}`);
  process.exit(1);
});