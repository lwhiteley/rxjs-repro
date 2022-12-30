import { DynamicModule, Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import {
  HEALTH_OPTIONS_KEY,
  HealthController,
  HealthOptions,
} from './health.controller';

@Module({})
export class HealthModule {
  static register(options: HealthOptions): DynamicModule {
    return {
      module: HealthModule,
      providers: [
        {
          provide: HEALTH_OPTIONS_KEY,
          useValue: options,
        },
      ],
      imports: [TerminusModule],
      controllers: [HealthController],
    };
  }
}
