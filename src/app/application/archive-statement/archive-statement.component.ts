import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-archive-statement',
  templateUrl: './archive-statement.component.html',
  styleUrls: ['./archive-statement.component.css']
})

export class ArchiveStatementComponent implements OnInit, OnDestroy {
  allUsers: any = [];
  private subscription: Subscription = new Subscription();
  service: any;

  constructor() {}

  ngOnInit(): void {
    this.users();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  users(): void {
    this.service
        .users()
        .subscribe((response: any) => {
          this.allUsers = response.data;
        });
  }

}
