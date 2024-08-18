import { Component, forwardRef, Input } from '@angular/core'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask'
import {
  AbstractControl,
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms'
import { formErrorPipe } from '../../../../pipes/formError.pipe'
import { MatTooltipModule } from '@angular/material/tooltip'
import { DatepickerQuestion, Question } from '../../../../types/question.types'
import { MyErrorStateMatcher } from '../../form.service'
import {
  MatDatepickerInputEvent,
  MatDatepickerModule,
} from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'
import moment from 'moment'

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DatepickerComponent),
  multi: true,
}

@Component({
  selector: 'app-datepicker',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    MatTooltipModule,
    formErrorPipe,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
  ],
  providers: [provideNgxMask(), CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss', '../input-common.scss'],
})
export class DatepickerComponent {
  inputQuestion!: DatepickerQuestion
  @Input({ required: true }) set question(value: Question) {
    this.inputQuestion = value as DatepickerQuestion
  }
  formControl!: FormControl
  @Input({ required: true }) set control(value: FormControl | AbstractControl) {
    this.formControl = value as FormControl
  }
  matcher = new MyErrorStateMatcher()
  dateValue!: Date
  dateString!: string

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    const date = event.value
    if (date) {
      this.dateValue = date
      this.dateString = moment(date).format('DD/MM/YYYY')
      this.formControl.setValue(this.dateValue)
    }
  }

  onInputChange(value: string) {
    this.dateString = value
    const parsedDate = this.parseDate(value)
    const momentDate = this.momentParseDate(parsedDate)
    if (momentDate.isValid()) {
      this.dateValue = momentDate.toDate()
      this.formControl.setErrors(null)
      this.formControl.setValue(this.dateValue)
      return
    }

    if (value.length === 8) {
      this.formControl.setValue(null)
      this.formControl.setErrors({ matDatepickerParse: true })
    }
  }

  onBlur() {
    this.formControl.markAsTouched()
    const parsedDate = this.parseDate(this.dateString)
    const momentDate = this.momentParseDate(parsedDate)
    if (!momentDate.isValid()) {
      this.formControl.setValue(null)
      this.formControl.setErrors({ matDatepickerParse: true })
    }
  }

  parseDate(value?: string) {
    if (!value) return ''
    return value.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3')
  }

  momentParseDate(value: string) {
    return moment(value, 'DD/MM/YYYY', true)
  }
}
