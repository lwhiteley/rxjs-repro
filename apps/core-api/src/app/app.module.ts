import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from '../health/health.module';
import { LoggerModule } from 'nestjs-pino';
import { environment } from '../environments/environment';
import { getPinoLoggerConfig } from '../helpers/logging';

@Module({
  imports: [
    LoggerModule.forRoot(getPinoLoggerConfig(environment)),
    HealthModule.register({
      checks: [
        {
          type: 'disk',
          key: 'storage',
          options: {
            thresholdPercent: 0.99,
            path: '/',
          },
        },
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
