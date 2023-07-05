type genericDomainEntity = {
  id: string;
};

export interface IGenericDomainRepository<T extends genericDomainEntity> {
  findAll(
    queryObj?: Omit<NonNullable<Partial<T>>, 'id'>,
    select?: any,
    size?: number,
  ): Promise<T[] | NonNullable<Partial<T>>[]>;
  findOne(id: string): Promise<T | NonNullable<Partial<T>>>;
  delete(id: string): Promise<void>;
  update(id: string, updateObj: NonNullable<Partial<T>>): Promise<void>;
  insert(entity: T): Promise<void>;
}
