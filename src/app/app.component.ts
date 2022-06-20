import { Component, HostBinding, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'volkan-gamelist';
  toggleControl = new FormControl(false);
  @HostBinding('class') className = '';
  @ViewChild(MatSidenav)
 sidenav!: MatSidenav;

 
  constructor(private observer: BreakpointObserver) {
  }

  ngOnInit(): void {
    this.className = 'light-theme';

    this.toggleControl.valueChanges.subscribe((darkMode) => {
      const darkClassName = 'dark-theme';
      const lightClassName = 'light-theme';
      this.className = darkMode ? darkClassName : 'light-theme';
    });
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }
}
