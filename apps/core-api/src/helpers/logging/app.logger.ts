import { RequestMethod } from '@nestjs/common';
import { Params } from 'nestjs-pino';
import { getBaseErrorProperties } from './error-reporting';

export const getPinoLoggerConfig = (environment): Params => {
  const { production: isProduction, service } = environment;

  return {
    pinoHttp: {
      transport: !isProduction ? { target: 'pino-pretty' } : undefined,
      messageKey: 'message',
      customSuccessMessage(req, res) {
        return `request completed: ${req.method} ${req.url} ${res.statusCode}`;
      },
      customErrorMessage(req, res, error) {
        return `request failed: ${req.method} ${req.url} ${res.statusCode} => ${error.message} ${error.stack}`;
      },
      customErrorObject(req, res, error, loggableProps) {
        const productionOverrides = isProduction ? { severity: 'ERROR' } : {};
        return {
          ...(loggableProps || {}),
          ...getBaseErrorProperties(),
          ...productionOverrides,
        };
      },
      formatters: {
        level(label, number) {
          const base = {
            level: number,
          };
          return isProduction
            ? {
                ...base,
                severity: label?.toUpperCase(),
                serviceContext: {
                  service: service.name,
                  version: service.revisionId || service.version,
                },
              }
            : base;
        },
      },
    },
    exclude: [
      { method: RequestMethod.ALL, path: 'health' },
      { method: RequestMethod.ALL, path: 'health/(.*)' },
    ],
  };
};
