import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-date',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input-date.component.html',
  styleUrl: './input-date.component.sass',
})
export class InputDateComponent {
  @Input() disabled: boolean = false;
  @Input() key: string = '';
  @Input() form!: FormGroup;

  nowDate = new Date().toISOString().split('T')[0];
}
