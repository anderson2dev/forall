export interface IDomainTopicsException {
  topicNotFountException(data: IDomainTopicsException): void;
  topicAlreadyExistsException(data: IDomainTopicsException): void;
  topicUnavailableException(data: IDomainTopicsException): void;
}
