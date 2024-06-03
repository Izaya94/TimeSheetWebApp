import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';

import { ITypeOfWork } from '../../interfaces/type-of-work';
import { ILookupList, ILookupListResponse } from '../../interfaces/lookup';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DropdownModule, InputTextModule, CalendarModule, ButtonModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})

export class TaskFormComponent implements OnInit {
  taskForm!: FormGroup;
  projects!: ILookupListResponse[]; 
  typeofwork!: ILookupListResponse[];

  constructor(
    private fb: FormBuilder,
  ) 
  {}

  ngOnInit() {
    this.taskForm = this.fb.group({
      projectName: ['', Validators.required],
      typeOfWork: ['', Validators.required],
      startTime: [null, Validators.required],
      endTime: [null, Validators.required],
      totalHours: [{ value: 0, disabled: true }]
    });

    this.taskForm.get('endTime')?.valueChanges.subscribe(() => {
      this.calculateTotalHours();
    });

    this.taskForm.get('startTime')?.valueChanges.subscribe(() => {
      this.calculateTotalHours();
    });
  }

  calculateTotalHours() {
    const startTime = this.taskForm.get('startTime')?.value;
    const endTime = this.taskForm.get('endTime')?.value;

    if (startTime && endTime) {
      const start = new Date(startTime);
      const end = new Date(endTime);
      const diff = (end.getTime() - start.getTime()) / (1000 * 60 * 60); // difference in hours
      const formattedDiff = Math.max(0, diff).toFixed(2); // ensure it's not negative and format to 2 decimal places

      // this.taskForm.patchValue({ totalHours: diff > 0 ? diff : 0 });
      this.taskForm.patchValue({ totalHours: formattedDiff });
    }
  }

  onSubmit() {
    if (this.taskForm.valid) {
      console.log('Form Submitted', this.taskForm.value);
    }
  }
}
