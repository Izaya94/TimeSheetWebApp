import { IDataUpdateResponse } from "../shared/data-update-response";
import { IEmployeeCalendarDTODetail, IEmployeeCalendarDetailDTOResponse } from "./EmployeeCalendarDetail";

export interface IEmployeeCalendarAdd {
    "dataUpdateResponse" : IDataUpdateResponse,
    "employeeCalendarDetail" : IEmployeeCalendarDTODetail,
}

export interface EmployeeCalendarDTOAdd
{
    "CalendarId" : number,
    "ProjectId" : number,
    "WorkTypeId" : number,
    "StartTime" : number,
    "EndTime" : number,
    "TotalTime" : number,
    "Description" : string
}