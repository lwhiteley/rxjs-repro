import { Controller, Get, Inject } from '@nestjs/common';
import {
  DiskHealthIndicator,
  DiskHealthIndicatorOptions,
  HealthCheck,
  HealthCheckService,
} from '@nestjs/terminus';

type HealthCheck = {
  type: 'disk';
  key: string;
  options: DiskHealthIndicatorOptions;
};
export interface HealthOptions {
  checks: HealthCheck[];
}

export const HEALTH_OPTIONS_KEY = 'HEALTH_OPTIONS';

@Controller('health')
export class HealthController {
  constructor(
    @Inject(HEALTH_OPTIONS_KEY) private options: HealthOptions,
    private health: HealthCheckService,
    private disk: DiskHealthIndicator
  ) {}

  @Get()
  @HealthCheck()
  check() {
    const checks = this.options.checks.map((check) => {
      switch (check.type) {
        case 'disk': {
          return () => this.disk.checkStorage(check.key, check.options);
        }
      }
    });
    return this.health.check(checks);
  }

  @Get('/ready')
  @HealthCheck()
  ready() {
    return this.check();
  }

  @Get('/alive')
  @HealthCheck()
  alive() {
    return this.check();
  }
}
