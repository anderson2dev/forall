export interface IGenericDomainRepository<T> {
  findAll(): Promise<T[]>;
  findOne(id: string): Promise<T>;
  delete(id: string): Promise<void>;
  update(id: string, updateObj: Partial<T>): Promise<void>;
  insert(entity: T): Promise<void>;
}
