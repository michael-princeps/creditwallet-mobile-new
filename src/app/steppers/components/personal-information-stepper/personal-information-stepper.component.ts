import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatetimeCustomEvent, IonDatetime, IonModal } from '@ionic/angular';
import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-personal-information-stepper',
  templateUrl: './personal-information-stepper.component.html',
  styleUrls: ['./personal-information-stepper.component.scss'],
})
export class PersonalInformationStepperComponent implements OnInit {
  @Input() referralCode: string;
  @Output() goNextEmitter = new EventEmitter();
  customActionSheetOptions: any = {
    header: 'Select Title',
  };
  customGenderActionSheetOptions: any = {
    header: 'Select Gender',
  };
  detailsForm: FormGroup;
  dateValue = ''
  selectedDate: string = '';
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.detailsForm = this.fb.group({
      title: [null, Validators.required],
      firstname: [null, Validators.required],
      lastname:[null, Validators.required],
      dob: [null, this.customDateValidator],
      gender: [null, Validators.required],
      refferalcode: [{value: this.referralCode, disabled: this.referralCode ? true : false}]
    })
  }

  get formControls() {
    return this.detailsForm.controls;
  }

  setFocus(nextElement) {
    nextElement.setFocus(); //For Ionic 4
   //nextElement.focus(); //older version
 }

 openSelect(nextElement) {
  nextElement.open(); //For Ionic 4
 //nextElement.focus(); //older version
}

customDateValidator = (control: FormControl): { [s: string]: boolean } => {
  if (!this.selectedDate) {
    return { required: true };
  }
  return {};
};

goToNext() {
  console.log(this.detailsForm.value)
  if (this.detailsForm.valid) {
    const formValue = this.detailsForm.value;
    this.goNextEmitter.emit(formValue);
  } else {
    Object.values(this.detailsForm.controls).forEach(control => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }
}


formatDate(value: string) {
  console.log(value)
  this.selectedDate = format(parseISO(value), 'MMM dd yyyy')
  const dob = format(parseISO(value), 'yyyy-MM-dd')
  this.detailsForm.patchValue({dob: dob}, {onlySelf: true})
  this.detailsForm.controls['dob'].markAsDirty()
  this.detailsForm.controls['dob'].updateValueAndValidity({onlySelf: true})
  return value;
}

cancelPicker(modal:IonModal, datePicker: IonDatetime) {
  datePicker.cancel().then(() => modal.dismiss())
}

closeDatePicker(modal:IonModal, datePicker: IonDatetime) {
  datePicker.confirm().then(() => modal.dismiss())
}
}
