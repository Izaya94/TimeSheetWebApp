import { IDataUpdateResponse } from "../shared/data-update-response";

export interface IEmployeeCalendarDTODelete {
    "dataUpdateResponse" : IDataUpdateResponse,
}

export interface EmployeeCalendarDTODelete 
{
    employeeCalendarId: number
}