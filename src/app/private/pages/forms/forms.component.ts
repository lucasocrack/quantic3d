import { Component, inject } from '@angular/core'
import { FormService } from '../../../shared/components/form/form.service'
import { FormComponent } from '../../../shared/components/form/form.component'
import { MatCardModule } from '@angular/material/card'
import { of } from 'rxjs'
import {
  GenericOptions,
  Question,
  ValidatorsType,
} from '../../../shared/types/question.types'

const options: GenericOptions[] = [
  { name: 'Alabama', value: 'Alabama' },
  { name: 'Alaska', value: 'Alaska' },
  { name: 'Arizona', value: 'Arizona' },
  { name: 'California', value: 'California' },
  { name: 'Colorado', value: 'Colorado' },
  { name: 'Connecticut', value: 'Connecticut' },
  { name: 'Idaho', value: 'Idaho' },
  { name: 'Illinois', value: 'Illinois' },
  { name: 'Kansas', value: 'Kansas' },
]

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [FormComponent, MatCardModule],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss',
})
export class FormsComponent {
  questions: Question[] = [
    {
      key: 'q1',
      type: 'text',
      label: 'Text Question',
      class: 'col-4',
      validators: [{ type: ValidatorsType.REQUIRED }],
      startIcon: { icon: 'home' },
    },
    {
      key: 'q2',
      type: 'email',
      label: 'Email Question',
      class: 'col-4',
      validators: [{ type: ValidatorsType.EMAIL }],
    },
    {
      key: 'q3',
      type: 'password',
      label: 'Password Question',
      class: 'col-4',
    },
    {
      key: 'q4',
      type: 'autocomplete',
      label: 'Autocomplete Question',
      class: 'col-4',
      isServiceSearch: false,
      options: of(options),
    },
    {
      key: 'q5',
      type: 'autocomplete',
      label: 'Autocomplete Service Question',
      class: 'col-4',
      isServiceSearch: true,
      searchService: (query: string) => {
        return of(
          options.filter((option) =>
            option.value.toLowerCase().includes(query),
          ),
        )
      },
    },
    {
      key: 'q6',
      type: 'select',
      label: 'Select Question',
      class: 'col-4',
      options: of(options),
    },
    {
      key: 'q7',
      type: 'multi-select',
      label: 'Multi Select Question',
      class: 'col-4',
      options: of(options),
      triggerText: false,
    },
    {
      key: 'q8',
      type: 'datepicker',
      label: 'Datepicker Question',
      class: 'col-4',
    },
    {
      key: 'q9',
      type: 'timepicker',
      label: 'Timepicker Question',
      class: 'col-4',
      format: 12,
    },
    {
      key: 'q10',
      type: 'radio',
      label: 'Radio Question',
      class: 'col-4',
      options: of([
        {
          name: 'Option 1',
          value: 'Option 1',
        },
        {
          name: 'Option 2',
          value: 'Option 2',
        },
        {
          name: 'Option 3',
          value: 'Option 3',
        },
        {
          name: 'Option 3',
          value: 'Option 3',
        },
      ]),
    },
    {
      key: 'q11',
      type: 'checkbox',
      label: 'Checkbox Question',
      class: 'col-4',
    },
    {
      key: 'q12',
      type: 'toggle',
      label: 'Toggle Question',
      class: 'col-4',
    },
    {
      key: 'q13',
      type: 'file-upload',
      label: 'Single File Upload Question',
      class: 'col-4',
      multiple: false,
    },
    {
      key: 'q14',
      type: 'multi-file-upload',
      label: 'Multi File Upload Question',
      class: 'col-4',
      multiple: true,
      validators: [{ type: ValidatorsType.FILES_LIMIT, value: 4 }],
    },
    {
      key: 'q15',
      type: 'textarea',
      label: 'Textarea Question',
      class: 'col-4',
      rows: 2,
    },
  ]
  private formService = inject(FormService)
  form = this.formService.createFormGroup(this.questions)
}
