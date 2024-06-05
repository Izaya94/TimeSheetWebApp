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
import { HttpClient } from '@angular/common/http';

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
  workType: ILookupGetByTagNameProjectList[] | null = null;
  projectTitle: ILookupGetByTagNameProjectList[] | null = null;
  projects!: ILookupGetByTagNameProjectList[];
  typeofwork!: ILookupGetByTagNameProjectList[];
  workStart: Date = new Date();
  workEnd: Date = new Date();
  selectedDate: string = '';
  description: string = '';
  calendarVisible = signal(true);
  calendarOptions = signal<CalendarOptions>({
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    initialView: 'dayGridMonth',
    // initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  });
  currentEvents: EventApi[] = [];
  enterHours: boolean = false;
  workHours: number = 1;

  constructor(
    private http: HttpClient,
    private changeDetector: ChangeDetectorRef,
    private messageService: MessageService,
    private lookupGetByTagNameWorkTypeService: LookupGetByTagNameWorkTypeService,
    private lookupGetByTagNameProjectService: LookupGetByTagNameProjectService
  ) {}
  ngOnInit() {
    this.calendar();
  }

  handleCalendarToggle() {
    this.calendarVisible.update((bool) => !bool);
  }

  handleWeekendsToggle() {
    this.calendarOptions.update((options) => ({
      ...options,
      weekends: !options.weekends,
    }));
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    this.selectedDate = selectInfo.startStr;

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
    console.log('Description', this.description);
    console.log('Work Start:', this.workStart);
    console.log('Work End:', this.workEnd);

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
      });
      this.visible = false;
      this.projectTitle = null;
      this.workType = null;
      this.workStart = new Date();
      this.workEnd = new Date();
      this.selectedDate = '';

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
  }

  resetForm() {
    this.projectTitle = null;
    this.workType = null;
    this.workStart = new Date();
    this.workEnd = new Date();
    this.selectedDate = '';
    this.workHours = 1;
    this.enterHours = false;
    this.description = '';
  }

  toggleEnterHours() {
    this.enterHours = !this.enterHours;
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
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
  }

  lookupGetByTagNameProjectListGet(lookupGetByTagNameProjectList: ILookupGetByTagNameProjectList[]) {
    this.projects = lookupGetByTagNameProjectList;
  }

  lookupGetByTagNameWorkTypeListGet(lookupGetByTagNameWorkTypeList: ILookupGetByTagNameWorkTypeList[] ) {
    this.typeofwork = lookupGetByTagNameWorkTypeList;
  }

  calendar() {
    this.lookupGetByTagNameProjectService.lookupProjectDataGet().subscribe((response: any) => {
      console.log('Full Project Response:', response);
      if (response.dataUpdateResponse && response.dataUpdateResponse.status) {
        this.projects = response.lookupGetByTagNameList;
        console.log('Formatted Projects:', this.projects);
        this.changeDetector.detectChanges();
      }
      if (response.dataUpdateResponse && response.dataUpdateResponse.status && response.lookupGetByTagNameProjectList) {
        this.projects = response.lookupGetByTagNameList;
        console.log('Formatted Projects:', this.projects);
      }
    });
    
    this.lookupGetByTagNameWorkTypeService.lookupWorkTypeDataGet().subscribe((response: any) => {
      console.log('Full Work Type Response:', response);
      if (response.dataUpdateResponse && response.dataUpdateResponse.status) {
        this.typeofwork = response.lookupGetByTagNameList;
        console.log('Formatted Work Types:', this.typeofwork);
        this.changeDetector.detectChanges();
      }
      if (response.dataUpdateResponse && response.dataUpdateResponse.status && response.lookupGetByTagNameWorkTypeList) {
        this.typeofwork = response.lookupGetByTagNameList;
        console.log('Formatted Work Types:', this.typeofwork);
      }
    });
    
    
  };
  

  submitForm(){
    const formData = {
      projectTitle: this.projectTitle,
      workType: this.workType,
      description: this.description,
      workStart: this.workStart,
      workEnd: this.workEnd,
      workHours: this.workHours,
      selectedDate: this.projectTitle,
    }

    this.http.post('https://your-api-endpoint.com/submit-work', formData).subscribe(
      (response) => {
        console.log('Form submitted successfully:', response);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Work added successfully.',
        });
      },
      (error) => {
        console.error('Error submitting form:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to add work.',
        });
      }
    );
  }
}
