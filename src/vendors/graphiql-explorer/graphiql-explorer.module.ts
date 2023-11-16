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
        renderPath: '/playground',
        serveRoot: '/playground',
      },
      options
    );
    let controllers = [];
    const modules = [];
    if (!opts.disabled) {
      /**
       * Generate dynamic controller by paths.
       * These controller will be added into module.
       */
      controllers = opts.paths.map(({ endpoint, playground }) =>
        createControllerDynamic({ prefix: `${playground}`, endpoint })
      );
      modules.push(
        ServeStaticModule.forRootAsync({
          useFactory: async () => {
            return [
              {
                renderPath: '/playground',
                serveRoot: '/playground',
                rootPath: join(process.cwd(), 'graphiql-explorer-static'),
                exclude: opts.disabled ? [] : ['/playground/*'],
              },
            ];
          },
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
