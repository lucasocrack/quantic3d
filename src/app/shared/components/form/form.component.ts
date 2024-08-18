import { FormService } from './form.service'
import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { BasicInputComponent } from './inputs/basic-input/basic-input.component'
import { PasswordInputComponent } from './inputs/password-input/password-input.component'
import { AutocompleteInputComponent } from './inputs/autocomplete-input/autocomplete-input.component'
import { Observable, of } from 'rxjs'
import { SelectInputComponent } from './inputs/select-input/select-input.component'
import {
  GenericOptions,
  Question,
  QuestionType,
  SearchAutocomplete,
  SearchService,
} from '../../types/question.types'
import { MultiSelectInputComponent } from './inputs/multi-select-input/multi-select-input.component'
import { TextareaInputComponent } from './inputs/textarea-input/textarea-input.component'
import { RadioInputComponent } from './inputs/radio-input/radio-input.component'
import { CheckboxInputComponent } from './inputs/checkbox-input/checkbox-input.component'
import { ToggleInputComponent } from './inputs/toggle-input/toggle-input.component'
import { FileUploaderComponent } from './inputs/file-uploader/file-uploader.component'
import { DatepickerComponent } from './inputs/datepicker/datepicker.component'
import { TimepickerComponent } from './inputs/timepicker/timepicker.component'

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    BasicInputComponent,
    PasswordInputComponent,
    AutocompleteInputComponent,
    SelectInputComponent,
    MultiSelectInputComponent,
    TextareaInputComponent,
    RadioInputComponent,
    CheckboxInputComponent,
    ToggleInputComponent,
    FileUploaderComponent,
    DatepickerComponent,
    TimepickerComponent,
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  private formService = inject(FormService)
  private destroyRef = inject(DestroyRef)

  @Input({ required: true }) questions!: Question[]
  @Input({ required: true }) form!: FormGroup<{ [key: string]: FormControl }>
  types = QuestionType
  autocompleteServices: {
    [key: string]: Observable<GenericOptions[]>
  } = {}

  ngOnInit(): void {
    this.questions.forEach((question) => {
      if (question.type === QuestionType.AUTOCOMPLETE) {
        const params: SearchAutocomplete = question.isServiceSearch
          ? {
              isServiceSearch: true,
              searchService: question.searchService as SearchService,
              destroyRef: this.destroyRef,
            }
          : {
              isServiceSearch: false,
              options: question.options || of([]),
              destroyRef: this.destroyRef,
            }

        const formControl = this.form.get(question.key)

        if (!formControl) return

        this.autocompleteServices[question.key] = formControl.valueChanges.pipe(
          this.formService.searchAutocomplete(params),
        )
      }
    })
  }
}
