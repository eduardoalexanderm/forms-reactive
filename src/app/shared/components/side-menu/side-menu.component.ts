import { Component, OnInit } from '@angular/core';

interface MenuItem {
  title: string;
  route: string;
}

@Component({
  selector: 'shared-side-menu',
  templateUrl: './side-menu.component.html',
})
export class SideMenuComponent {
  public reactiveMenu: MenuItem[] = [
    { title: 'Basic', route: './reactive/basic' },
    { title: 'Dynamic', route: './reactive/dynamic' },
    { title: 'Switches', route: './reactive/switches' },
  ];

  public authMenu: MenuItem[] = [
    { title: 'Sign Up', route: './auth' },
  ];

}
