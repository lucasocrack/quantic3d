import { Component, Input } from '@angular/core'
import { AsyncPipe } from '@angular/common'
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field'
import { formErrorPipe } from '../../../../pipes/formError.pipe'
import { MatInput } from '@angular/material/input'
import {
  AbstractControl,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatRadioModule } from '@angular/material/radio'
import {
  GenericOptions,
  Question,
  RadioQuestion,
} from '../../../../types/question.types'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-radio-input',
  standalone: true,
  imports: [
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    formErrorPipe,
    MatTooltipModule,
    AsyncPipe,
    MatRadioModule,
  ],
  templateUrl: './radio-input.component.html',
  styleUrls: ['./radio-input.component.scss', '../input-common.scss'],
})
export class RadioInputComponent {
  inputQuestion!: RadioQuestion
  @Input({ required: true }) set question(value: Question) {
    this.inputQuestion = value as RadioQuestion
  }
  formControl!: FormControl
  @Input({ required: true }) set control(value: FormControl | AbstractControl) {
    this.formControl = value as FormControl
  }
  @Input({ required: true }) options!: Observable<GenericOptions[]>
}
