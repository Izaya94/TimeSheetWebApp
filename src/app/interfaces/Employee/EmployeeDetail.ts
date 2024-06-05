import { IDataUpdateResponse } from "../shared/data-update-response";

export interface IEmployeeDetailDTOResponse{
    "dataUpdateResponse" : IDataUpdateResponse,
    "employeeDetail" : IEmployeeDTODetail
}

export interface IEmployeeDTODetail{
    "EmployeeId" : number,
    "EmployeeName" : string,
    "BirthDate" : Date,
    "ContactNumber1" : string,
    "ContactNumber2" : string,
    "Email1" : string,
    "Email2" : string,
    "JoinedOn" : Date,
    "DesignationId" : number,
    "Designation" : string,
    "CreatedBy" : string,
    "CreatedByIpAddress" : string,
    "CreatedOn" : string,
    "ModifiedBy" : string,
    "ModifiedByIpAddress" : string,
    "ModifiedOn" : string,
    "IsDeleted" : boolean,
    "DeletedBy" : string
    "DeletedByIpAddress" : string,
    "DeletedOn" : string,
    
}