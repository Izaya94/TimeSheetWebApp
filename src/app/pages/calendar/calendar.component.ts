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
import { Title } from '@angular/platform-browser';
import { IEmployeeCalendarDTOList } from '../../interfaces/EmployeeCalendar/EmployeeCalendarList';
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
  // employee!: IEmployeeCalendarList[];
  workType: ILookupGetByTagNameWorkTypeList | null = null;
  projectTitle: ILookupGetByTagNameProjectList | null = null;
  projects!: ILookupGetByTagNameProjectList[];
  employeeCalendarWorkList!: IEmployeeCalendarDTOList[];
  typeofwork!: ILookupGetByTagNameWorkTypeList[];
  workStart: Date = new Date();
  workEnd: Date = new Date();
  selectedDate: Date = new Date();
  description: string = '';
  calendarVisible = signal(true);

  calendarEvents: EventInput[] = [];
  currentEvents: EventApi[] = [];
  enterHours: boolean = false;
  workHours: number = 1;
  calendarOptions: any;
  // calendarOptions: CalendarOptions = {};

  constructor(
    private changeDetector: ChangeDetectorRef,
    private messageService: MessageService,
    private lookupGetByTagNameWorkTypeService: LookupGetByTagNameWorkTypeService,
    private lookupGetByTagNameProjectService: LookupGetByTagNameProjectService,
    private employeeCalendarInsertService: EmployeeCalendarInsertService,
    private timezoneService: UserTimezoneService,
    private employeeCalendarListService: EmployeeCalendarListService
  ) {}
  ngOnInit() {
    const timezone = this.timezoneService.getTimezone();

    // console.log(timezone);
    // this.fetchCalendarData(timezone);

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
      // initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
      // weekends: true,
      editable: true,
      selectable: true,
      displayEventTime: false,
      // selectMirror: true,
      // dayMaxEvents: true,
      events: this.employeeCalendarWorkList,
      select: this.handleDateSelect.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventsSet: this.handleEvents.bind(this),
      /* you can update a remote database when these fire:
      eventAdd:
      eventChange:
      eventRemove:
      */
    });
    
  }

  // fetchCalendarData(timezone: string): void {
  //   this.employeeCalendarListService
  //     .getEmployeeCalendarList()
  //     .subscribe((response: any) => {
  //       if (response.dataUpdateResponse && response.dataUpdateResponse.status) {
  //         this.employeeCalendarWorkList = response.employeeCalendarList;
  //         console.log(
  //           'Employee Calendar List',
  //           timezone,
  //           this.employeeCalendarWorkList
  //         );
  //         this.changeDetector.detectChanges();
  //       }
  //       if (
  //         response.dataUpdateResponse &&
  //         response.dataUpdateResponse.status &&
  //         response.lookupGetByTagNameProjectList
  //       ) {
  //         this.employeeCalendarWorkList = response.employeeCalendarList;
  //         console.log(
  //           'Formatted Calendar List:',
  //           timezone,
  //           this.employeeCalendarWorkList
  //         );
  //       }
  //     });
  // }

  // initializeCalendarOptions() {
  //   this.calendarOptions = {
  //     plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
  //     headerToolbar:{
  //       left: 'prev, next today',
  //       center: 'title',
  //       right: 'dayGridMonth, timeGridWeek, timeGridDay, listWeek',
  //     },
  //     initialView: 'dayGridMonth',
  //     editable: true,
  //     selectable: true,
  //     events: this.employeeCalendarWorkList.map(event => ({
  //       title: event.Date,
  //       start: event.StartTime,
  //       end: event.EndTime
  //     })),
  //     select: this.handleDateSelect.bind(this),
  //     eventClick: this.handleEventClick.bind(this),
  //     eventsSet: this.handleEvents.bind(this)
  //   }
  // }

  handleCalendarToggle() {
    this.calendarVisible.update((bool) => !bool);
  }

  // handleWeekendsToggle() {
  //   this.calendarOptions.update((options) => ({
  //     ...options,
  //     weekends: !options.weekends,
  //   }));
  // }

  handleDateSelect(selectInfo: DateSelectArg) {
    this.selectedDate = new Date(selectInfo.startStr);

    this.workStart = new Date(selectInfo.startStr);
    this.workStart.setHours(new Date().getHours());
    this.workStart.setMinutes(0);
    this.workStart.setSeconds(0);

    this.workEnd = new Date(this.workStart.getTime());
    this.workEnd.setHours(this.workEnd.getHours() + 1);

    this.visible = true;
  }

  addWork() {
    console.log('Project Title:', this.projectTitle);
    console.log('Work Type:', this.workType);
    console.log('Work Start:', this.workStart);
    console.log('Work End:', this.workEnd);
    console.log('Description:', this.description);
    console.log('Total Hours: ', this.workHours);
    console.log('Enter Hours: ', this.enterHours);

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

    // const utcDateTimeStringCalendarDate = this.selectedDate.toISOString();
    // const utcDateTimeStringStartTime = this.workStart.toISOString();
    // const utcDateTimeStringEndTime = this.workEnd.toISOString();

    // const localCalendarDate = new Date(this.selectedDate.getTime() - this.selectedDate.getTimezoneOffset() * 60000);
    // const localStartTime = new Date(this.workStart.getTime() - this.workStart.getTimezoneOffset() * 60000);
    // const localEndTime = new Date(this.workEnd.getTime() - this.workEnd.getTimezoneOffset() * 60000);

    const employeeCalendarDTOAdd: EmployeeCalendarDTOAdd = {
      CalendarDate: this.selectedDate,
      ProjectId: this.projectTitle!.keyValue,
      WorkTypeId: this.workType!.keyValue,
      StartTime: this.workStart,
      EndTime: this.workEnd,
      TotalTime: this.workHours,
      Description: this.description,
      // Timezone: timezone,
    };

    console.log(employeeCalendarDTOAdd);

    this.employeeCalendarInsertService
      .insertEmployeeCalendarData(employeeCalendarDTOAdd)
      .subscribe({
        next: (response: IEmployeeCalendarDTOAdd) => {
          console.log('Employee added', response);
        },
        error: (error: any) => {
          console.log('Error', error);
        },
        complete: () => {
          console.log('Request complete');
        },
      });
  }

  editWork(event: any){
      console.log(event);

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
    this.editWork(clickedEvent);
    if (clickedEvent) {
      // Populate form fields with event data
      this.projectTitle = this.projects.find(project => project.keyValue === clickedEvent.projectId) || null;
      this.workType = this.typeofwork.find(workType => workType.keyValue === clickedEvent.workTypeId) || null;
      this.workStart = new Date(clickedEvent.startTime);
      this.workEnd = new Date(clickedEvent.endTime);
      this.selectedDate = new Date(clickedEvent.startTime);
      this.description = clickedEvent.description || '';
      this.workHours = clickedEvent.totalTime;
      this.enterHours = !!clickedEvent.totalTime;
      
      // Show the dialog with pre-filled data
      this.visible = true;
    }

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
    // console.log(this.projects);
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

  calendar() {
    this.lookupGetByTagNameProjectService
      .lookupProjectDataGet()
      .subscribe((response: any) => {
        // console.log('Full Project Response:', response);
        if (response.dataUpdateResponse && response.dataUpdateResponse.status) {
          this.projects = response.lookupGetByTagNameList;
          // console.log('Formatted Projects:', this.projects);
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
        // console.log('Full Work Type Response:', response);
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

  // getEventTitle(event: EventApi): string {
  //   console.log(event.toJSON());
  //   if (!event.extendedProps || !event.extendedProps['keyValue']) {
  //     return 'No title available';
  //   }

  //   const tags = event.extendedProps['keyValue'] as ILookupGetByTagNameProjectList[];
  //   if (tags.length === 0) {
  //     return 'No title available';
  //   }

  //   // Assuming each tag object has a `tagName` property
  //   return tags.map(tag => tag.tagName).join(', ');
  // }
}


