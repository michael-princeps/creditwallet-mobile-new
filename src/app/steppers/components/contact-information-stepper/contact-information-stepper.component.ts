import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { states } from 'src/app/extra/states';

@Component({
  selector: 'app-contact-information-stepper',
  templateUrl: './contact-information-stepper.component.html',
  styleUrls: ['./contact-information-stepper.component.scss'],
})
export class ContactInformationStepperComponent implements OnInit {
  @Output() goNextEmitter = new EventEmitter();
  customActionSheetOptions: any = {
    header: 'Select State',
  };
  contactForm: FormGroup;
  states = states
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.contactForm = this.fb.group({
      // telephone: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      house_address: [null, Validators.required],
      city: [null, Validators.required],
      state: [null, Validators.required]
    })
  }

  get formControls() {
    return this.contactForm.controls
  }

  goToNext() {
    if (this.contactForm.valid) {
      const formValue = this.contactForm.value;
      const newFormValue = Object.assign(formValue, {state: formValue.state.name})
      this.goNextEmitter.emit(newFormValue);
    } else {
      Object.values(this.contactForm.controls).forEach(control => {
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
