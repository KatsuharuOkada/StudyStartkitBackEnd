import { Controller, Get } from '@nestjs/common';
export function createControllerDynamic({ endpoint, isForwardPath }) {
  @Controller(endpoint)
  class GraphiqlExplorerController {
    @Get('/')
    paths() {
      return this.renderPlaygroundHtml();
    }
    @Get('/config')
    config() {
      return {
        endpoint,
      };
    }

    renderPlaygroundHtml() {
      const serverRoot = isForwardPath ? '' : `${endpoint}`;
      return `<!doctype html>
      <html lang="en">
      
      <head>
        <meta charset="utf-8" />
        <link rel="shortcut icon" href="${serverRoot}/favicon.ico" />
        <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no" />
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="${serverRoot}/manifest.json" />
        <title>Graphiql Explorer</title>
        <script defer="defer" src="${serverRoot}/static/js/main.33431090.js"></script>
        <link href="${serverRoot}/static/css/main.60a1b64a.css" rel="stylesheet">
      </head>
      
      <body><noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root"></div>
      </body>
      
      </html>
      
`;
    }
  }
  return GraphiqlExplorerController;
}
