import { Observable } from 'rxjs'
import { DestroyRef } from '@angular/core'

export enum QuestionType {
  TEXT = 'text',
  NUMBER = 'number',
  EMAIL = 'email',
  AUTOCOMPLETE = 'autocomplete',
  PASSWORD = 'password',
  SELECT = 'select',
  TEXTAREA = 'textarea',
  MULTI_SELECT = 'multi-select',
  RADIO = 'radio',
  CHECKBOX = 'checkbox',
  TOGGLE = 'toggle',
  FILE_UPLOAD = 'file-upload',
  MULTI_FILE_UPLOAD = 'multi-file-upload',
  DATEPICKER = 'datepicker',
  TIMEPICKER = 'timepicker',
  // Later
  // MULTI_AUTOCOMPLETE = 'multi-autocomplete',
  // CHIP_AUTOCOMPLETE = 'chip-autocomplete',
  // CHIP = 'chip',
}

export enum ValidatorsType {
  REQUIRED = 'required',
  EMAIL = 'email',
  MIN = 'min',
  MAX = 'max',
  FILES_LIMIT = 'files-limit',
}

export type QuestionValidators = {
  type: ValidatorsTypeValues
  value?: string | number
}

export type QuestionIcon = {
  icon: string
  tooltip?: string
  color?: string
}

export type SearchAutocomplete =
  | {
      isServiceSearch: true
      searchService: SearchService
      destroyRef: DestroyRef
      minLength?: number
      debounce?: number
    }
  | {
      isServiceSearch: false
      destroyRef: DestroyRef
      minLength?: number
      debounce?: number
      options: Observable<GenericOptions[]>
    }

export type GenericOptions = {
  value: string
  name: string
  [key: string]: unknown
}

export type SearchService = (query: string) => Observable<GenericOptions[]>

export type ValidatorsTypeValues = `${ValidatorsType}`

type BaseQuestion = {
  key: string
  class?: string
  inputTooltip?: string
  label?: string
  inputClass?: string
  hint?: string
  validators?: QuestionValidators[]
  isDisabled?: boolean
  value?: string | number | string[]
  pattern?: RegExp
}

export type AutocompleteQuestion = BaseQuestion & {
  type: 'autocomplete'
  placeholder?: string
  startIcon?: QuestionIcon
  endIcon?: QuestionIcon
} & (
    | {
        isServiceSearch: true
        searchService: SearchService
      }
    | {
        isServiceSearch: false
        options: Observable<GenericOptions[]>
      }
  )

export type TextQuestion = BaseQuestion & {
  type: 'text'
  mask?: string
  startIcon?: QuestionIcon
  endIcon?: QuestionIcon
  prefix?: string
  suffix?: string
  minlength?: number
  maxlength?: number
  placeholder?: string
}

export type NumberQuestion = TextQuestion

export type PasswordQuestion = BaseQuestion & {
  type: 'password'
  startIcon?: QuestionIcon
  minlength?: number
  maxlength?: number
  placeholder?: string
}

export type SelectQuestion = BaseQuestion & {
  type: 'select'
  endIcon?: QuestionIcon
  startIcon?: QuestionIcon
  options: Observable<GenericOptions[]>
  placeholder?: string
}

export type EmailQuestion = BaseQuestion & {
  type: 'email'
  startIcon?: QuestionIcon
  endIcon?: QuestionIcon
  placeholder?: string
}

export type MultiSelectQuestion = BaseQuestion & {
  type: 'multi-select'
  startIcon?: QuestionIcon
  endIcon?: QuestionIcon
  options: Observable<GenericOptions[]>
  triggerText: boolean
  placeholder?: string
}

export type TextareaQuestion = BaseQuestion & {
  type: 'textarea'
  startIcon?: QuestionIcon
  endIcon?: QuestionIcon
  minlength?: number
  maxlength?: number
  rows?: number
  placeholder?: string
}

export type RadioQuestion = BaseQuestion & {
  type: 'radio'
  options: Observable<GenericOptions[]>
  alignType?: 'row' | 'column'
}

export type CheckboxQuestion = BaseQuestion & {
  type: 'checkbox'
}

export type ToggleQuestion = BaseQuestion & {
  type: 'toggle'
}

export type FileQuestion = BaseQuestion & {
  type: 'file-upload' | 'multi-file-upload'
  multiple: boolean
}

export type DatepickerQuestion = BaseQuestion & {
  type: 'datepicker'
  mask?: string
  startIcon?: QuestionIcon
  placeholder?: string
}

export type TimepickerQuestion = BaseQuestion & {
  type: 'timepicker'
  startIcon?: QuestionIcon
  placeholder?: string
  format?: 12 | 24
}

export type Question =
  | TextQuestion
  | PasswordQuestion
  | AutocompleteQuestion
  | SelectQuestion
  | EmailQuestion
  | MultiSelectQuestion
  | NumberQuestion
  | TextareaQuestion
  | RadioQuestion
  | CheckboxQuestion
  | ToggleQuestion
  | FileQuestion
  | DatepickerQuestion
  | TimepickerQuestion

/*
type BaseQuestion = {
  key: string
  type: QuestionTypeValues
  class: string
  startIcon?: QuestionIcon
  inputTooltip?: string
  placeholder?: string
  label?: string
  inputClass?: string
  hint?: string
  validators?: QuestionValidators[]
  isDisabled?: boolean
  value?: string | number
  pattern?: RegExp
  endIcon?: QuestionIcon
  prefix?: string
  suffix?: string
  minlength?: number
  maxlength?: number
  searchService?: SearchService
  isServiceSearch?: boolean
  options?: Observable<GenericOptions[]>
}
 */
