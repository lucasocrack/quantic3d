import { Component, Input } from '@angular/core'
import { CheckboxQuestion, Question } from '../../../../types/question.types'
import {
  AbstractControl,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms'
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field'
import { formErrorPipe } from '../../../../pipes/formError.pipe'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatInput } from '@angular/material/input'
import { MatTooltipModule } from '@angular/material/tooltip'

@Component({
  selector: 'app-checkbox-input',
  standalone: true,
  imports: [
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    formErrorPipe,
    MatTooltipModule,
    MatCheckboxModule,
  ],
  templateUrl: './checkbox-input.component.html',
  styleUrls: ['./checkbox-input.component.scss', '../input-common.scss'],
})
export class CheckboxInputComponent {
  inputQuestion!: CheckboxQuestion
  @Input({ required: true }) set question(value: Question) {
    this.inputQuestion = value as CheckboxQuestion
  }
  formControl!: FormControl
  @Input({ required: true }) set control(value: FormControl | AbstractControl) {
    this.formControl = value as FormControl
  }
}
