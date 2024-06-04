import { IDataUpdateResponse } from "../shared/data-update-response"

export interface ILookupGetByTagNameProjectResponse
{
    "dataUpdateResponse": IDataUpdateResponse,
    "lookupGetByTagNameList": ILookupGetByTagNameProjectList[];
}

export interface ILookupGetByTagNameProjectList
{
    "tagName": string;
    "keyValue": number;
    "keyData": string;
}

