import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-claculator',
    templateUrl: './calculator.component.html',
    styleUrls: ['./calculator.component.css']
  })

  export class CalculatorComponent implements OnInit, OnDestroy {
    ngOnDestroy(): void {
        throw new Error('Method not implemented.');
    }
    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }

  }
