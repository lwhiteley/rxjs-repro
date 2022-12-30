import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';

export const configureLogging = async (app) => {
  app.useLogger(app.get(Logger));
  // TODO: fix rxjs double version in pnpm
  // * commenting out the line below will make `curl localhost:3333/health` work
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
};
