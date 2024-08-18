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
import { CustomizerSettingsService } from '../../../../shared/components/customizer-settings/customizer-settings.service'
import { BasicInputComponent } from '../../../../shared/components/form/inputs/basic-input/basic-input.component'
import { EmailQuestion } from '../../../../shared/types/question.types'
import { AuthenticationService } from '../../../services/authentication.service'
import {
  getErrorMessage,
  showErrorMessage,
  showSuccessMessage,
} from '../../../../shared/helpers/utils.helper'

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    BasicInputComponent,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  public themeService = inject(CustomizerSettingsService)
  isLoading = signal(false)
  forgotPassForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  })
  emailQuestion: EmailQuestion = {
    type: 'email',
    key: 'email',
    label: 'Email',
    placeholder: 'Insira seu email',
  }
  private authService = inject(AuthenticationService)
  private router = inject(Router)

  onSubmit() {
    if (this.forgotPassForm.invalid) return

    const email = this.forgotPassForm.value.email!
    this.isLoading.set(true)
    this.authService.forgotPassword(email).subscribe({
      next: async () => {
        this.isLoading.set(false)
        await showSuccessMessage({
          title: 'Sucesso!!',
          text: 'Se você tem uma conta com esse email, foi enviado um novo link para prosseguir com a recuperação de senha.',
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
