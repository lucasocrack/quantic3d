import { Component, inject, OnInit, signal } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { ActivatedRoute, Router, RouterLink } from '@angular/router'
import { AuthenticationService } from '../../../services/authentication.service'
import { EmailQuestion } from '../../../../shared/types/question.types'
import { FormControl, Validators } from '@angular/forms'
import {
  getErrorMessage,
  showErrorMessage,
  showSuccessMessage,
} from '../../../../shared/helpers/utils.helper'
import { BasicInputComponent } from '../../../../shared/components/form/inputs/basic-input/basic-input.component'
import { HttpErrorResponse } from '@angular/common/http'

@Component({
  selector: 'app-confirm-email',
  standalone: true,
  imports: [RouterLink, MatButtonModule, BasicInputComponent],
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.scss',
})
export class ConfirmEmailComponent implements OnInit {
  isLoading = signal(true)
  isLoadingSend = signal(false)
  isActivated = signal(false)
  email = new FormControl('', [Validators.required, Validators.email])
  emailQuestion: EmailQuestion = {
    type: 'email',
    key: 'email',
    label: 'Email',
    placeholder: 'Insira seu email',
  }
  private authService = inject(AuthenticationService)
  private route = inject(ActivatedRoute)
  private router = inject(Router)

  ngOnInit(): void {
    const token = this.route.snapshot.paramMap.get('token')
    console.log(token)
    if (!token) {
      this.isLoading.set(false)
    }

    this.authService.activateAccount(token!).subscribe({
      next: async () => {
        this.isLoading.set(false)
        this.isActivated.set(true)
      },
      error: async (error: HttpErrorResponse) => {
        this.isLoading.set(false)

        if (error.status !== 401) {
          await showErrorMessage({
            title: 'Erro',
            text: getErrorMessage(error),
          })
          return
        }

        this.isActivated.set(false)
      },
    })
  }

  resendActivation() {
    if (this.email.invalid) return

    const email = this.email.value!
    this.isLoadingSend.set(true)
    this.authService.resendActivation(email).subscribe({
      next: async () => {
        this.isLoadingSend.set(false)
        await showSuccessMessage({
          title: 'Sucesso!!',
          text: 'Se você tem uma conta pendente com esse email, foi enviado um novo link de ativação.',
        })

        this.router.navigate(['/authentication'])
      },
      error: async (err) => {
        this.isLoadingSend.set(false)
        await showErrorMessage({
          title: 'Erro',
          text: getErrorMessage(err),
        })
      },
    })
  }
}
