import { Component, Input, OnInit } from '@angular/core'
import {
  GenericOptions,
  MultiSelectQuestion,
  Question,
} from '../../../../types/question.types'
import {
  AbstractControl,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms'
import { Observable } from 'rxjs'
import { MyErrorStateMatcher } from '../../form.service'
import { AsyncPipe } from '@angular/common'
import { MatSelectModule } from '@angular/material/select'
import { formErrorPipe } from '../../../../pipes/formError.pipe'
import { NgxMaskDirective } from 'ngx-mask'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field'
import { MatInput } from '@angular/material/input'

@Component({
  selector: 'app-multi-select-input',
  standalone: true,
  imports: [
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    NgxMaskDirective,
    ReactiveFormsModule,
    formErrorPipe,
    MatTooltipModule,
    MatSelectModule,
    AsyncPipe,
  ],
  templateUrl: './multi-select-input.component.html',
  styleUrls: ['./multi-select-input.component.scss', '../input-common.scss'],
})
export class MultiSelectInputComponent implements OnInit {
  inputQuestion!: MultiSelectQuestion
  @Input({ required: true }) set question(value: Question) {
    this.inputQuestion = value as MultiSelectQuestion
  }
  formControl!: FormControl
  @Input({ required: true }) set control(value: FormControl | AbstractControl) {
    this.formControl = value as FormControl
  }
  @Input({ required: true }) options!: Observable<GenericOptions[]>
  matcher = new MyErrorStateMatcher()
  ngOnInit(): void {
    this.formControl.valueChanges.subscribe((value) => {
      console.log(value)
    })
  }
}
