import { DynamicModule, Module } from '@nestjs/common';
import { ExceptionsModule } from '../exceptions/exceptions.module';
import { LoggerModule } from '../logger/logger.module';
import { LoggerService } from '../logger/logger.service';
import { RepositoryModule } from '../repository/repository.module';
import { DatabaseTopicRepository } from '../repository/topic.repository';
import { UseCaseProxy } from './useCase.proxy';
import { CreateTopicUseCase } from '../../usecases/topics/createTopic.usecase';
import { DatabaseUserRepository } from '../repository/user.repository';

@Module({
  imports: [LoggerModule, RepositoryModule, ExceptionsModule],
})
export class UsecasesProxyModule {
  static CREATE_TOPIC_USECASE_PROXY = 'createTopicUsecaseProxy';
  static GET_TOPICS_USECASES_PROXY = 'getTopicUsecasesProxy';
  static POST_TOPIC_USECASES_PROXY = 'postTopicUsecasesProxy';
  static DELETE_TOPIC_USECASES_PROXY = 'deleteTopicUsecasesProxy';
  static PUT_TOPIC_USECASES_PROXY = 'putTopicUsecasesProxy';

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [DatabaseTopicRepository, DatabaseUserRepository],
          provide: UsecasesProxyModule.CREATE_TOPIC_USECASE_PROXY,
          useFactory: (
            topicRepository: DatabaseTopicRepository,
            userRepository: DatabaseUserRepository,
          ) =>
            new UseCaseProxy(
              new CreateTopicUseCase(topicRepository, userRepository),
            ),
        },
        // {
        //   inject: [DatabaseTopicRepository],
        //   provide: UsecasesProxyModule.GET_TOPICS_USECASES_PROXY,
        //   useFactory: (topicRepository: DatabaseTopicRepository) =>
        //     new UseCaseProxy(new getTopicUseCases(topicRepository)),
        // },
        // {
        //   inject: [LoggerService, DatabaseTopicRepository],
        //   provide: UsecasesProxyModule.POST_TOPIC_USECASES_PROXY,
        //   useFactory: (logger: LoggerService, topicRepository: DatabaseTopicRepository) =>
        //     new UseCaseProxy(new addTopicUseCases(logger, topicRepository)),
        // },
        // {
        //   inject: [LoggerService, DatabaseTopicRepository],
        //   provide: UsecasesProxyModule.PUT_TOPIC_USECASES_PROXY,
        //   useFactory: (logger: LoggerService, topicRepository: DatabaseTopicRepository) =>
        //     new UseCaseProxy(new updateTopicUseCases(logger, topicRepository)),
        // },
        // {
        //   inject: [LoggerService, DatabaseTopicRepository],
        //   provide: UsecasesProxyModule.DELETE_TOPIC_USECASES_PROXY,
        //   useFactory: (logger: LoggerService, topicRepository: DatabaseTopicRepository) =>
        //     new UseCaseProxy(new deleteTopicUseCases(logger, topicRepository)),
        // },
      ],
      exports: [
        // UsecasesProxyModule.GET_TOPICS_USECASES_PROXY,
        UsecasesProxyModule.CREATE_TOPIC_USECASE_PROXY,
        // UsecasesProxyModule.PUT_TOPIC_USECASES_PROXY,
        // UsecasesProxyModule.DELETE_TOPIC_USECASES_PROXY,
      ],
    };
  }
}
