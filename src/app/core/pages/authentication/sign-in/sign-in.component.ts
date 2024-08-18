import { Component, inject, signal } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { Router, RouterLink } from '@angular/router'
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { NgIf } from '@angular/common'
import { CustomizerSettingsService } from '../../../../shared/components/customizer-settings/customizer-settings.service'
import { CheckboxInputComponent } from '../../../../shared/components/form/inputs/checkbox-input/checkbox-input.component'
import {
  CheckboxQuestion,
  EmailQuestion,
  PasswordQuestion,
} from '../../../../shared/types/question.types'
import { BasicInputComponent } from '../../../../shared/components/form/inputs/basic-input/basic-input.component'
import { PasswordInputComponent } from '../../../../shared/components/form/inputs/password-input/password-input.component'
import { AuthenticationService } from '../../../services/authentication.service'
import {
  getErrorMessage,
  showErrorMessage,
  showSuccessMessage,
} from '../../../../shared/helpers/utils.helper'

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    NgIf,
    CheckboxInputComponent,
    BasicInputComponent,
    PasswordInputComponent,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  public themeService = inject(CustomizerSettingsService)
  authForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    rememberMe: new FormControl(false),
  })
  emailQuestion: EmailQuestion = {
    type: 'email',
    key: 'email',
    label: 'Email',
    placeholder: 'Insira seu email',
  }
  passwordQuestion: PasswordQuestion = {
    type: 'password',
    key: 'password',
    label: 'Senha',
    placeholder: 'Insira sua senha',
  }
  rememberMeQuestion: CheckboxQuestion = {
    type: 'checkbox',
    key: 'rememberMe',
    label: 'Lembre de mim',
  }
  isLoading = signal(false)
  private authService = inject(AuthenticationService)
  private router = inject(Router)

  async onSubmit() {
    if (this.authForm.invalid) return
    const { email, password } = this.authForm.value
    const payload = {
      identifier: email!,
      password: password!,
    }
    this.isLoading.set(true)
    this.authService.login(payload).subscribe({
      next: async (res) => {
        this.isLoading.set(false)
        this.authService.setLocalUser(res)
        await showSuccessMessage({
          title: 'Sucesso!!',
          text: 'Login feito com sucesso',
        })
        this.router.navigate(['/'])
      },
      error: async (err) => {
        this.isLoading.set(false)
        await showErrorMessage({
          title: 'Erro',
          text: getErrorMessage(err),
        })
      },
    })
  }
}
