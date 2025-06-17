const fs = require('fs');
const path = require('path');

function generate(cfg) {
  let conf = 'events {}\nhttp {\n';
  for (const containerCfg of cfg.containers) {
    conf += `  upstream ${containerCfg.name} {\n    server 127.0.0.1:${containerCfg.hostPort};\n  }\n`;
  }
  conf += '\n  server {\n    listen 80;\n';
  for (const containerCfg of cfg.containers) {
    conf += `    location /${containerCfg.name}/ {\n      proxy_pass http://${containerCfg.name};\n      proxy_set_header Host $host;\n    }\n`;
  }
  conf += '  }\n}\n';
  fs.writeFileSync(path.join(__dirname, '../../config/nginx.conf'), conf);
}

module.exports = { generate };
