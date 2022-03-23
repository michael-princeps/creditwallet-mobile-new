import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoaderService } from 'src/app/services/loader.service';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-enter-otp-stepper',
  templateUrl: './enter-otp-stepper.component.html',
  styleUrls: ['./enter-otp-stepper.component.scss'],
})
export class EnterOtpStepperComponent implements OnInit {
  @Input() loanId: string;
  @Output() goNextEmitter = new EventEmitter();
  disabled: boolean = false;
  loading = false;
  destroy$ = new Subject<boolean>();
  otpCode: number;
  config: Config = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: true,
    // placeholder: '_',
    inputStyles: {
      'width': '50px',
      'height': '50px',
      'background-color': '#EEF1F2',
      'border-color': '#EEF1F2',
      'color': '#1C1B1B',
      'border-radius': '4px',
    }
  };
  constructor(private service: MainService, private loader: LoaderService) { }

  ngOnInit() { }


  onOtpChange(event) {
    if (event.length == 4) {
      this.otpCode = event;
      this.disabled = false;
    } else {
      this.disabled = true
    }
  }

  verifyCode() {
    this.loader.simpleLoader();
    this.service.confirmCreditCode({ id: this.loanId, code: this.otpCode }).pipe((takeUntil(this.destroy$))).subscribe((data: any) => {
      this.loader.dismissLoader();
      this.goNextEmitter.emit({ page: 2 })
    }, () => this.loader.dismissLoader())
  }
}

class Config {
  inputStyles?: { [key: string]: any };
  containerStyles?: { [key: string]: any };
  allowKeyCodes?: string[];
  length: number;
  allowNumbersOnly?: boolean;
  inputClass?: string;
  containerClass?: string;
  isPasswordInput?: boolean;
  disableAutoFocus?: boolean;
  placeholder?: string;
  letterCase?: 'Upper' | 'Lower';
}
