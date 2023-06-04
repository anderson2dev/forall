import { DomainTopic } from '../entities/topic.model';
import { IGenericDomainRepository } from './domainRepository.interface';

export type TopicRepository = IGenericDomainRepository<DomainTopic>;
