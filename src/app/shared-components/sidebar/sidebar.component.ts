import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SharedService } from '../state/shared.service';
import { SidebarItem } from '../state/shared.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public sidebarItems: SidebarItem[] = [];
  private subscription: Subscription = new Subscription();
  public year = new Date().getFullYear();
  public version = "0.0.28";
  showSidebar = false;

  constructor(private router: Router, private sharedService: SharedService) {}

  ngOnInit(): void {
    this.subscription.add(this.sharedService.getSidenavItems().subscribe((response: any) => {
      this.sidebarItems = response;
    }));
    this.subscription.add(this.sharedService.getAccounts().subscribe((result: []) => {
      let accounts: SidebarItem[] = [];
      result.forEach((x: any) => {
        let icon = '';
        if (x.AccountType === 'Savings Account' || x.AccountType === 'Current Account') {
          icon = 'bi bi-bank2';
        } else if (x.AccountType === 'Wallet') {
          icon = 'bi bi-wallet';
        }
        accounts?.push({
          icon: icon,
          label: x.AccountName,
          route: '/app/accounts/' + x.Id
        })
      });
      this.sidebarItems.find(x => x.label === "Accounts")?.children?.push(...accounts);
    }))
  }

  isActive(item: any): boolean {
    return this.router.isActive(item.route, true);
  }

  toggleSubMenu(item: any) {
    item.expanded = !item.expanded;
  }
  // in your component
  toggleSidebar() {
    const sidebar = document.querySelector('.full-screen.bg-rov-primary-sidebar');
    sidebar?.classList.toggle('show-sidebar');
  }
}
