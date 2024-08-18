import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http'
import { AuthenticationService } from '../services/authentication.service'
import { inject } from '@angular/core'

export const InterceptorSkip = 'X-Skip-Interceptor'
export const InterceptorSkipHeader = new HttpHeaders({
  'X-Skip-Interceptor': '',
})

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthenticationService)
  if (req.headers && req.headers.has(InterceptorSkip)) {
    const headers = req.headers.delete(InterceptorSkip)
    return next(req.clone({ headers }))
  }
  const token = authService.getLocalUser()
  if (token) {
    const authRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token.access_token}`,
      },
    })
    return next(authRequest)
  }
  return next(req)
}
