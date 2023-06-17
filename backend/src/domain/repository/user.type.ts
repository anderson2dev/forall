import { DomainUser } from '../entities/user.model';
import { IGenericDomainRepository } from './domainRepository.interface';

export type UserRepository = IGenericDomainRepository<DomainUser>;
