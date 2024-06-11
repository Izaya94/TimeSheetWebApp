import { IDataUpdateResponse } from "../shared/data-update-response";


export interface IEmployeeCalendarDetailDTOResponse{
    "dataUpdateResponse": IDataUpdateResponse,
    "employeeCalendarDetail": IEmployeeCalendarDTODetail
}



export interface IEmployeeCalendarDTODetail{
    "EmployeeCalendarId" : number,
    "CalendarId" : number,
    "ProjectId" : number,
    "WorkTypeId" : number,
    "StartTime" : number,
    "EndTime" : number,
    "TotalTime" : number,
    "Description" : string,
    "CreatedBy" : string,
    "CreatedByIpAddress" : string,
    "CreatedOn" : string,
    "ModifiedBy" : string,
    "ModifiedByIpAddress" : string,
    "ModifiedOn" : string,
    "IsDeleted" : boolean,
    "DeletedBy" : string,
    "DeletedByIpAddress" : string,
    "DeletedOn" : string,
}