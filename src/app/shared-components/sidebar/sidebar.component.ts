import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public sidebarItems = [
    { label: 'Home', route: '/app/dashboard', icon: 'bi bi-house' },
    {
      label: 'Accounts', icon: 'bi bi-bank',
      children: [
        { label: 'Paytm Wallet', route: '/app/account/', icon: 'bi bi-wallet'},
        { label: 'HDFC Bank', route: '/service2', icon: 'bi bi-bank2' },
      ],
      expanded: false
    },
    { label: 'Settings', route: '/app/settings', icon: 'bi bi-gear' }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  isActive(item: any): boolean {
    return this.router.isActive(item.route, true);
  }
  toggleSubMenu(item: any) {
    item.expanded = !item.expanded;
  }

}
