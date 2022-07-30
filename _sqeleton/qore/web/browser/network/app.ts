import { Drash, PaladinService } from './deps.ts'

// import { DqErrorHandler } from './resources/error_handler.ts'
// import LandingResource from './resources/Landing.ts'
import { resources } from './resources/index.ts'
import { LoggingService, srvRateLimit, srvResponseTime, srvTengine } from './services/index.ts'

// Create and run your server
const server = new Drash.Server({
  // cert_file: "/path/to/cert/file.crt", // <--- See here (also notice key_file is present and protocol is "https")
  // key_file: "/path/to/cert/file.key",
  hostname: "0.0.0.0",
  port: 1447,
  protocol: "http",
  resources,
  services: [
    new LoggingService(), new PaladinService(),
    srvRateLimit, srvResponseTime, srvTengine
  ],
});

server.run();

console.log(`Server running at ${server.address}.`);
