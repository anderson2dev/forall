export interface DataBaseConfig {
  getDatabaseHost(): string;
  getDatabaseUser(): string;
  getDatabasePassword(): string;
  getDatabasePort(): number;
  getDatabaseName(): string;
  getDatabaseSchema(): string;
  getDatabaseSync(): boolean;
}
