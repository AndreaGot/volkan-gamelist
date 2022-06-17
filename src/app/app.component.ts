import { Component, HostBinding } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'volkan-gamelist';
  toggleControl = new FormControl(false);
  @HostBinding('class') className = '';

  constructor() {
  }

  ngOnInit(): void {
    this.className = 'light-theme';

    this.toggleControl.valueChanges.subscribe((darkMode) => {
      const darkClassName = 'dark-theme';
      const lightClassName = 'light-theme';
      this.className = darkMode ? darkClassName : 'light-theme';
    });
  }
}
