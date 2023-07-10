import {
  DomainUser,
  DomainUserWithoutPassword,
} from '../../domain/entities/user.model';
import { UserRepository } from '../../domain/repositories/user.interface';
export class IsAuthenticatedUseCases {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(username: string): Promise<DomainUserWithoutPassword> {
    const user: DomainUser = await this.userRepository.getUserByLogin(username);
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...info } = user;
    return info;
  }
}
