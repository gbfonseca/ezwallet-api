import { createConnection, Connection, ConnectionOptions } from 'typeorm';
export const TypeormHelper = {
  client: null as unknown as Connection,
  async connect(config: ConnectionOptions): Promise<void> {
    this.client = await createConnection(config);
  },

  async clear(): Promise<void> {
    const entities = this.client.entityMetadatas;
    entities.forEach(async (entity) => {
      const repository = this.client.getRepository(entity.name);
      await repository.query(`DELETE FROM '${entity.name}'`);
    });
  },

  // async save<T>(entity: EntityTarget<T>, data: T): Promise<T> {
  //   const repository = getRepository(entity);
  //   return await repository.save(data);
  // },
};
