import { IDataUpdateResponse } from "../shared/data-update-response";

export interface IEmployeeCalendarDTOList{
    "dataUpdateResponse" : IDataUpdateResponse,
    "employeeCalendarDTOList": IEmployeeCalendarDTOList
}

export interface IEmployeeCalendarDTOList{
    "EmployeeCalendarId" : number,
    "CalendarId": number,
    "Date": string,
    "ProjectId": number,
    "Project": string,
    "WorkTypeId": number,
    "WorkType": string,
    "StartTime": number,
    "EndTime": number,
    "TotalTime": number,
    "Description": string
}