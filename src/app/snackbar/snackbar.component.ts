import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.css'
})
export class SnackbarComponent {
  @Input() message: string = '';
  @Input() duration: number = 3000;
  
  visible: boolean = false;

  ngOnInit(): void {
    if (this.message) {
      this.show();
    }
  }

  show(): void {
    this.visible = true;
    setTimeout(() => this.visible = false, this.duration);
  }
}
