import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-zippy',
  templateUrl: './zippy.component.html',
  styleUrls: ['./zippy.component.css'],
})
export class ZippyComponent {
  
  @Input('title') title:string;

  hideInfo: boolean = true;
  state : string = 'Open';
  

  info:string='Shipping Details Content';
  onClick() {
    this.hideInfo = !this.hideInfo;
    this.state = this.state == 'Open' ? 'Close' : 'Open'
  }

  stateControl() {
    return this.hideInfo;
  }
}
