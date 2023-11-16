import { ConfigurableModuleBuilder } from '@nestjs/common';
import { GraphiQLExplorerModuleOptions } from './interfaces/config-module-options.interface';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<GraphiQLExplorerModuleOptions>().build();
