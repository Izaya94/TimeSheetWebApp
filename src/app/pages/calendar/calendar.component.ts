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
import { CommonModule } from '@angular/common';
// import { INITIAL_EVENTS, createEventId } from './event-utils';
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
import { UserTimezoneService } from '../../services/user-timezone.service';
import { EmployeeCalendarListService } from '../../services/EmployeeCalendarServices/employee-calendar-list.service';
import { IEmployeeCalendarDTOList } from '../../interfaces/EmployeeCalendar/EmployeeCalendarList';
import { EmployeeCalendarEditService } from '../../services/EmployeeCalendarServices/employee-calendar-edit.service';
import { EmployeeCalendarDTOEdit, IEmployeeCalendarDTOEdit } from '../../interfaces/EmployeeCalendar/EmployeeCalendarUpdate';
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
  providers: [MessageService],
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
  calendarVisible = signal(true);
  isEditMode: boolean = false;
  calendarEvents: EventInput[] = [];
  currentEvents: EventApi[] = [];
  enterHours: boolean = false;
  workHours: number = 1;
  calendarOptions: any;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private messageService: MessageService,
    private lookupGetByTagNameWorkTypeService: LookupGetByTagNameWorkTypeService,
    private lookupGetByTagNameProjectService: LookupGetByTagNameProjectService,
    private employeeCalendarInsertService: EmployeeCalendarInsertService,
    private timezoneService: UserTimezoneService,
    private employeeCalendarListService: EmployeeCalendarListService,
    private employeeCalendarEditService: EmployeeCalendarEditService
  ) {}
  ngOnInit() {
    const timezone = this.timezoneService.getTimezone();

    this.employeeCalendarListService.getEmployeeCalendarList().subscribe(data=> {
      this.employeeCalendarWorkList = data.employeeCalendarList;
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
      events: this.employeeCalendarWorkList,
      select: this.handleDateSelect.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventsSet: this.handleEvents.bind(this),

    });
    
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

    const calendarApi = this.calendarComponent.getApi();
    if (this.projectTitle && this.workType && this.workStart && this.workEnd) {
      let duration = 0;
      let eventStart = this.workStart;
      let eventEnd = this.workEnd;

      if (this.enterHours) {
        duration = this.workHours;
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

    const employeeCalendarDTOAdd: EmployeeCalendarDTOAdd = {
      CalendarDate: this.selectedDate,
      ProjectId: this.projectTitle!.keyValue,
      WorkTypeId: this.workType!.keyValue,
      StartTime: this.workStart,
      EndTime: this.workEnd,
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
              startTime: this.convertUtcToLocal(event.startTime).toISOString(),
              endTime: this.convertUtcToLocal(event.endTime).toISOString()
            }));
            
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
      this.workStart = new Date(clickedEvent.startTime);
      this.workEnd = new Date(clickedEvent.endTime);
      this.selectedDate = new Date(clickedEvent.startTime);
      this.description = clickedEvent.description || '';
      this.workHours = clickedEvent.totalTime;
      this.enterHours = !!clickedEvent.totalTime;
      
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

    const calendarApi = this.calendarComponent.getApi();
    if (this.projectTitle && this.workType && this.workStart && this.workEnd) {
      let duration = 0;
      let eventStart = this.workStart;
      let eventEnd = this.workEnd;

      if (this.enterHours) {
        duration = this.workHours;
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

    const employeeCalendarDTOEdit: EmployeeCalendarDTOEdit = {
      EmployeeCalendarId: this.employeeCalendarId,
      CalendarDate: this.selectedDate,
      ProjectId: this.projectTitle!.keyValue,
      WorkTypeId: this.workType!.keyValue,
      StartTime: this.workStart,
      EndTime: this.workEnd,
      TotalTime: this.workHours,
      Description: this.description,
    };

    console.log(employeeCalendarDTOEdit);

    this.employeeCalendarEditService
      .insertEmployeeCalendarData(employeeCalendarDTOEdit)
      .subscribe({
        next: (response: IEmployeeCalendarDTOEdit) => {
          console.log('Employee Calendar Edited', response);
          this.employeeCalendarListService.getEmployeeCalendarList().subscribe(data=> {
            this.employeeCalendarWorkList = data.employeeCalendarList;
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

  convertUtcToLocal(utcDateTime: string): Date {
    return new Date(utcDateTime); // The Date constructor converts UTC string to local time
  }

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


