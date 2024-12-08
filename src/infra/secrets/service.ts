import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ISecretsAdapter } from './adapter';
import { EnvEnum } from './types';

@Injectable()
export class SecretsService implements ISecretsAdapter {
  constructor(private readonly config: ConfigService) {}

  PORT = this.config.get<number>('PORT') as number;
  IS_LOCAL = this.config.get<EnvEnum>('NODE_ENV') === EnvEnum.LOCAL;
  IS_PRODUCTION = this.config.get<EnvEnum>('NODE_ENV') === EnvEnum.PRD;
  POSTGRES_URL = `postgresql://${this.config.get('POSTGRES_USER')}:${this.config.get(
    'POSTGRES_PASSWORD',
  )}@${this.config.get('POSTGRES_HOST')}:${this.config.get('POSTGRES_PORT')}/${this.config.get('POSTGRES_DATABASE')}`;
}
