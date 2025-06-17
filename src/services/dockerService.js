const Docker = require('dockerode');
const docker = new Docker();

async function applyConfig(cfg) {
  for (const containerCfg of cfg.containers) {
    const containers = await docker.listContainers({ all: true, filters: { name: [containerCfg.name] } });
    let container;
    if (containers.length === 0) {
      container = await docker.createContainer({
        Image: containerCfg.image,
        name: containerCfg.name,
        Env: containerCfg.env,
        ExposedPorts: containerCfg.ports,
        HostConfig: {
          PortBindings: containerCfg.portBindings
        }
      });
    } else {
      container = docker.getContainer(containers[0].Id);
      await container.stop();
      await container.remove();
      container = await docker.createContainer({
        Image: containerCfg.image,
        name: containerCfg.name,
        Env: containerCfg.env,
        ExposedPorts: containerCfg.ports,
        HostConfig: {
          PortBindings: containerCfg.portBindings
        }
      });
    }

    await container.start();
  }
}

module.exports = { applyConfig };
