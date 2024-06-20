import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  signal,
} from '@angular/core';
import {
  FullCalendarComponent,
  FullCalendarModule,
} from '@fullcalendar/angular';
import {
  CalendarOptions,
  DateSelectArg,
  EventApi,
  EventClickArg,
  EventInput,
} from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { RouterOutlet } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { LookupGetByTagNameWorkTypeService } from '../../services/LookupServices/lookup-get-by-tag-name-work-type.service';
import { LookupGetByTagNameProjectService } from '../../services/LookupServices/lookup-get-by-tag-name-project.service';
import { ILookupGetByTagNameProjectList } from '../../interfaces/Lookup Master/Lookup-GetByTagName-Project';
import { ILookupGetByTagNameWorkTypeList } from '../../interfaces/Lookup Master/Lookup-GetByTagName-WorkType';
import { __values } from 'tslib';
import {
  EmployeeCalendarDTOAdd,
  IEmployeeCalendarDTOAdd,
} from '../../interfaces/EmployeeCalendar/EmployeeCalendarInsert';
import { EmployeeCalendarInsertService } from '../../services/EmployeeCalendarServices/employee-calendar-insert.service';
import { EmployeeCalendarListService } from '../../services/EmployeeCalendarServices/employee-calendar-list.service';
import { IEmployeeCalendarDTOList } from '../../interfaces/EmployeeCalendar/EmployeeCalendarList';
import { EmployeeCalendarEditService } from '../../services/EmployeeCalendarServices/employee-calendar-edit.service';
import { EmployeeCalendarDTOEdit, IEmployeeCalendarDTOEdit } from '../../interfaces/EmployeeCalendar/EmployeeCalendarUpdate';
import { formatISO, parseISO } from 'date-fns';
import { EmployeeCalendarDeleteService } from '../../services/EmployeeCalendarServices/employee-calendar-delete.service';
import { EmployeeCalendarDTODelete, IEmployeeCalendarDTODelete } from '../../interfaces/EmployeeCalendar/EmployeeCalendarDelete';
@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    FullCalendarModule,
    CommonModule,
    RouterOutlet,
    DialogModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    CalendarModule,
    DropdownModule,
    CheckboxModule,
    ToastModule,
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
  providers: [MessageService, DatePipe],
})
export class CalendarComponent implements OnInit, AfterViewInit {
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  visible: boolean = false;
  maximizable: boolean = true;
  workType: ILookupGetByTagNameWorkTypeList | null = null;
  projectTitle: ILookupGetByTagNameProjectList | null = null;
  projects!: ILookupGetByTagNameProjectList[];
  employeeCalendarWorkList!: IEmployeeCalendarDTOList[];
  typeofwork!: ILookupGetByTagNameWorkTypeList[];
  workStart: Date = new Date();
  workEnd: Date = new Date();
  selectedDate: Date = new Date();
  description: string = '';
  employeeCalendarId: number = 0;
  employeeCalendarIdForDelete: number = 0;
  calendarVisible = signal(true);
  isEditMode: boolean = false;
  calendarEvents: EventInput[] = [];
  currentEvents: EventApi[] = [];
  enterHours: boolean = false;
  workHours: number = 1;
  calendarOptions: any;
  utcCalendarDate!: string;
  utcStartTime!: string;
  utcEndTime!: string;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private messageService: MessageService,
    private lookupGetByTagNameWorkTypeService: LookupGetByTagNameWorkTypeService,
    private lookupGetByTagNameProjectService: LookupGetByTagNameProjectService,
    private employeeCalendarInsertService: EmployeeCalendarInsertService,
    private employeeCalendarListService: EmployeeCalendarListService,
    private employeeCalendarEditService: EmployeeCalendarEditService,
    private employeeCalendarDeleteService: EmployeeCalendarDeleteService
  ) {}
  ngOnInit() {
    this.employeeCalendarListService.getEmployeeCalendarList().subscribe(data=> {
      this.employeeCalendarWorkList = data.employeeCalendarList;
      this.convertEmployeeCalendarTimesToLocal();
      console.log(this.employeeCalendarWorkList);
    });


    this.calendar();
  
    this.calendarOptions = signal<CalendarOptions>({
      plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
      },
      initialView: 'dayGridMonth',
      editable: true,
      selectable: true,
      displayEventTime: false,
      // timeZone: 'local',
      // events: this.calendarEvents,
      select: this.handleDateSelect.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventsSet: this.handleEvents.bind(this),

    });
    
  }

  convertEmployeeCalendarTimesToLocal(): void {
    this.employeeCalendarWorkList = this.employeeCalendarWorkList.map(item => ({
        ...item,
        date: this.convertUTCToLocal(item.date),
        start: this.convertUTCToLocal(item.start),
        end: this.convertUTCToLocal(item.end)
    }));
  }

  convertUTCToLocal(utcDate: Date): Date {
    // const date = new Date(utcDate + 'Z'); // Ensure UTC format
    // return this.datePipe.transform(date, 'medium') || utcDate;
    return new Date(utcDate + 'Z');
  }

  handleCalendarToggle() {
    this.calendarVisible.update((bool) => !bool);
  }



  handleDateSelect(selectInfo: DateSelectArg) {
    this.selectedDate = new Date(selectInfo.startStr);

    this.workStart = new Date(selectInfo.startStr);
    this.workStart.setHours(new Date().getHours());
    this.workStart.setMinutes(0);
    this.workStart.setSeconds(0);

    this.workEnd = new Date(this.workStart.getTime());
    this.workEnd.setHours(this.workEnd.getHours() + 1);

    this.visible = true;
    this.isEditMode = false;
  }

  addWork() {
    if (!this.calendarComponent) {
      console.error('CalendarComponent is not available.');
      return;
    }

    if (this.workHours <= 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Hours must be greater than 0.',
      });
      return;
    }

    let duration = 0;
    let eventStart: Date | null = this.workStart;
    let eventEnd: Date | null = this.workEnd;

    const calendarApi = this.calendarComponent.getApi();
    if (this.projectTitle && this.workType) {

      
      if (this.enterHours) {
        duration = this.workHours;
        eventStart = new Date(this.selectedDate);
        eventEnd = new Date(this.selectedDate);
        eventEnd.setMinutes(eventEnd.getMinutes() + 15);
      } else {
        duration =
          (eventEnd.getTime() - eventStart.getTime()) / (1000 * 60 * 60);
      }

      calendarApi.addEvent({
        start: this.workStart,
        end: this.workEnd,
        allDay: false,
        title: this.projectTitle.keyData + ' : ' + this.workType.keyData + ' for ' + this.workHours + ' Hours(s)' ,
      });

      this.visible = false;

      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Work added successfully.',
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill in all required fields.',
      });
    }

    let parsedCalendarDate : string;
    let parsedStartDate: string;
    let parsedEndDate: string;
  
    parsedCalendarDate = formatISO(this.selectedDate);
    parsedStartDate = formatISO(eventStart);
    parsedEndDate = formatISO(eventEnd);


    const employeeCalendarDTOAdd: EmployeeCalendarDTOAdd = {
      CalendarDate: parseISO(parsedCalendarDate),
      ProjectId: this.projectTitle!.keyValue,
      WorkTypeId: this.workType!.keyValue,
      StartTime: parseISO(parsedStartDate),
      EndTime: parseISO(parsedEndDate),
      TotalTime: this.workHours,
      Description: this.description,
    };

    console.log(employeeCalendarDTOAdd);

    this.employeeCalendarInsertService
      .insertEmployeeCalendarData(employeeCalendarDTOAdd)
      .subscribe({
        next: (response: IEmployeeCalendarDTOAdd) => {
          console.log('Employee added', response);
          this.employeeCalendarListService.getEmployeeCalendarList().subscribe(data => {
            this.employeeCalendarWorkList = data.employeeCalendarList.map(event => ({
              ...event,
            }));
            this.convertEmployeeCalendarTimesToLocal();
            console.log(this.employeeCalendarWorkList);
      });
        },
        error: (error: any) => {
          console.log('Error', error);
        },
        complete: () => {
          console.log('Request complete');
        },
      });
  }

  editWorkEvent(clickedEvent: any){
    if (clickedEvent) {
      this.projectTitle = this.projects.find(project => project.keyValue === clickedEvent.projectId) || null;
      this.workType = this.typeofwork.find(workType => workType.keyValue === clickedEvent.workTypeId) || null;
      this.workStart = new Date(clickedEvent.start);
      this.workEnd = new Date(clickedEvent.end);
      this.selectedDate = new Date(clickedEvent.start);
      this.description = clickedEvent.description || '';
      this.workHours = clickedEvent.totalTime;
      this.enterHours = false;
      // this.enterHours = !!clickedEvent.totalTime;
      
      this.visible = true;
      this.isEditMode = true;
    }
  }

  editWork(){
    if (this.workHours <= 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Hours must be greater than 0.',
      });
      return;
    }

    let duration = 0;
    let eventStart = this.workStart;
    let eventEnd = this.workEnd;
    const calendarApi = this.calendarComponent.getApi();
    if (this.projectTitle && this.workType) {


      if (this.enterHours) {
        duration = this.workHours;
        eventStart = new Date(this.selectedDate);
        eventEnd = new Date(this.selectedDate);
        eventEnd.setMinutes(eventEnd.getMinutes() + 15);
      } else {
        duration =
          (eventEnd.getTime() - eventStart.getTime()) / (1000 * 60 * 60);
      }

      calendarApi.addEvent({
        start: this.workStart,
        end: this.workEnd,
        allDay: false,
        title: this.projectTitle.keyData + ' : ' + this.workType.keyData + ' for ' + this.workHours + ' Hours(s)' ,
      });

      this.visible = false;

      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Work edited successfully.',
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill in all required fields.',
      });
    }

    let parsedCalendarDate : string;
    let parsedStartDate : string;
    let parsedEndDate : string;

    parsedCalendarDate = formatISO(this.selectedDate);
    parsedStartDate = formatISO(this.workStart);
    parsedEndDate = formatISO(this.workEnd);

    const employeeCalendarDTOEdit: EmployeeCalendarDTOEdit = {
      EmployeeCalendarId: this.employeeCalendarId,
      CalendarDate: parseISO(parsedCalendarDate),
      ProjectId: this.projectTitle!.keyValue,
      WorkTypeId: this.workType!.keyValue,
      StartTime: parseISO(parsedStartDate),
      EndTime: parseISO(parsedEndDate),
      TotalTime: this.workHours,
      Description: this.description,
    };

    console.log(employeeCalendarDTOEdit);

    this.employeeCalendarEditService
      .updateEmployeeCalendarData(employeeCalendarDTOEdit)
      .subscribe({
        next: (response: IEmployeeCalendarDTOEdit) => {
          console.log('Employee Calendar Edited', response);
          this.employeeCalendarListService.getEmployeeCalendarList().subscribe(data=> {
            this.employeeCalendarWorkList = data.employeeCalendarList;
            this.convertEmployeeCalendarTimesToLocal();
            console.log(this.employeeCalendarWorkList);
          });
        },
        error: (error: any) => {
          console.log('Error', error);
        },
        complete: () => {
          console.log('Request complete');
        },
      });
  }

  deleteWork(){

    this.visible = false;
    const employeeCalendarDTODelete: EmployeeCalendarDTODelete = {
      employeeCalendarId: this.employeeCalendarIdForDelete,
    };
    this.employeeCalendarDeleteService
    .deleteEmployeeCalendarData(employeeCalendarDTODelete)
    .subscribe({
      next: (response: IEmployeeCalendarDTODelete) => {
        console.log('Employee Calendar Deleted', response);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Work Deleted successfully.',
        });
        this.employeeCalendarListService.getEmployeeCalendarList().subscribe(data=> {
          this.employeeCalendarWorkList = data.employeeCalendarList;
          this.convertEmployeeCalendarTimesToLocal();
          console.log(this.employeeCalendarWorkList);
        });
      },
      error: (error: any) => {
        console.log('Error', error);
      },
      complete: () => {
        console.log('Request complete');
      },
    });


  }
    

  resetForm() {
    this.projectTitle = null;
    this.workType = null;
    this.workStart = new Date();
    this.workEnd = new Date();
    this.selectedDate = new Date();
    this.workHours = 1;
    this.enterHours = false;
    this.description = '';
  }

  toggleEnterHours() {
    this.enterHours = !this.enterHours;
  }

  handleEventClick(clickInfo: EventClickArg) {
    const clickedEvent = this.employeeCalendarWorkList.find(event => event.employeeCalendarId === clickInfo.event.extendedProps['employeeCalendarId']);
    this.editWorkEvent(clickedEvent);
    this.employeeCalendarId = clickInfo.event.extendedProps['employeeCalendarId'];
    this.employeeCalendarIdForDelete = clickInfo.event.extendedProps['employeeCalendarId'];
    this.isEditMode = true;
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

  get groupedEvents() {
    const grouped = this.currentEvents.reduce((acc, event) => {
      const date = event.startStr.split('T')[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(event);
      return acc;
    }, {} as { [key: string]: EventApi[] });

    return Object.entries(grouped).map(([date, events]) => ({ date, events }));
  }

  ngAfterViewInit() {
    if (!this.calendarComponent) {
      console.error('CalendarComponent is not initialized.');
    } else {
      console.log('CalendarComponent initialized successfully.');
    }
  }

  lookupGetByTagNameProjectListGet(
    lookupGetByTagNameProjectList: ILookupGetByTagNameProjectList[]
  ) {
    this.projects = lookupGetByTagNameProjectList;
  }

  lookupGetByTagNameWorkTypeListGet(
    lookupGetByTagNameWorkTypeList: ILookupGetByTagNameWorkTypeList[]
  ) {
    this.typeofwork = lookupGetByTagNameWorkTypeList;
  }

  // convertUtcToLocal(utcDateTime: string): Date {
  //   return new Date(utcDateTime); // The Date constructor converts UTC string to local time
  // }

  calendar() {
    this.lookupGetByTagNameProjectService
      .lookupProjectDataGet()
      .subscribe((response: any) => {
        if (response.dataUpdateResponse && response.dataUpdateResponse.status) {
          this.projects = response.lookupGetByTagNameList;
          this.changeDetector.detectChanges();
        }
        if (
          response.dataUpdateResponse &&
          response.dataUpdateResponse.status &&
          response.lookupGetByTagNameProjectList
        ) {
          this.projects = response.lookupGetByTagNameList;
          console.log('Formatted Projects:', this.projects);
        }
      });

    this.lookupGetByTagNameWorkTypeService
      .lookupWorkTypeDataGet()
      .subscribe((response: any) => {
        if (response.dataUpdateResponse && response.dataUpdateResponse.status) {
          this.typeofwork = response.lookupGetByTagNameList;
          // console.log('Formatted Work Types:', this.typeofwork);
          this.changeDetector.detectChanges();
        }
        if (
          response.dataUpdateResponse &&
          response.dataUpdateResponse.status &&
          response.lookupGetByTagNameWorkTypeList
        ) {
          this.typeofwork = response.lookupGetByTagNameList;
          console.log('Formatted Work Types:', this.typeofwork);
        }
      });
  }
}


