import { Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {

  activeComponent :boolean  = false;

  changeComponent() :void {
    this.activeComponent = !this.activeComponent;
  }
}
