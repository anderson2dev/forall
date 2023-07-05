import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UseCaseProxy } from '../../use-case-proxy/useCase.proxy';
import { UsecasesProxyModule } from '../../use-case-proxy/use-case-proxy.module';

import { GetTopicPresenter, TopicPresenter } from './topic.presenter';
import { ApiResponseType } from '../../commons/swagger/response.decorator';

import { CreateTopicUseCase } from '../../../usecases/topics/createTopic.usecase';
import { GetTopicsUseCase } from '../../../usecases/topics/getTopics.usecase';
import { GetTopicUseCase } from '../../../usecases/topics/getTopic.usecase';
import { CreateTopicDTO } from './topics.dto';

@Controller('topics')
@ApiTags('topics')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(TopicPresenter)
export class TopicsController {
  constructor(
    @Inject(UsecasesProxyModule.CREATE_TOPIC_USECASE_PROXY)
    private readonly createTopicUseCase: UseCaseProxy<CreateTopicUseCase>,
    @Inject(UsecasesProxyModule.GET_TOPICS_USECASE_PROXY)
    private readonly getTopicsUseCase: UseCaseProxy<GetTopicsUseCase>,
    @Inject(UsecasesProxyModule.GET_TOPIC_USECASE_PROXY)
    private readonly getTopicUseCase: UseCaseProxy<GetTopicUseCase>,
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

  @Post()
  @ApiResponseType(TopicPresenter, true)
  async createTopic(@Body() createTopicDTO: CreateTopicDTO) {
    await this.createTopicUseCase.getInstance().execute(createTopicDTO);
    return new TopicPresenter({
      author: createTopicDTO.author,
      description: createTopicDTO.description,
      title: createTopicDTO.title,
    });
  }
  @Get()
  @ApiResponseType(TopicPresenter, true)
  async getTopics() {
    const topics = await this.getTopicsUseCase.getInstance().execute();
    return (
      topics?.map((topic) => {
        return new GetTopicPresenter(topic);
      }) ?? []
    );
  }
  @Get(':id')
  @ApiResponseType(TopicPresenter, true)
  async getTopic(@Param(':id') id: string) {
    const topic = await this.getTopicUseCase.getInstance().execute(id);
    return new GetTopicPresenter(topic);
  }
}
