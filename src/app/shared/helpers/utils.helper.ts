/* eslint-disable @typescript-eslint/no-unused-vars */
import { AbstractControl } from '@angular/forms'
import { cnpj, cpf } from 'cpf-cnpj-validator'
import Swal, { SweetAlertResult } from 'sweetalert2'
import { ErrorResponse } from '../types/commom.types'

export class CustomValidations {
  static cpfAndCnpj(controle: AbstractControl) {
    const value = controle.value
    if (value.length <= 11) {
      return cpf.isValid(value) ? null : { invalidCpf: true }
    }
    return cnpj.isValid(value) ? null : { invalidCnpj: true }
  }

  static cpf(controle: AbstractControl) {
    const value = controle.value
    return cpf.isValid(value) ? null : { invalidCpf: true }
  }
}

export const getErrorMessage = (error: ErrorResponse): string => {
  if (typeof error.error === 'string') {
    return error.error
  }

  if (error.error?.exception?.message) {
    return error.error.exception.message
  }

  if (error.error?.message) {
    return error.error.message
  }

  if (error.error?.errors) {
    return error.error.errors[0].message
  }

  return 'Ocorreu um erro incomum'
}

export const showErrorMessage = ({
  title,
  text,
}: {
  title: string
  text?: string
}): Promise<SweetAlertResult> => {
  return Swal.fire({
    title: title,
    text: text,
    icon: 'error',
    showCancelButton: false,
    confirmButtonColor: '#563daa',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ok',
  })
}

export const showWarningMessage = ({
  title,
  text,
}: {
  title: string
  text?: string
}): Promise<SweetAlertResult> => {
  return Swal.fire({
    title: title,
    text: text,
    icon: 'warning',
    showCancelButton: false,
    confirmButtonColor: '#563daa',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ok',
  })
}

export const showConfirmMessage = ({
  title,
  text,
}: {
  title: string
  text?: string
}): Promise<SweetAlertResult> => {
  return Swal.fire({
    title: title,
    text: text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#563daa',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim',
    cancelButtonText: 'Não',
  })
}

export const showSuccessMessage = ({
  title,
  text,
}: {
  title: string
  text?: string
}): Promise<SweetAlertResult> => {
  return Swal.fire({
    title: title,
    text: text,
    icon: 'success',
    showCancelButton: false,
    confirmButtonColor: '#563daa',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ok',
  })
}
