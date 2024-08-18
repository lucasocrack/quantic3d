import { Injectable } from '@angular/core'
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ValidatorFn,
  Validators,
} from '@angular/forms'
import { ErrorStateMatcher } from '@angular/material/core'
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  of,
  switchMap,
} from 'rxjs'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import {
  GenericOptions,
  Question,
  QuestionValidators,
  SearchAutocomplete,
  ValidatorsType,
} from '../../types/question.types'
import { FileUploadValidators } from '@iplab/ngx-file-upload'

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null,
  ): boolean {
    const isSubmitted = form?.submitted
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    )
  }
}

@Injectable({
  providedIn: 'root',
})
export class FormService {
  createFormGroup(questions: Question[]) {
    const group: { [key: string]: FormControl } = {}
    for (const question of questions) {
      const value = question.value ? question.value : null
      group[question.key] = new FormControl(
        { value, disabled: !!question.isDisabled },
        this.getValidators(question.validators),
      )
    }
    return new FormGroup(group)
  }

  getValidators(validators?: QuestionValidators[]) {
    if (!validators) return []

    const validatorsGroup: ValidatorFn[] = []

    for (const validator of validators) {
      switch (validator.type) {
        case ValidatorsType.REQUIRED: {
          validatorsGroup.push(Validators.required)
          break
        }
        case ValidatorsType.MAX: {
          const value = Number(validator.value)
          validatorsGroup.push(Validators.max(value || 100))
          break
        }
        case ValidatorsType.MIN: {
          const value = Number(validator.value)
          validatorsGroup.push(Validators.min(value || 0))
          break
        }
        case ValidatorsType.EMAIL: {
          validatorsGroup.push(Validators.email)
          break
        }
        case ValidatorsType.FILES_LIMIT: {
          const value = Number(validator.value)
          validatorsGroup.push(FileUploadValidators.filesLimit(value || 1))
          break
        }
        default:
          break
      }
    }

    return validatorsGroup
  }

  searchAutocomplete(params: SearchAutocomplete) {
    return (source: Observable<string>): Observable<GenericOptions[]> => {
      const minLength = params.minLength ?? 3
      return source.pipe(
        debounceTime(params.debounce ?? 300),
        distinctUntilChanged(),
        filter((query) => !!query && query.length >= minLength),
        switchMap((query) => {
          if (!params.isServiceSearch) {
            const filterOptions = params.options.pipe(
              map((options) =>
                options.filter((option) =>
                  option.value.toLowerCase().includes(query),
                ),
              ),
            )
            return filterOptions
          }
          return params.searchService(query).pipe(
            catchError((error) => {
              console.error(error)
              return of([])
            }),
          )
        }),
        takeUntilDestroyed(params.destroyRef),
      )
    }
  }
}
