const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer((req, res) => {
  let file = path.join(__dirname, req.url);
  if (fs.existsSync(file) && fs.statSync(file).isFile()) {
    res.end(fs.readFileSync(file));
  } else {
    res.end(fs.readFileSync(path.join(__dirname, 'index.html')));
  }
}).listen(5500, () => console.log('Serveur SmartBank prêt sur http://localhost:5500'));