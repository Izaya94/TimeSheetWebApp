import { IDataUpdateResponse } from "../shared/data-update-response";
import { IEmployeeCalendarDetailDTOResponse } from "./EmployeeCalendarDetail";

export interface IEmployeeCalendarAdd {
    "dataUpdateResponse" : IDataUpdateResponse,
    "employeeCalendarDetail" : IEmployeeCalendarDetailDTOResponse,
}

export interface IEmployeeCalendarAddDTOResponse
{
    "CalendarId" : number,
    "ProjectId" : number,
    "WorkTypeId" : number,
    "StartTime" : number,
    "EndTime" : number,
    "TotalTime" : number,
    "Description" : string
}