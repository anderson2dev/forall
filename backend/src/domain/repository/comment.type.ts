import { DomainComment } from '../entities/comment.model';
import { IGenericDomainRepository } from './domainRepository.interface';

export type CommentRepository = IGenericDomainRepository<DomainComment>;
