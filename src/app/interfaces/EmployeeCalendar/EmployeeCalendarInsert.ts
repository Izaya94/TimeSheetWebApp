import { IDataUpdateResponse } from "../shared/data-update-response";
import { IEmployeeCalendarDTODetail } from "./EmployeeCalendarDetail";

export interface IEmployeeCalendarDTOAdd {
    "dataUpdateResponse" : IDataUpdateResponse,
    "employeeCalendarDetail" : IEmployeeCalendarDTODetail,
}

export interface EmployeeCalendarDTOAdd 
{
    "CalendarDate" : Date,
    "ProjectId" : number,
    "WorkTypeId" : number,
    "StartTime" : Date,
    "EndTime" : Date,
    "TotalTime" : number,
    "Description" : string,
    // "Timezone" : string
}