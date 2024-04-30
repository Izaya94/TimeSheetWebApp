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


export interface IDataUpdateResponse
{
    "status" : boolean,
    "description": string,
    "recordCount": number
}