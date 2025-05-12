import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ProfileService} from "../../../shared/services/profile-storage-service/profile.service";
import {UserDetails} from "../../../shared/interfaces/user-details";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import Swiper from "swiper";
import {AvatarPreviewComponent} from "../avatar-preview/avatar-preview.component";
Swiper.use([Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-avatar-modal',
  templateUrl: './avatar-modal.component.html',
  styleUrls: ['./avatar-modal.component.scss']
})
export class AvatarModalComponent implements OnInit{

  @ViewChild('avatarGallery', { static: true }) avatarGallery!: ElementRef<HTMLDivElement>;
  @ViewChild('avatarSlider', { static: true }) avatarSlider!: ElementRef<HTMLDivElement>;

  avatars: string[] = [];
  userDetails: UserDetails = { photoFileName: '', languages: '', text: '', avatars: [] };

  currentIndex = 0;

  avatarWidth = 100;



  constructor(public dialogRef: MatDialogRef<AvatarModalComponent>, private profileService: ProfileService,
              private dialog: MatDialog) {}


  ngOnInit() {
    const storedDetails = this.profileService.getItem('userDetails');
    if (storedDetails) {
      this.userDetails = storedDetails;
      this.avatars = storedDetails.avatars || [];
    }
  }

  openPreview(avatar: string) {
    const dialogRef = this.dialog.open(AvatarPreviewComponent, {
      data: { avatar },
      width: '300px',
      panelClass: 'custom-dialog-container'
    });
    this.dialogRef.close();

    dialogRef.afterClosed().subscribe(result => {
      if (result.action === 'select') {
          this.userDetails.photoFileName = result.avatar;
          this.profileService.setItem('userDetails', this.userDetails);
      }
    });
  }

  addAvatar(avatarUrl: string) {
    this.userDetails.avatars = this.userDetails.avatars || [];
    if (!this.userDetails.avatars.includes(avatarUrl)) {
      this.userDetails.avatars.push(avatarUrl);
      this.profileService.setItem('userDetails', this.userDetails);
      this.avatars = [...this.userDetails.avatars];
    }
  }

  selectFile(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const fileUrl = reader.result as string;
        this.addAvatar(fileUrl);
        this.dialogRef.close(fileUrl);
      };

      reader.readAsDataURL(file);
    }
  }

  prevSlide() {
    const maxOffset = 0;
    if (this.currentIndex < maxOffset) {
      this.currentIndex += this.avatarWidth;
      this.updateGalleryPosition();
    }
  }

  nextSlide() {
    const galleryWidth = this.avatarGallery.nativeElement.scrollWidth;
    const sliderWidth = this.avatarSlider.nativeElement.clientWidth;
    const maxOffset = -(galleryWidth - sliderWidth);

    if (this.currentIndex > maxOffset) {
      this.currentIndex -= this.avatarWidth;
      this.updateGalleryPosition();
    }
  }

  updateGalleryPosition() {
    this.avatarGallery.nativeElement.style.transform = `translateX(${this.currentIndex}px)`;
  }
}
