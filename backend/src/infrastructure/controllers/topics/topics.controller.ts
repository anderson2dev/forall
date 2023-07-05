import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UseCaseProxy } from '../../use-case-proxy/useCase.proxy';
import { UsecasesProxyModule } from '../../use-case-proxy/use-case-proxy.module';

import { TopicPresenter } from './topic.presenter';
import { ApiResponseType } from '../../commons/swagger/response.decorator';

import { CreateTopicUseCase } from '../../../usecases/topics/createTopic.usecase';
import { CreateTopicDTO } from './createTopic.dto';

@Controller('topics')
@ApiTags('topics')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(TopicPresenter)
export class TopicsController {
  constructor(
    @Inject(UsecasesProxyModule.CREATE_TOPIC_USECASE_PROXY)
    private readonly createTopicUseCase: UseCaseProxy<CreateTopicUseCase>, // @Inject(UsecasesProxyModule.GET_TOPICS_USECASES_PROXY) // private readonly getAllTodoUsecaseProxy: UseCaseProxy<getTodosUseCases>, // @Inject(UsecasesProxyModule.PUT_TOPICS_USECASES_PROXY) // private readonly updateTodoUsecaseProxy: UseCaseProxy<updateTodoUseCases>, // @Inject(UsecasesProxyModule.DELETE_TOPICS_USECASES_PROXY) // private readonly deleteTodoUsecaseProxy: UseCaseProxy<deleteTodoUseCases>, // @Inject(UsecasesProxyModule.POST_TOPICS_USECASES_PROXY) // private readonly addTodoUsecaseProxy: UseCaseProxy<addTodoUseCases>,
  ) {}

  // @Get('todo')
  // @ApiResponseType(TodoPresenter, false)
  // async getTodo(@Query('id', ParseIntPipe) id: number) {
  //   const todo = await this.getTodoUsecaseProxy.getInstance().execute(id);
  //   return new TodoPresenter(todo);
  // }

  // @Get('todos')
  // @ApiResponseType(TodoPresenter, true)
  // async getTodos() {
  //   const todos = await this.getAllTodoUsecaseProxy.getInstance().execute();
  //   return todos.map((todo) => new TodoPresenter(todo));
  // }

  // @Put('todo')
  // @ApiResponseType(TodoPresenter, true)
  // async updateTodo(@Body() updateTodoDto: UpdateTodoDto) {
  //   const { id, isDone } = updateTodoDto;
  //   await this.updateTodoUsecaseProxy.getInstance().execute(id, isDone);
  //   return 'success';
  // }

  // @Delete('todo')
  // @ApiResponseType(TodoPresenter, true)
  // async deleteTodo(@Query('id', ParseIntPipe) id: number) {
  //   await this.deleteTodoUsecaseProxy.getInstance().execute(id);
  //   return 'success';
  // }

  @Post('topics')
  @ApiResponseType(TopicPresenter, true)
  async addTodo(@Body() createTopicDTO: CreateTopicDTO) {
    await this.createTopicUseCase.getInstance().execute(createTopicDTO);
    return new TopicPresenter({
      author: createTopicDTO.author,
      description: createTopicDTO.description,
      title: createTopicDTO.title,
    });
  }
}
