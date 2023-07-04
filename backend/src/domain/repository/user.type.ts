import { DomainUser } from '../entities/user.model';
import { IGenericDomainRepository } from '../utils/interfaces/domainRepository.interface';

export type UserRepository = IGenericDomainRepository<DomainUser>;
