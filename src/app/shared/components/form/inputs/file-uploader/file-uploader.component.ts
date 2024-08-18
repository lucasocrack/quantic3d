import { Component, Input, OnInit } from '@angular/core'
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field'
import { formErrorPipe } from '../../../../pipes/formError.pipe'
import { FileUploadModule } from '@iplab/ngx-file-upload'
import {
  AbstractControl,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms'
import { MatTooltipModule } from '@angular/material/tooltip'
import { FileQuestion, Question } from '../../../../types/question.types'
import { MyErrorStateMatcher } from '../../form.service'

@Component({
  selector: 'app-file-uploader',
  standalone: true,
  imports: [
    MatError,
    MatFormField,
    MatLabel,
    ReactiveFormsModule,
    formErrorPipe,
    MatTooltipModule,
    FileUploadModule,
  ],
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss', '../input-common.scss'],
})
export class FileUploaderComponent implements OnInit {
  inputQuestion!: FileQuestion
  @Input({ required: true }) set question(value: Question) {
    this.inputQuestion = value as FileQuestion
  }
  formControl!: FormControl
  @Input({ required: true }) set control(value: FormControl | AbstractControl) {
    this.formControl = value as FormControl
  }
  matcher = new MyErrorStateMatcher()

  ngOnInit(): void {
    this.formControl.valueChanges.subscribe((value) => {
      console.log(value)
    })
  }
}
