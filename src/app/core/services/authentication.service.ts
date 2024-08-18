import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environment/environment'
import {
  Authentication,
  LoginPayload,
  RegisterPayload,
  ResetPasswordPayload,
} from '../../shared/types/authentication.types'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private http = inject(HttpClient)
  private baseUrl = environment.api
  private router = inject(Router)

  login(payload: LoginPayload) {
    return this.http.post<Authentication>(this.baseUrl + '/login', payload)
  }

  register(payload: RegisterPayload) {
    return this.http.post(this.baseUrl + '/register', payload)
  }

  activateAccount(token: string) {
    return this.http.get(this.baseUrl + '/activate', {
      params: {
        token,
      },
    })
  }

  resendActivation(email: string) {
    return this.http.post(this.baseUrl + '/resend-activation', { email })
  }

  forgotPassword(email: string) {
    return this.http.post(this.baseUrl + '/forgot-password', { email })
  }

  resetPassword(payload: ResetPasswordPayload) {
    return this.http.post(this.baseUrl + '/reset-password', payload)
  }

  retrieveUser(): void {
    const token = this.getLocalUser()
    if (token) {
      const currentRoute = window.location.pathname
      if (currentRoute === '/authentication') {
        this.router.navigate(['/'])
      }
      return
    }
    this.router.navigate(['/authentication'])
  }

  setLocalUser(user: Authentication): void {
    localStorage.setItem(
      `${environment.localStorageKey}@user`,
      JSON.stringify(user),
    )
  }

  clearLocalUser(): void {
    localStorage.removeItem(`${environment.localStorageKey}@user`)
  }

  getLocalUser(): Authentication | undefined {
    const stringToken = localStorage.getItem(
      `${environment.localStorageKey}@user`,
    )
    if (stringToken) {
      return JSON.parse(stringToken) as Authentication
    }
    return
  }
}
