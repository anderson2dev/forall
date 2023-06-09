import { DomainProfile } from '../entities/profile.model';
import { IGenericDomainRepository } from '../utils/interfaces/domainRepository.interface';

export type ProfileRepository = IGenericDomainRepository<DomainProfile>;
