import { CanActivateFn, Router } from '@angular/router'
import { AuthenticationService } from '../services/authentication.service'
import { inject } from '@angular/core'
import { showErrorMessage } from '../../shared/helpers/utils.helper'

export const authGuard: CanActivateFn = (_route, _state) => {
  const authService = inject(AuthenticationService)
  const router = inject(Router)
  const token = authService.getLocalUser()
  if (!token) {
    showErrorMessage({
      title: 'Erro',
      text: 'Você não está mais autenticado, entre novamente',
    })
    router.navigate(['/authentication'])
  }
  return true
}
