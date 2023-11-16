import { ServeStaticModuleOptions } from '@nestjs/serve-static';

type Path = {
  endpoint: string;
  playground: string;
};
export type GraphiQLExplorerModuleOptions = ServeStaticModuleOptions & {
  /**
   * Enabled playground
   * @default false
   */
  disabled: boolean;
  /**
   * Paths graphql
   */
  paths: Path[];
};
