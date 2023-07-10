import { DomainUser } from '../entities/user.model';
import { IGenericDomainRepository } from '../utils/interfaces/domainRepository.interface';

export interface UserRepository extends IGenericDomainRepository<DomainUser> {
  getUserByLogin(username: string): Promise<DomainUser>;
  updateRefreshToken(username: string, refreshToken: string);
  updateLastLogin(username: string);
}
