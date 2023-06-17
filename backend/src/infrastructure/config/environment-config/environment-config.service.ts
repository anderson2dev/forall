import { Injectable } from '@nestjs/common';
import { DataBaseConfig } from './database.interface';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class EnvironmentConfigService implements DataBaseConfig {
  constructor(private configService: ConfigService) {}

  getDatabaseHost(): string {
    return this.configService.get<string>('DATABASE_HOST');
  }

  getDatabaseName(): string {
    return this.configService.get<string>('DATABASE_NAME');
  }

  getDatabasePassword(): string {
    return this.configService.get<string>('DATABASE_PASSWORD');
  }

  getDatabasePort(): number {
    return this.configService.get<number>('DATABASE_PORT');
  }

  getDatabaseSync(): boolean {
    return this.configService.get<boolean>('DATABASE_SYNC');
  }

  getDatabaseSchema(): string {
    return this.configService.get<string>('DATABASE_SCHEMA');
  }

  getDatabaseUser(): string {
    return this.configService.get<string>('DATABASE_USER');
  }
}
