import { Injectable } from '@nestjs/common';
import { DataBaseConfig } from './database.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentConfigService implements DataBaseConfig {
  constructor(private configService: ConfigService) {}

  getDatabaseHost(): string {
    return this.configService.get('DATABASE_HOST');
  }

  getDatabaseName(): string {
    return this.configService.get('DATABASE_NAME');
  }

  getDatabasePassword(): string {
    return this.configService.get('DATABASE_PASSWORD');
  }

  getDatabasePort(): number {
    return this.configService.get('DATABASE_PORT');
  }

  getDatabaseSync(): boolean {
    return this.configService.get('DATABASE_SYNC');
  }

  getDatabaseSchema(): string {
    return this.configService.get('DATABASE_SCHEMA');
  }

  getDatabaseUser(): string {
    return this.configService.get('DATABASE_USER');
  }
}
