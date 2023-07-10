import { DomainTopic } from '../entities/topic.model';
import { IGenericDomainRepository } from '../utils/interfaces/domainRepository.interface';

export type TopicRepository = IGenericDomainRepository<DomainTopic>;
