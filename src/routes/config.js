const express = require('express');
const fs = require('fs');
const path = require('path');
const DockerService = require('../services/dockerService');
const NginxService = require('../services/nginxService');

const router = express.Router();
const configPath = path.join(__dirname, '../../config/config.json');

function loadConfig() {
  if (!fs.existsSync(configPath)) {
    return { containers: [] };
  }
  const data = fs.readFileSync(configPath);
  return JSON.parse(data.toString());
}

function saveConfig(cfg) {
  fs.writeFileSync(configPath, JSON.stringify(cfg, null, 2));
}

router.get('/', (req, res) => {
  const cfg = loadConfig();
  res.json(cfg);
});

router.post('/', async (req, res) => {
  const cfg = req.body;
  saveConfig(cfg);

  try {
    await DockerService.applyConfig(cfg);
    await NginxService.generate(cfg);
    res.json({ status: 'ok' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
