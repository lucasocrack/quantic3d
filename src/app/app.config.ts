import {
  ApplicationConfig,
  DEFAULT_CURRENCY_CODE,
  LOCALE_ID,
  provideZoneChangeDetection,
} from '@angular/core'
import { provideRouter } from '@angular/router'
import { routes } from './app.routes'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { IConfig, provideEnvironmentNgxMask } from 'ngx-mask'
import { registerLocaleData } from '@angular/common'
import ptBr from '@angular/common/locales/pt'
import { authInterceptor } from './core/interceptors/auth.interceptor'

registerLocaleData(ptBr)

const maskConfig: Partial<IConfig> = {
  validation: false,
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([authInterceptor])),
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
    provideEnvironmentNgxMask(maskConfig),
  ],
}
