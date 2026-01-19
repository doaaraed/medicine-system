const http = require('http');
const app = require('./app');


const server = http.createServer(app);


const PORT = process.env.PORT || 5000;
server.listen(PORT, '0.0.0.0', () => {
  console.log('Server is listening now on port', PORT);
});
