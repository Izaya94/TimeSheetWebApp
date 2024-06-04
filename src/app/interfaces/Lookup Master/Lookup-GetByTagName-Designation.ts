
import { IDataUpdateResponse } from "../shared/data-update-response"

export interface ILookupGetByTagNameDesignationResponse
{
    "dataUpdateResponse": IDataUpdateResponse,
    "lookupGetByTagNameDesignationList": ILookupGetByTagNameDesignationList[];
}

export interface ILookupGetByTagNameDesignationList
{
    "tagName": string,
    "keyValue": number,
    "keyData": string
}

