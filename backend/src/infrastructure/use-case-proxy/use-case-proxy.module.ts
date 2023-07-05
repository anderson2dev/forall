import { DynamicModule, Module } from '@nestjs/common';
import { ExceptionsModule } from '../commons/exceptions/exceptions.module';
import { LoggerModule } from '../logger/logger.module';
import { LoggerService } from '../logger/logger.service';
import { RepositoryModule } from '../repository/repository.module';
import { DatabaseTopicRepository } from '../repository/topic.repository';
import { UseCaseProxy } from './useCase.proxy';
import { CreateTopicUseCase } from '../../usecases/topics/createTopic.usecase';
import { DatabaseUserRepository } from '../repository/user.repository';
import { UserExceptionsService } from '../commons/exceptions/userExceptions.service';
import { GetTopicsUseCase } from '../../usecases/topics/getTopics.usecase';

@Module({
  imports: [LoggerModule, RepositoryModule, ExceptionsModule],
})
export class UsecasesProxyModule {
  static CREATE_TOPIC_USECASE_PROXY = 'createTopicUsecaseProxy';
  static GET_TOPICS_USECASE_PROXY = 'getTopicsUsecaseProxy';
  static GET_TOPIC_USECASE_PROXY = 'getTopicUsecaseProxy';
  static POST_TOPIC_USECASE_PROXY = 'postTopicUsecaseProxy';
  static DELETE_TOPIC_USECASE_PROXY = 'deleteTopicUsecaseProxy';
  static PUT_TOPIC_USECASE_PROXY = 'putTopicUsecasesProxy';

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [
            DatabaseTopicRepository,
            DatabaseUserRepository,
            UserExceptionsService,
            LoggerService,
          ],
          provide: UsecasesProxyModule.CREATE_TOPIC_USECASE_PROXY,
          useFactory: (
            topicRepository: DatabaseTopicRepository,
            userRepository: DatabaseUserRepository,
            userExceptionService: UserExceptionsService,
            logger: LoggerService,
          ) =>
            new UseCaseProxy(
              new CreateTopicUseCase(
                topicRepository,
                userRepository,
                userExceptionService,
                logger,
              ),
            ),
        },
        {
          inject: [DatabaseTopicRepository, LoggerService],
          provide: UsecasesProxyModule.GET_TOPICS_USECASE_PROXY,
          useFactory: (
            topicRepository: DatabaseTopicRepository,
            logger: LoggerService,
          ) => new UseCaseProxy(new GetTopicsUseCase(topicRepository, logger)),
        },
        {
          inject: [LoggerService, DatabaseTopicRepository],
          provide: UsecasesProxyModule.GET_TOPIC_USECASE_PROXY,
          useFactory: (
            logger: LoggerService,
            topicRepository: DatabaseTopicRepository,
          ) => new UseCaseProxy(new GetTopicsUseCase(topicRepository, logger)),
        },
        // {
        //   inject: [DatabaseTopicRepository],
        //   provide: UsecasesProxyModule.GET_TOPICS_USECASE_PROXY,
        //   useFactory: (topicRepository: DatabaseTopicRepository) =>
        //     new UseCaseProxy(new getTopicUseCases(topicRepository)),
        // },
        // {
        //   inject: [LoggerService, DatabaseTopicRepository],
        //   provide: UsecasesProxyModule.POST_TOPIC_USECASE_PROXY,
        //   useFactory: (logger: LoggerService, topicRepository: DatabaseTopicRepository) =>
        //     new UseCaseProxy(new addTopicUseCases(logger, topicRepository)),
        // },
        // {
        //   inject: [LoggerService, DatabaseTopicRepository],
        //   provide: UsecasesProxyModule.PUT_TOPIC_USECASE_PROXY,
        //   useFactory: (logger: LoggerService, topicRepository: DatabaseTopicRepository) =>
        //     new UseCaseProxy(new updateTopicUseCases(logger, topicRepository)),
        // },
        // {
        //   inject: [LoggerService, DatabaseTopicRepository],
        //   provide: UsecasesProxyModule.DELETE_TOPIC_USECASE_PROXY,
        //   useFactory: (logger: LoggerService, topicRepository: DatabaseTopicRepository) =>
        //     new UseCaseProxy(new deleteTopicUseCases(logger, topicRepository)),
        // },
      ],
      exports: [
        UsecasesProxyModule.GET_TOPICS_USECASE_PROXY,
        UsecasesProxyModule.GET_TOPIC_USECASE_PROXY,
        UsecasesProxyModule.CREATE_TOPIC_USECASE_PROXY,
        // UsecasesProxyModule.PUT_TOPIC_USECASE_PROXY,
        // UsecasesProxyModule.DELETE_TOPIC_USECASE_PROXY,
      ],
    };
  }
}
