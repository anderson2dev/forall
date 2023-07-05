import { Module } from '@nestjs/common';
import { UsecasesProxyModule } from '../use-case-proxy/use-case-proxy.module';
import { TopicsController } from './topics/topics.controller';

@Module({
  imports: [UsecasesProxyModule.register()],
  controllers: [TopicsController],
})
export class ControllersModule {}
