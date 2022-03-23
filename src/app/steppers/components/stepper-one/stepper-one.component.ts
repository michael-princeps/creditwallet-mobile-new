import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'stepper-one',
  templateUrl: './stepper-one.component.html',
  styleUrls: ['./stepper-one.component.scss'],
})
export class StepperOneComponent implements OnInit {
  @Output() goNextEmitter = new EventEmitter();
  numberForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.numberForm = this.fb.group({
      telephone: [null, Validators.required]
    })
  }

  get formControls() {
    return this.numberForm.controls;
  }

  goToNext() {
    if (this.numberForm.valid) {
      const formValue = this.numberForm.value;
      this.goNextEmitter.emit({...formValue, page: 2})
    } else {
      Object.values(this.numberForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true})
        }
      })
    }
  }
}
