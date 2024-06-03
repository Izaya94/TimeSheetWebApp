import { IDataUpdateResponse } from "./shared/data-update-response"

export interface IRoleResponse
{
    "dataUpdateResponse": IDataUpdateResponse,
    "roleResponseList": IRole[]
}

export interface IRole
{
    "id": string,
    "name": string,
    "totalUsers": number
}

