import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// import { name } from '../../../../package.json';
import { IDatabaseAdapter } from '../adapter';
import { ConnectionType } from '../types';

export class PostgresService implements Partial<IDatabaseAdapter> {
  getConnection<TOpt = TypeOrmModuleOptions & { url: string }>({
    URI,
  }: ConnectionType): TOpt {
    return {
      type: 'postgres',
      url: URI,
      database: 'postgres',
    } as TOpt;
  }
}
