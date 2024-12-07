import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ISecretsAdapter } from './infra/secrets';

// import compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const POSTGRES_URL: string = '';

  // app.use(compression());
  //config db
  const { PORT, POSTGRES_URL } = app.get(ISecretsAdapter);

  await app.listen(PORT ?? 3000);
  console.log(`Server listening at ${PORT}`);
  console.log(`Postgres listening at ${POSTGRES_URL}`);
}

bootstrap();
