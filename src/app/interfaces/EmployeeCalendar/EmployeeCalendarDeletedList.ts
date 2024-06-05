import { IDataUpdateResponse } from "../shared/data-update-response";

export interface IEmployeeCalendarDeletedDTOList{
    "dataUpdateResponse" : IDataUpdateResponse,
    "employeeCalendarDeletedDTOList": IEmployeeCalendarDeletedDTOList
}

export interface IEmployeeCalendarDeletedDTOList{
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