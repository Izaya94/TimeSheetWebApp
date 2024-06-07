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
import { RoleService } from '../../services/role.service';
import { Observable, map } from 'rxjs';
import { IRole } from '../../interfaces/role';
import { AuthService } from '../../services/auth.service';
import { LookupGetByTagNameDesignationService } from '../../services/LookupServices/lookup-get-by-tag-name-designation.service';
import { ILookupGetByTagNameDesignationList } from '../../interfaces/Lookup Master/Lookup-GetByTagName-Designation';

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
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  constructor(
    private lookupGetByTagNameDesignationService: LookupGetByTagNameDesignationService,
	  private changeDetector: ChangeDetectorRef,
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
      email: ['', [Validators.required, Validators.email]],
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

  onSubmit() {
    console.log(this.registerForm.value);
  }
}
