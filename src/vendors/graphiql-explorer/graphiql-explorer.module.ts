import { ConfigurableModuleAsyncOptions, DynamicModule, Module } from '@nestjs/common';
import { ConfigurableModuleClass } from './config.module-definition';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { GraphiQLExplorerModuleOptions } from './interfaces/config-module-options.interface';
import { createControllerDynamic } from './graphiql-explorer.controller';
import { GraphiqlExplorerService } from './graphiql-explorer.service';
@Module({})
export class GraphiQLExplorerModule extends ConfigurableModuleClass {
  /**
   *
   * @param options
   * @default
   * - disabled: false
   * @returns
   */
  static forRootAsync(options: ConfigurableModuleAsyncOptions<GraphiQLExplorerModuleOptions>): DynamicModule {
    // TODO: Need to handle after.
    return [] as any;
  }

  static forRoot(options: GraphiQLExplorerModuleOptions): DynamicModule {
    const opts = Object.assign(
      {
        /**
         * Set default true
         */
        disabled: false,
        renderPath: '/graphql',
        serveRoot: '/graphql',
        isForwardPath: false,
      },
      options
    );
    let controllers = [];
    let modules = [];
    if (!opts.disabled) {
      /**
       * Generate dynamic controller by paths.
       * These controller will be added into module.
       */
      controllers = opts.paths.map(({ endpoint }) =>
        createControllerDynamic({ endpoint: endpoint, isForwardPath: options.isForwardPath })
      );
      modules = opts.paths.map(({ endpoint }) =>
        ServeStaticModule.forRoot({
          renderPath: endpoint,
          serveRoot: endpoint,
          rootPath: join(process.cwd(), 'graphiql-explorer-static'),
        })
      );
    }
    return {
      imports: modules,
      global: true,
      controllers: controllers,
      providers: [
        {
          provide: 'CONFIG_OPTIONS',
          useValue: opts,
        },
        GraphiqlExplorerService,
      ],
      module: GraphiQLExplorerModule,
    };
  }
}
