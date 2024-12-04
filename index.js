const app = require('./app'); // import app file 
require('dotenv').config();

app.listen(process.env.port, () => {
    console.log(`Server is running at port: ${process.env.port} port`);
})
