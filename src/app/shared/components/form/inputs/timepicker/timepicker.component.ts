import { Component, Input } from '@angular/core'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { NgxMaskDirective } from 'ngx-mask'
import {
  AbstractControl,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms'
import { formErrorPipe } from '../../../../pipes/formError.pipe'
import { MatTooltipModule } from '@angular/material/tooltip'
import { Question, TimepickerQuestion } from '../../../../types/question.types'
import { MyErrorStateMatcher } from '../../form.service'
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker'

@Component({
  selector: 'app-timepicker',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    MatTooltipModule,
    formErrorPipe,
    NgxMaterialTimepickerModule,
  ],
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.scss', '../input-common.scss'],
})
export class TimepickerComponent {
  inputQuestion!: TimepickerQuestion
  @Input({ required: true }) set question(value: Question) {
    this.inputQuestion = value as TimepickerQuestion
  }
  formControl!: FormControl
  @Input({ required: true }) set control(value: FormControl | AbstractControl) {
    this.formControl = value as FormControl
  }
  matcher = new MyErrorStateMatcher()
}
