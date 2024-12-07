import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { z, ZodError, ZodIssue } from 'zod';

import { ApiInternalServerException } from '../../utils/exception';
import { ZodInferSchema } from '../../utils/types';

// import { LogLevelEnum } from '../logger';
import { ISecretsAdapter } from './adapter';
import { SecretsService } from './service';

// import { EnvEnum } from './types';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
  ],
  providers: [
    {
      provide: ISecretsAdapter,
      useFactory: (config: ConfigService) => {
        const SecretsSchema = z.object<ZodInferSchema<ISecretsAdapter>>({
          IS_LOCAL: z.boolean(),
          IS_PRODUCTION: z.boolean(),
          POSTGRES_URL: z.string().url(),
          // POSTGRES: z.object({
          //   POSTGRES_URL: ,
          //   POSTGRES_PGADMIN_URL: z.string().url(),
          // }),
          PORT: z
            .number()
            .or(z.string())
            .transform((p) => Number(p)),
        });
        const secret = new SecretsService(config);

        try {
          SecretsSchema.parse(secret);
        } catch (error) {
          const zodError = error as ZodError;
          const message = zodError.issues
            .map(
              (i: ZodIssue) =>
                `${SecretsService.name}.${i.path.join('.')}: ${i.message}`,
            )
            .join(',');
          throw new ApiInternalServerException(message);
        }

        return SecretsSchema.parse(secret);
      },
      inject: [ConfigService],
    },
  ],
  exports: [ISecretsAdapter],
})
export class SecretsModule {}
