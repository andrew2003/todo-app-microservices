import { ConnectionType } from './types';

export abstract class IDatabaseAdapter {
  abstract getConnection<TConnection>(model: ConnectionType): TConnection;

  abstract getDatabase<TInstance = unknown>(): TInstance;
}
