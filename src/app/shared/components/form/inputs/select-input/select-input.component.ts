import { Component, Input } from '@angular/core'
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field'
import { MatInput } from '@angular/material/input'
import {
  AbstractControl,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms'
import { formErrorPipe } from '../../../../pipes/formError.pipe'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatSelectModule } from '@angular/material/select'
import { MyErrorStateMatcher } from '../../form.service'
import { AsyncPipe } from '@angular/common'
import { Observable } from 'rxjs'
import {
  GenericOptions,
  Question,
  SelectQuestion,
} from '../../../../types/question.types'

@Component({
  selector: 'app-select-input',
  standalone: true,
  imports: [
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    formErrorPipe,
    MatTooltipModule,
    MatSelectModule,
    AsyncPipe,
  ],
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss', '../input-common.scss'],
})
export class SelectInputComponent {
  inputQuestion!: SelectQuestion
  @Input({ required: true }) set question(value: Question) {
    this.inputQuestion = value as SelectQuestion
  }
  formControl!: FormControl
  @Input({ required: true }) set control(value: FormControl | AbstractControl) {
    this.formControl = value as FormControl
  }
  @Input({ required: true }) options!: Observable<GenericOptions[]>
  matcher = new MyErrorStateMatcher()
}
