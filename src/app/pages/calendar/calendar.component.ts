import { ChangeDetectorRef, Component, OnInit, ViewChild, signal } from '@angular/core';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventApi, EventClickArg } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { INITIAL_EVENTS, createEventId } from './event-utils';
import { Dialog, DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { IProjectsList } from '../../interfaces/projects-list';
import { ITypeOfWork } from '../../interfaces/type-of-work';
import { DropdownModule } from 'primeng/dropdown';
@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [FullCalendarModule, CommonModule, RouterOutlet, DialogModule, InputTextModule, ButtonModule, FormsModule, CalendarModule, DropdownModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit{
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  visible: boolean = false;
  maximizable: boolean = true;
  workType: string = '';
  projectTitle: string = '';
  projects!: IProjectsList[]; 
  typeofwork!: ITypeOfWork[];
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

  constructor(private changeDetector: ChangeDetectorRef) {
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
    this.workEnd = new Date(selectInfo.endStr);
    this.visible = true;
  }

  addWork(){
    const calendarApi = this.calendarComponent.getApi();
    if (this.workType && this.workStart && this.workEnd) {
      calendarApi.addEvent({
        title: this.workType,
        start: this.workStart,
        end: this.workEnd,
        allDay: false
      });
      this.visible = false;
      this.projectTitle = '';
      this.workType = '';
      this.workStart = new Date();
      this.workEnd = new Date();
      this.selectedDate = '';
    }
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

}