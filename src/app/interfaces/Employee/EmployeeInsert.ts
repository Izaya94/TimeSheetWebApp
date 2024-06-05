import { IDataUpdateResponse } from "../shared/data-update-response";
import { IEmployeeDTODetail } from "./EmployeeDetail";

export interface IEmployeeDTOAdd{
    "dataUpdateResponse": IDataUpdateResponse,
    "employeeDetail": IEmployeeDTODetail
}

export interface EmployeeDTOAdd{
    "EmployeeName": string,
    "BirthDate": Date,
    "ContactNumber1": string,
    "ContactNumber2": string,
    "Email1": string,
    "Email2": string,
    "JoinedOn": Date,
    "DesignationId": number
}

