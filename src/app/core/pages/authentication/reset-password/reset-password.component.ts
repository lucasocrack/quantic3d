import { Component, inject, OnInit, signal } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { ActivatedRoute, Router, RouterLink } from '@angular/router'
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { CustomizerSettingsService } from '../../../../shared/components/customizer-settings/customizer-settings.service'
import { PasswordQuestion } from '../../../../shared/types/question.types'
import { PasswordInputComponent } from '../../../../shared/components/form/inputs/password-input/password-input.component'
import { formErrorPipe } from '../../../../shared/pipes/formError.pipe'
import {
  getErrorMessage,
  showErrorMessage,
  showSuccessMessage,
} from '../../../../shared/helpers/utils.helper'
import { AuthenticationService } from '../../../services/authentication.service'

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    PasswordInputComponent,
    formErrorPipe,
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent implements OnInit {
  public themeService = inject(CustomizerSettingsService)
  form = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    password_confirmation: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  })
  isPassNotMatch = signal(false)
  token = signal('')
  isLoading = signal(false)
  passwordQuestion: PasswordQuestion = {
    type: 'password',
    key: 'password',
    label: 'Senha',
    placeholder: 'Insira sua senha',
  }
  passwordConfirmationQuestion: PasswordQuestion = {
    type: 'password',
    key: 'password-confirmation',
    label: 'Confirmação de senha',
    placeholder: 'Insira a confirmação de senha',
  }
  private authService = inject(AuthenticationService)
  private route = inject(ActivatedRoute)
  private router = inject(Router)

  ngOnInit(): void {
    const token = this.route.snapshot.paramMap.get('token') || ''
    this.token.set(token)
    this.form.valueChanges.subscribe((value) => {
      const passTouched = this.form.controls.password.touched
      const passConfirmTouched =
        this.form.controls.password_confirmation.touched
      this.isPassNotMatch.set(
        passTouched &&
          passConfirmTouched &&
          value.password !== value.password_confirmation,
      )
    })
  }

  onSubmit() {
    if (this.form.invalid) return

    const newPassword = this.form.value.password!
    this.isLoading.set(true)
    this.authService
      .resetPassword({ newPassword, token: this.token() })
      .subscribe({
        next: async () => {
          this.isLoading.set(false)
          await showSuccessMessage({
            title: 'Sucesso!!',
            text: 'Agora voce pode fazer login com a nova senha criada.',
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
