import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tenors } from 'src/app/extra/duration';

@Component({
  selector: 'stepper-four',
  templateUrl: './stepper-four.component.html',
  styleUrls: ['./stepper-four.component.scss'],
})
export class StepperFourComponent implements OnInit {
  @Output() goNextEmitter = new EventEmitter();
  loanForm: FormGroup;
  customActionSheetOptions: any = {
    header: 'Select duration',
  };
  tenors = tenors.sort((a, b) => a.value - b.value)
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.loanForm = this.fb.group({
      tenor: [null, Validators.required],
    })
  }

  get formControls() {
    return this.loanForm.controls;
  }

  goToNext() {
    if (this.loanForm.valid) {
      const formValue = this.loanForm.value;
      this.goNextEmitter.emit({ ...formValue, page: 5 })
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
