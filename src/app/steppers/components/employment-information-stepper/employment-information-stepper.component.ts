import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { banks } from 'src/app/extra/banks';

@Component({
  selector: 'app-employment-information-stepper',
  templateUrl: './employment-information-stepper.component.html',
  styleUrls: ['./employment-information-stepper.component.scss'],
})
export class EmploymentInformationStepperComponent implements OnInit {
  @Output() goNextEmitter = new EventEmitter();
  customActionSheetOptions: any = {
    header: 'Select Bank',
  };
  employmentForm: FormGroup;
  banks = banks.sort((a, b) => a.name.localeCompare(b.name))
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.employmentForm = this.fb.group({
      place_of_work: [null, Validators.required],
      // ippisnumber: [null],
      salary_bank_name: [null, Validators.required],
      salary_bank_account: [null, [Validators.required, this.amountValidator]],
      // hasAgreed: [false, Validators.required]
    })
  }

  amountValidator = (control: FormControl): { [s: string]: boolean } => {
    if (isNaN(control.value)) {
      return { amount: true, error: true };
    }
    return {};
  }

  get formControls() {
    return this.employmentForm.controls
  }

  goToNext() {
    if (this.employmentForm.valid) {
      const formValue = this.employmentForm.value;
      const newFormValue = Object.assign(formValue, {salary_bank_name: formValue.salary_bank_name.bankcode})
      this.goNextEmitter.emit(newFormValue);
    } else {
      Object.values(this.employmentForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  setFocus(nextElement) {
    nextElement.setFocus();
  }

  openSelect(nextElement) {
    nextElement.open();
  }
}
