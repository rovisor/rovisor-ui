import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AddAccountService } from './state/add-account.service';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-add-account-statement',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})

export class AddAccountComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  constructor(private formBuilder: FormBuilder, private addAccountService: AddAccountService) {}
  ngOnInit() {
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
