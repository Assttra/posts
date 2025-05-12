import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {ProfileService} from "../../../shared/services/profile-storage-service/profile.service";
import {UserDetails} from "../../../shared/interfaces/user-details";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  hiddenEdit = true;
  textLength = 0;

  userDetails: UserDetails | undefined;

  textControl = new FormControl<string | null>(null, Validators.maxLength(256));

  constructor(
    private profileService: ProfileService,
  ) {
  }

  ngOnInit() {
     this.userDetails = this.profileService.getItem('userText') || {};
  }

  editDetails(): void {
    this.hiddenEdit = !this.hiddenEdit;
    this.textControl.valueChanges.subscribe(value => {
      this.textLength = value ? value.length : 0;

      this.profileService.setItem('userText', { text: value });
    });

    this.userDetails = this.profileService.getItem('userText') || {};
    this.textControl.setValue(this.userDetails.text ?? '');
  }
}
