import { DomainProfile } from '../entities/profile.model';
import { IGenericDomainRepository } from './domainRepository.interface';

export type ProfileRepository = IGenericDomainRepository<DomainProfile>;
