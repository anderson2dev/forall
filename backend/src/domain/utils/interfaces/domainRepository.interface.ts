type genericDomainEntity = {
  id: string;
};

export interface IGenericDomainRepository<T extends genericDomainEntity> {
  findAll(): Promise<T[]>;
  findOne(id: string): Promise<T | NonNullable<Partial<T>>>;
  delete(id: string): Promise<Partial<T> | undefined>;
  update(
    id: string,
    updateObj: NonNullable<Partial<T>>,
  ): Promise<Partial<T> | undefined>;
  insert(entity: T): Promise<Partial<T> | undefined>;
}
