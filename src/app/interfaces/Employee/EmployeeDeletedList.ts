import { IDataUpdateResponse } from "../shared/data-update-response";

export interface IEmployeeDeletedListDTOResponse{
    "dataUpdateResponse": IDataUpdateResponse,
    "employeeDeletedList ": IEmployeeDeletedDTOList
}

export interface IEmployeeDeletedDTOList{
    "EmployeeId": number,
    "EmployeeName": string,
    "BirthDate": Date,
    "ContactNumber1": string,
    "ContactNumber2": string,
    "Email1": string,
    "Email2": string,
    "JoinedOn": Date,
    "DesignationId": number,
    "Designation": string,
}