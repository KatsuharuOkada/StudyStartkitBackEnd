import { ServeStaticModuleOptions } from '@nestjs/serve-static';

type Path = {
  endpoint: string;
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
  isForwardPath: boolean;
};
