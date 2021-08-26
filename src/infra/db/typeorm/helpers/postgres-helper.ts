import { createConnection, Connection, ConnectionOptions } from 'typeorm';
export const PostgresHelper = {
  client: null as unknown as Connection,
  async connect(config: ConnectionOptions): Promise<void> {
    this.client = await createConnection(config);
  },

  async clear(): Promise<void> {
    const entities = this.client.entityMetadatas;
    entities.forEach(async (entity) => {
      const repository = this.client.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.name}`);
    });
  },
};
