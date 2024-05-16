import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { ToastDemoComponent } from './app/pages/toast-demo/toast-demo.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

// bootstrapApplication(ToastDemoComponent)
//   .catch(err => console.error(err));