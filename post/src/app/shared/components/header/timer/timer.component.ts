import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnDestroy{
    currentTime: string = '';
    private intervalId: ReturnType<typeof setTimeout> | undefined;
    ngOnInit() {
      this.updateTime();
      this.intervalId = setInterval(() => {
        this.updateTime();
      }, 1000);
    }

    ngOnDestroy() {
      clearInterval(this.intervalId);
    }

  private updateTime() {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      let timeOfDay = '';

      const amPm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      this.currentTime = `${hours}:${minutes}:${seconds} ${amPm}`;
    }
}
