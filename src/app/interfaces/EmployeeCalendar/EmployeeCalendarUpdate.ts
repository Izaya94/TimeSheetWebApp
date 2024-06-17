import { IDataUpdateResponse } from "../shared/data-update-response";
import { IEmployeeCalendarDTODetail } from "./EmployeeCalendarDetail";

export interface IEmployeeCalendarDTOEdit{
    "dataUpdateResponse" : IDataUpdateResponse,
    "employeeCalendarDetail" : IEmployeeCalendarDTODetail
}

export interface EmployeeCalendarDTOEdit
{
    "EmployeeCalendarId": number,
    "CalendarDate": Date,
    "ProjectId": number,
    "WorkTypeId": number,
    "StartTime": Date,
    "EndTime": Date,
    "TotalTime": number,
    "Description": string
}