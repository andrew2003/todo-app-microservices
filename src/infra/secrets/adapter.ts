export abstract class ISecretsAdapter {
  PORT!: number | string;

  POSTGRES_URL!: string;

  IS_LOCAL!: boolean;

  IS_PRODUCTION!: boolean;
}
