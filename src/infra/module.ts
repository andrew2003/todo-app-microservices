import { Module } from '@nestjs/common';

import { PostgresDatabaseModule } from './database/postgres/module';
import { SecretsModule } from './secrets';

@Module({
  imports: [SecretsModule, PostgresDatabaseModule],
})
export class InfraModule {}
