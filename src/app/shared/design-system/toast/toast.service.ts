import { Injectable, signal } from '@angular/core';
import { Toast } from '../../../models/toast.interface';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private show = signal<Toast>({ show: false });

  setData(value: Toast): void {
    this.show.update(() => value);
  }

  getData(): Toast {
    return this.show();
  }
}
