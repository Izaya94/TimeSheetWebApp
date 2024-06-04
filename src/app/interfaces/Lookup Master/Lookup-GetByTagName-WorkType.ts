import { IDataUpdateResponse } from "../shared/data-update-response";

export interface ILookupGetByTagNameWorkTypeResponse
{
    "dataUpdateResponse": IDataUpdateResponse,
    "lookupGetByTagNameList": ILookupGetByTagNameWorkTypeList[];
}

export interface ILookupGetByTagNameWorkTypeList
{
    "tagName": string,
    "keyValue": number,
    "keyData": string
}

