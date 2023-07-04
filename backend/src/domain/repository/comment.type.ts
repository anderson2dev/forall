import { DomainComment } from '../entities/comment.model';
import { IGenericDomainRepository } from '../utils/interfaces/domainRepository.interface';

export type CommentRepository = IGenericDomainRepository<DomainComment>;
