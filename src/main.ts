import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideNgxStripe } from 'ngx-stripe';

bootstrapApplication(AppComponent,{ ...appConfig, providers: [ ...(appConfig.providers ?? []),
    provideNgxStripe('pk_test_51RlKmTBOeTtUmvPXGlPOnd1f21MDrHYboXq7UhsTXjAY0wskWgbfodQOP7U5BPrRytbwenRcsffZoJunriW6z8KI000jCK9Agi') // Your Stripe publishable key
  ]})
  .catch((err) => console.error(err));
