import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProfileService} from "../../../shared/services/profile-storage-service/profile.service";
import {UserDetails} from "../../../shared/interfaces/user-details";


@Component({
  selector: 'app-avatar-preview',
  templateUrl: './avatar-preview.component.html',
  styleUrls: ['./avatar-preview.component.scss']
})
export class AvatarPreviewComponent {
  selectedAvatar: string;
  userDetails: UserDetails = { photoFileName: '', languages: '', text: '', avatars: [] };

  constructor(public dialogRef: MatDialogRef<AvatarPreviewComponent>,
              private profileService: ProfileService,
              @Inject(MAT_DIALOG_DATA) public data: { avatar: string }) {
    this.selectedAvatar = data.avatar;
  }



  selectAvatar() {
    this.dialogRef.close({ action: 'select', avatar: this.selectedAvatar });
  }

  deleteAvatar() {
    this.dialogRef.close({ action: 'delete', avatar: this.selectedAvatar });
    const avatars = this.profileService.getItem('userDetails');
    const updatedAvatars = avatars?.avatars?.filter((avatar) => avatar !== this.selectedAvatar);
    this.userDetails.avatars = updatedAvatars;
    this.profileService.setItem('userDetails', this.userDetails);
  }


}
