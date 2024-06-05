import { IDataUpdateResponse } from "../shared/data-update-response"

export interface ILookupGetByTagNameProjectResponse
{
    "dataUpdateResponse": IDataUpdateResponse,
    "LookupGetByTagNameProjectList": ILookupGetByTagNameProjectList[];
}

export interface ILookupGetByTagNameProjectList
{
    "tagName": string;
    "keyValue": number;
    "keyData": string;
}

