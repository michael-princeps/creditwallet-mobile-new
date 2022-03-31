import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { states } from 'src/app/extra/states';
import { LoaderService } from 'src/app/services/loader.service';
import { MainService } from 'src/app/services/main.service';
import { ToastService } from 'src/app/services/toast.service';
import { format, parseISO } from 'date-fns';
import { IonModal, IonDatetime } from '@ionic/angular';

@Component({
  selector: 'app-auto-disburse-personal-stepper',
  templateUrl: './auto-disburse-personal-stepper.component.html',
  styleUrls: ['./auto-disburse-personal-stepper.component.scss'],
})
export class AutoDisbursePersonalStepperComponent implements OnInit {
  @Output() goNextEmitter = new EventEmitter();
  @Input() referralCode: string;
  @Input() loanDetails;
  dateValue = '1970-01-01';
  customActionSheetOptions: any = {
    header: 'Select Title',
  };
  customGenderActionSheetOptions: any = {
    header: 'Select Gender',
  };
  detailsForm: FormGroup;
  states = states
  selectedDate: string;
  constructor(private fb: FormBuilder, private loader: LoaderService, private toaster: ToastService, private service: MainService) { }

  ngOnInit() {
    this.detailsForm = this.fb.group({
      title: [null, Validators.required],
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      dob: [null, this.customDateValidator],
      gender: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      house_address: [null, Validators.required],
      city: [null, Validators.required],
      state: [null, Validators.required],
      place_of_work: [null, Validators.required],
      refferalcode: [{ value: this.referralCode, disabled: this.referralCode ? true : false }]
    })
  }

  get formControls() {
    return this.detailsForm.controls
  }

  setFocus(nextElement) {
    nextElement.setFocus(); //For Ionic 4
    //nextElement.focus(); //older version
  }

  openSelect(nextElement) {
    nextElement.open(); //For Ionic 4
    //nextElement.focus(); //older version
  }

  goToNext() {
    if (this.detailsForm.valid) {
      const formValue = this.detailsForm.value;
      // this.goNextEmitter.emit(formValue);
      const newFormValue = Object.assign(formValue, { state: formValue.state.name, id: this.loanDetails.id })
      // formValue.id = this.loanDetails.id;
      this.loader.simpleLoader()
      this.service.submitAutoDisbursePersonalDetails(newFormValue).pipe().subscribe((data: any) => {
        this.toaster.presentToast('success', data.message);
        this.loader.dismissLoader()
        this.goNextEmitter.emit({ page: 7 })
      }, () => this.loader.dismissLoader())
    } else {
      Object.values(this.detailsForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  customDateValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!this.selectedDate) {
      return { required: true };
    }
    return {};
  };

  formatDate(value: string) {
    console.log(value)
    this.selectedDate = format(parseISO(value), 'MMM dd yyyy')
    const dob = format(parseISO(value), 'yyyy-MM-dd')
    this.detailsForm.patchValue({ dob: dob }, { onlySelf: true })
    this.detailsForm.controls['dob'].markAsDirty()
    this.detailsForm.controls['dob'].updateValueAndValidity({ onlySelf: true })
    return value;
  }

  cancelPicker(modal: IonModal, datePicker: IonDatetime) {
    datePicker.cancel().then(() => modal.dismiss())
  }

  closeDatePicker(modal: IonModal, datePicker: IonDatetime) {
    datePicker.confirm().then(() => modal.dismiss())
  }
}
