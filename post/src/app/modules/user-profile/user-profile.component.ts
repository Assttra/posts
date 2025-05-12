import {Component, OnInit} from '@angular/core';
import {UserService} from "../../shared/services/api/user-service/user.service";
import {User} from "../../shared/interfaces/user";
import {ActivatedRoute, Router} from "@angular/router";
import {switchMap} from "rxjs";
import {ProfileService} from "../../shared/services/profile-storage-service/profile.service";
import {UserDetails} from "../../shared/interfaces/user-details";
import {MatDialog} from "@angular/material/dialog";
import {AvatarModalComponent} from "./avatar-modal/avatar-modal.component";



@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  url = '';
  user: User | undefined;
  userDetails: UserDetails = { photoFileName: '', languages: '', text: '', avatars: [] };


  constructor(private userService: UserService, private activatedRoute: ActivatedRoute,
              private profileService: ProfileService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.activatedRoute.params.pipe(
      switchMap(params => {
        return this.userService.getUserById(params['id'])
      })
    ).subscribe(user => this.user = user);
    const storedData = this.profileService.getItem('userDetails');
    if(storedData) {
      this.userDetails = storedData;
      this.url = storedData.photoFileName || '';
      this.userDetails.avatars = storedData.avatars || [];
    }
  }

  uploadFile(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const fileUrl = reader.result as string;

        this.url = fileUrl;
        this.userDetails.photoFileName = fileUrl;

        if (!this.userDetails.avatars) {
          this.userDetails.avatars = [];
        }
        if (!this.userDetails.avatars.includes(fileUrl)) {
          this.userDetails.avatars.push(fileUrl);
        }

        this.profileService.setItem('userDetails', this.userDetails,);
      };

      reader.readAsDataURL(file);
    }
  }

  openDialog(fileInput: HTMLInputElement) {
    const dialogRef = this.dialog.open(AvatarModalComponent, {
      width: '500px',
      disableClose: false,
      data: this.url
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'openFileInput') {
        fileInput.click();
      } else if (result) {
        this.url = result;
        this.userDetails.photoFileName = result;
        this.profileService.setItem('userDetails', this.userDetails);
        if (!this.userDetails.avatars?.includes(result)) {
          this.userDetails.avatars?.push(result);
          this.profileService.setItem('userDetails', this.userDetails);
        }
      }
    });
  }

}
