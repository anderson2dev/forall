import { Test, TestingModule } from '@nestjs/testing';
import { EnvironmentConfigService } from '../../../infrastructure/config/environment-config/environment-config.service';
import { ConfigModule } from '@nestjs/config';

describe('EnvironmentConfigService', () => {
  let service: EnvironmentConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          ignoreEnvFile: true,
          isGlobal: false,
        }),
      ],
      providers: [EnvironmentConfigService],
    }).compile();

    service = module.get<EnvironmentConfigService>(EnvironmentConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
