import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild, signal } from '@angular/core';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventApi, EventClickArg } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { INITIAL_EVENTS, createEventId } from './event-utils';
import {  DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { IProjectsList } from '../../interfaces/projects-list';
import { ITypeOfWork } from '../../interfaces/type-of-work';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { ToastService } from '../../services/toast.service';
import { Message, MessageService } from 'primeng/api';
@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [FullCalendarModule, CommonModule, RouterOutlet, DialogModule, InputTextModule, ButtonModule, FormsModule, CalendarModule, DropdownModule, CheckboxModule, ToastModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
  providers: [MessageService]
})
export class CalendarComponent implements OnInit, AfterViewInit{
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  visible: boolean = false;
  maximizable: boolean = true;
  workType: ITypeOfWork | null = null;
  projectTitle: IProjectsList | null = null;
  projects: IProjectsList[] = []; 
  typeofwork: ITypeOfWork[] = [];
  workStart: Date = new Date();
  workEnd: Date = new Date();
  selectedDate: string = '';
  calendarVisible = signal(true);
  calendarOptions = signal<CalendarOptions>({
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
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
    eventsSet: this.handleEvents.bind(this)
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  });
  currentEvents: EventApi[] = [];
  enterHours: boolean = false;
  workHours: number = 1;

  constructor(private changeDetector: ChangeDetectorRef, private messageService: MessageService) {
  }
  ngOnInit(){
      this.projects = [
          { name: 'A' },
          { name: 'B' },
          { name: 'C' },
          { name: 'D' },
          { name: 'E' }
      ];
      this.typeofwork = [
        { name: 'Design' },
        { name: 'Coding' },
        { name: 'Testing' },
        { name: 'Research' },
        { name: 'Support' }
    ];

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
    // const title = prompt('Please enter a new title for your event');
    // const calendarApi = selectInfo.view.calendar;

    // calendarApi.unselect(); // clear date selection

    // if (title) {
    //   calendarApi.addEvent({
    //     // id: createEventId(),
    //     title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay
    //   });
    // }
    this.selectedDate = selectInfo.startStr;

    

    this.workStart = new Date(selectInfo.startStr);
    this.workStart.setHours(new Date().getHours());
    this.workStart.setMinutes(0);
    this.workStart.setSeconds(0);

    this.workEnd = new Date(this.workStart.getTime());
    this.workEnd.setHours(this.workEnd.getHours()+ 1);

    this.visible = true;
  }

  addWork(){
    console.log('Project Title:', this.projectTitle);
    console.log('Work Type:', this.workType);
    console.log('Work Start:', this.workStart);
    console.log('Work End:', this.workEnd);

    if (!this.calendarComponent) {
      console.error('CalendarComponent is not available.');
      return;
    }

    if (this.workHours < 1) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hours must be greater than 0.' });
      return;
    }
    
    const calendarApi = this.calendarComponent.getApi();
    if (this.projectTitle && this.workType && this.workStart && this.workEnd) {
      
      const projectTitle = (this.projectTitle as IProjectsList).name;
      const workType = (this.workType as ITypeOfWork).name;

      // const duration = (this.workEnd.getTime() - this.workStart.getTime()) / (1000 * 60 * 60);

      let duration = 0;
      let eventStart = this.workStart;
      let eventEnd = this.workEnd;

      // const startTime = this.workStart.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      // const endTime = this.workEnd.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      if (this.enterHours){
        // eventEnd = new Date(eventStart.getTime() + this.workHours * 60 * 60 * 1000);
        duration = this.workHours;
      } else {
        duration = (eventEnd.getTime() - eventStart.getTime()) / (1000 * 60 * 60);
      }

      calendarApi.addEvent({
        // title:  `${projectTitle} - ${workType} (${startTime} - ${endTime}, ${duration.toFixed(2)} hrs)`,
        title:  `${projectTitle} - ${workType} (${duration.toFixed(2)} hrs)`,
        start: this.workStart,
        end: this.workEnd,
        allDay: false
      });
      this.visible = false;
      this.projectTitle = null;
      this.workType = null;
      this.workStart = new Date();
      this.workEnd = new Date();
      this.selectedDate = '';

      this.messageService.add({severity:'success', summary: 'Success', detail:('Work added successfully.')})

      // this.toastService.showSuccess('Work added successfully.');
    }
    else {
      this.messageService.add({severity:'error', summary: 'Error', detail:('Please fill in all required fields.')})
      //   this.toastService.showError('Please fill in all required fields.');
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
  }

  toggleEnterHours() {
    this.enterHours = !this.enterHours;
  }
  
  

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = (events);
    this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
  }

  get groupedEvents() {
    const grouped = this.currentEvents.reduce ((acc, event) => {
      const date = event.startStr.split('T')[0];
      if (!acc[date]){
        acc[date] = [];
      }
      acc[date].push(event);
      return acc;
    }, {} as { [key: string]: EventApi[]});

    return Object.entries(grouped).map(([date, events]) => ({date, events}));
  }

  ngAfterViewInit() {
    if (!this.calendarComponent) {
      console.error('CalendarComponent is not initialized.');
    } else {
      console.log('CalendarComponent initialized successfully.');
    }
  }

}