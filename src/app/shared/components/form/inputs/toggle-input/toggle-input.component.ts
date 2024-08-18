import { Component, Input } from '@angular/core'
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field'
import { formErrorPipe } from '../../../../pipes/formError.pipe'
import { Question, ToggleQuestion } from '../../../../types/question.types'
import {
  AbstractControl,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms'
import { MatInput } from '@angular/material/input'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'

@Component({
  selector: 'app-toggle-input',
  standalone: true,
  imports: [
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    formErrorPipe,
    MatTooltipModule,
    MatSlideToggleModule,
  ],
  templateUrl: './toggle-input.component.html',
  styleUrl: './toggle-input.component.scss',
})
export class ToggleInputComponent {
  inputQuestion!: ToggleQuestion
  @Input({ required: true }) set question(value: Question) {
    this.inputQuestion = value as ToggleQuestion
  }
  formControl!: FormControl
  @Input({ required: true }) set control(value: FormControl | AbstractControl) {
    this.formControl = value as FormControl
  }
}
