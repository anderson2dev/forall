import { DomainUser } from '../../domain/entities/user.model';
import { ILoggerInterface } from '../../domain/loggers/logger.interface';
import { UserRepository } from '../../domain/repositories/user.interface';

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly logger: ILoggerInterface,
  ) {}

  async execute(data: CreateUserDTO): Promise<Partial<DomainUser>> {
    const createdUser = await this.userRepository.insert(data);
    this.logger.log(
      'CreateUserUseCase.execute',
      `User ${createdUser.id} created`,
    );
    return createdUser;
  }
}
