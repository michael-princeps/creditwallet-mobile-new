import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { banks } from 'src/app/extra/banks';
import { LoaderService } from 'src/app/services/loader.service';
import { MainService } from 'src/app/services/main.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-offer-account-stepper',
  templateUrl: './offer-account-stepper.component.html',
  styleUrls: ['./offer-account-stepper.component.scss'],
})
export class OfferAccountStepperComponent implements OnInit {
  @Output() goNextEmitter = new EventEmitter();
  @Input() loanOfferId: any;
  userAccountDetails: any;
  bankDetailsForm!: FormGroup;
  banks = banks.sort((a, b) => a.name.localeCompare(b.name))
  constructor(private fb: FormBuilder, private loader: LoaderService, private toaster: ToastService, private service: MainService,) { }

  ngOnInit() {
    this.bankDetailsForm = this.fb.group({
      bank_name: [null, Validators.required],
      bank_account: [null, [Validators.required, this.amountValidator]]
    })
  }

  amountValidator = (control: FormControl): { [s: string]: boolean } => {
    if (isNaN(control.value)) {
       return { amount: true, error: true };
     }
     return {};
   }
 
   get formControls() {
     return this.bankDetailsForm.controls;
   }


   handleFormCollect() {
    if (this.bankDetailsForm.valid) {
      this.verifyAccountDetails();
    } else {
      Object.values(this.bankDetailsForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  verifyAccountDetails() {
    const bankcode = this.bankDetailsForm.get('bank_name')?.value;
    const accountnumber = this.bankDetailsForm.get('bank_account')?.value;
    this.loader.simpleLoader()
    this.bankDetailsForm.disable();
    this.service.verifyAccountDetails({bankcode, accountnumber}).subscribe((data) => {
      this.userAccountDetails = data.result;
      this.process();
    }, () => {
       this.loader.dismissLoader();
      this.bankDetailsForm.enable();
    })
  }

  process() {
    const accountData = {
      id: this.loanOfferId,
      bankname: this.bankDetailsForm.get('bank_name')?.value,
      accountnumber: this.bankDetailsForm.get('bank_account')?.value
    };
    this.loader.simpleLoader();
    const formvalue = this.bankDetailsForm.value;
    this.service.addAccount(accountData).subscribe((data: any) => {
      setTimeout(() => {
         this.loader.dismissLoader();
        this.goNextEmitter.emit({...formvalue, ...data, page: 5});
      }, 1000);
    }, () => {
       this.loader.dismissLoader();
    });
  }
}
