import '@abraham/reflection';
import { RootModule } from './root.module';
import { createAppBuilder } from '@altv-mango/client';
import { MAIN_WEBVIEW } from '@shared';

const appBuilder = await createAppBuilder();
appBuilder.addWebView(MAIN_WEBVIEW, { url: '__WEBVIEW_URL__', visible: true });
const app = await appBuilder.build();
await app.start(RootModule);
