import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { ChipsModule } from 'primeng/chips';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LookupGetByTagNameDesignationService } from '../../services/LookupServices/lookup-get-by-tag-name-designation.service';
import { ILookupGetByTagNameDesignationList } from '../../interfaces/Lookup Master/Lookup-GetByTagName-Designation';
import { EmployeeInsertService } from '../../services/EmployeeServices/employee-insert.service';
import { EmployeeDTOAdd, IEmployeeDTOAdd } from '../../interfaces/Employee/EmployeeInsert';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AutoCompleteModule,
    CalendarModule,
    ChipsModule,
    DropdownModule,
    InputMaskModule,
    InputNumberModule,
    CascadeSelectModule,
    MultiSelectModule,
    InputTextareaModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    CommonModule,
    DropdownModule,
    ToastModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [MessageService]
})
export class RegisterComponent implements OnInit {
  constructor(
    private lookupGetByTagNameDesignationService: LookupGetByTagNameDesignationService,
	  private changeDetector: ChangeDetectorRef,
    private employeeInsertService: EmployeeInsertService,
    private messageService: MessageService,
  ) {}

  designation!: ILookupGetByTagNameDesignationList[] | null;
  fb = inject(FormBuilder);
  registerForm!: FormGroup;
  router = inject(Router);

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      contactNumber: ['', [Validators.required]],
      homeNumber: [''],
      email1: ['', [Validators.required, Validators.email]],
      email2: ['', [Validators.email]],
      joinDate: ['', [Validators.required]],
      designation: ['', [Validators.required]],
    });

    this.register();
}

  register() {
    this.lookupGetByTagNameDesignationService.lookupDesignationDataGet().subscribe((response: any) => {
		console.log('Full Project Response:', response);
		if (response.dataUpdateResponse && response.dataUpdateResponse.status) {
		  this.designation = response.lookupGetByTagNameList;
		  console.log('Formatted Projects:', this.designation);
		  this.changeDetector.detectChanges();
		}
		if (response.dataUpdateResponse && response.dataUpdateResponse.status && response.lookupGetByTagNameDesignationList) {
		  this.designation = response.lookupGetByTagNameList;
		  console.log('Formatted Projects:', this.designation);
		}
	  });
  }

  onDataGet(lookupGetByTagName: ILookupGetByTagNameDesignationList[]) {
    this.designation = lookupGetByTagName;
  }

  onSubmit(): void {
    // this.registerForm.value.designation = this.designation.keyValue;
    console.log(this.registerForm.value);
    const formValue = this.registerForm.value;
    if(this.registerForm.valid){
      const selectedDesignation = this.designation!.find(
        designation => designation.keyData === formValue.designation.keyData
      );    
      
      const employeeDTOAdd: EmployeeDTOAdd = {
        EmployeeName: formValue.fullName,
        BirthDate: formValue.birthDate,
        ContactNumber1: formValue.contactNumber,
        ContactNumber2: formValue.homeNumber,
        Email1: formValue.email1,
        Email2: formValue.email2,
        JoinedOn: formValue.joinDate,
        DesignationId: selectedDesignation!.keyValue,
      };

      // const employeeDTOAdd: EmployeeDTOAdd = this.registerForm.value;
      this.employeeInsertService.insertEmployeeData(employeeDTOAdd).subscribe({
        next:(response: IEmployeeDTOAdd) => {
          console.log('Employee added', response);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Employee Added Successfully.',
          });
          this.resetForm();
        },
        error: (error: any) => {
          console.log('Error', error);
        },
        complete: () => {
          console.log('Request complete');
        }
      });
    }
  }

  resetForm(){
    this.registerForm.reset();
  }

  // resetForm() {
  //   this.fullName = null;
  //   this.birthDate = null;
  //   this.contactNumber = new Date();
  //   this.homeNumber = new Date();
  //   this.email1 = new Date();
  //   this.email2 = 1;
  //   this.joinDate = false;
  //   this.designation = '';
  // }

}
