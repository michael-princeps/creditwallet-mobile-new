import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tenors } from 'src/app/extra/duration';

@Component({
  selector: 'stepper-two',
  templateUrl: './stepper-two.component.html',
  styleUrls: ['./stepper-two.component.scss'],
})
export class StepperTwoComponent implements OnInit {
  @Output() goNextEmitter = new EventEmitter();
  loanForm: FormGroup;
  customActionSheetOptions: any = {
    header: 'Select duration',
  };
  tenors = tenors.sort((a, b) => a.label.localeCompare(b.label))
  showValue = 'no';
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.loanForm = this.fb.group({
      ippis_number: [null],
    })
  }

  get formControls() {
    return this.loanForm.controls;
  }

  showEvent(val) {
    this.showValue = val.target.value;
    if (this.showValue === 'yes') {
      this.loanForm.get('ippis_number').setValidators([Validators.required])
    } else {
      this.loanForm.get('ippis_number').setValidators(null);
      this.loanForm.get('ippis_number').setErrors(null); 
    }
    this.loanForm.markAsPristine();
    this.loanForm.updateValueAndValidity()
  }

  goToNext() {
    console.log(this.loanForm.valid)
    if (this.loanForm.valid) {
      const formValue = this.loanForm.value;
      this.goNextEmitter.emit({ ...formValue, page: 3 })
    } else {
      Object.values(this.loanForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true })
        }
      })
    }
  }
}
