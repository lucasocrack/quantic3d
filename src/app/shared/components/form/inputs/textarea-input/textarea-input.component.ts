import { Component, Input } from '@angular/core'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import {
  AbstractControl,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms'
import { formErrorPipe } from '../../../../pipes/formError.pipe'
import { Question, TextareaQuestion } from '../../../../types/question.types'
import { MyErrorStateMatcher } from '../../form.service'
import { MatTooltipModule } from '@angular/material/tooltip'

@Component({
  selector: 'app-textarea-input',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTooltipModule,
    formErrorPipe,
  ],
  templateUrl: './textarea-input.component.html',
  styleUrls: ['./textarea-input.component.scss', '../input-common.scss'],
})
export class TextareaInputComponent {
  inputQuestion!: TextareaQuestion
  @Input({ required: true }) set question(value: Question) {
    this.inputQuestion = value as TextareaQuestion
  }
  formControl!: FormControl
  @Input({ required: true }) set control(value: FormControl | AbstractControl) {
    this.formControl = value as FormControl
  }
  matcher = new MyErrorStateMatcher()
}
