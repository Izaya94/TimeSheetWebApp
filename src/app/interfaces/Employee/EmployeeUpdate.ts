import { IDataUpdateResponse } from "../shared/data-update-response";
import { IEmployeeDTODetail } from "./EmployeeDetail";

export interface IEmployeeDTOEdit{
    "dataUpdateResponse": IDataUpdateResponse,
    "employeeDetail": IEmployeeDTODetail
}

export interface EmployeeDTOEdit{
    "EmployeeId": number,
    "EmployeeName": string,
    "BirthDate": Date,
    "ContactNumber1": string,
    "ContactNumber2": string,
    "Email1": string,
    "Email2": string,
    "JoinedOn": Date,
    "DesignationId": number
}