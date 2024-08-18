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
import { BasicInputComponent } from '../../../../shared/components/form/inputs/basic-input/basic-input.component'
import { PasswordInputComponent } from '../../../../shared/components/form/inputs/password-input/password-input.component'
import { CheckboxInputComponent } from '../../../../shared/components/form/inputs/checkbox-input/checkbox-input.component'
import {
  CheckboxQuestion,
  EmailQuestion,
  PasswordQuestion,
  TextQuestion,
} from '../../../../shared/types/question.types'
import {
  getErrorMessage,
  showErrorMessage,
  showSuccessMessage,
  showWarningMessage,
} from '../../../../shared/helpers/utils.helper'
import { RegisterPayload } from '../../../../shared/types/authentication.types'
import { AuthenticationService } from '../../../services/authentication.service'

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    NgIf,
    BasicInputComponent,
    PasswordInputComponent,
    CheckboxInputComponent,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  public themeService = inject(CustomizerSettingsService)
  authForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    cpfCnpj: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    acceptTerms: new FormControl(false),
  })
  usernameQuestion: TextQuestion = {
    type: 'text',
    key: 'username',
    label: 'Nome de usuário',
    placeholder: 'Insira seu nome de usuário',
  }
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
  cpfCnpjQuestion: TextQuestion = {
    type: 'text',
    key: 'cpfCnpj',
    label: 'CPF ou CNPJ',
    placeholder: 'Insira seu CPF ou CNPJ',
    mask: '000.000.000-00 || ',
  }
  acceptTermsQuestion: CheckboxQuestion = {
    type: 'checkbox',
    key: 'rememberMe',
  }
  isLoading = signal(false)
  private authService = inject(AuthenticationService)
  private router = inject(Router)

  async onSubmit() {
    if (this.authForm.invalid) return

    if (!this.authForm.value.acceptTerms) {
      await showWarningMessage({
        title: 'Atenção',
        text: 'Aceite os termos para continuar',
      })
      return
    }

    const values = this.authForm.value
    const payload: RegisterPayload = {
      email: values.email!,
      password: values.password!,
      terms: values.acceptTerms!,
      username: values.username!,
      cpfCnpj: values.cpfCnpj!,
    }
    this.isLoading.set(true)
    this.authService.register(payload).subscribe({
      next: async () => {
        this.isLoading.set(false)
        await showSuccessMessage({
          title: 'Sucesso!!',
          text: 'Registro feito com sucesso. É preciso ativar a conta para acessá-la, você receberá um email com as instruções.',
        })

        this.router.navigate(['/authentication'])
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
