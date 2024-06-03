import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ITypeOfWork } from '../../interfaces/type-of-work';
import { ILookupListResponse } from '../../interfaces/lookup';

@Component({
  selector: 'app-task-form-1',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DropdownModule, InputTextModule, CalendarModule, ButtonModule],
  templateUrl: './task-form-1.component.html',
  styleUrl: './task-form-1.component.css'
})

export class TaskForm1Component implements OnInit {
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
      totalHours: ['', Validators.required]
    });

  }


  onSubmit() {
    if (this.taskForm.valid) {
      console.log('Form Submitted', this.taskForm.value);
    }
  }
}
