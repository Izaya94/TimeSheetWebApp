import { IDataUpdateResponse } from "../shared/data-update-response";
import { IEmployeeCalendarDetailDTOResponse } from "./EmployeeCalendarDetail";

export interface IEmployeeCalendarDTOEdit{
    "dataUpdateResponse" : IDataUpdateResponse,
    "employeeCalendarDetail" : IEmployeeCalendarDetailDTOResponse
}

export interface EmployeeCalendarDTOEdit
{
    "EmployeeCalendarId": number,
    "CalendarDate": Date,
    "ProjectId": number,
    "WorkTypeId": number,
    "StartTime": number,
    "EndTime": number,
    "TotalTime": number,
    "Description": string
}