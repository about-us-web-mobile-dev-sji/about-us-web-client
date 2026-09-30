import { Component } from '@angular/core';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-notification-host',
  imports: [ToastModule],
  template: `<p-toast position="bottom-right" />`,
})
export class NotificationHost {}
