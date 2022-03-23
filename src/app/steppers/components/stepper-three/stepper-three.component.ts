import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'stepper-three',
  templateUrl: './stepper-three.component.html',
  styleUrls: ['./stepper-three.component.scss'],
})
export class StepperThreeComponent implements OnInit {
  @Output() goNextEmitter = new EventEmitter();
  loanForm: FormGroup;
  constructor(private fb: FormBuilder) { }
  
  ngOnInit() {
    this.loanForm = this.fb.group({
      loanamount: [null, Validators.required],
    })
  }

  get formControls() {
    return this.loanForm.controls;
  }

  goToNext() {
    if (this.loanForm.valid) {
      const formValue = this.loanForm.value;
      this.goNextEmitter.emit({ ...formValue, page: 4 })
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
