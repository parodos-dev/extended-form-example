import {
  createApiFactory,
  createPlugin,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';
import CustomApi from './customApi';
import { orchestratorFormApiRef } from '@janus-idp/backstage-plugin-orchestrator-form-api';


export const formApiFactory =  createApiFactory({
  api: orchestratorFormApiRef,
  deps: {},
  factory() {
    return new CustomApi();
  },
});

export const testFactoryPlugin = createPlugin({
  id: 'custom-form-example-plugin',
  routes: {
    root: rootRouteRef,
  },
  apis: [
    formApiFactory
  ]
});


