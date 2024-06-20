import { IDataUpdateResponse } from "../shared/data-update-response";

export interface IEmployeeDTODelete {
    "dataUpdateResponse" : IDataUpdateResponse,
}

export interface EmployeeDTODelete 
{
    employeeCalendarId: number
}