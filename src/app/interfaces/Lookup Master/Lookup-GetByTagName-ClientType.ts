
import { IDataUpdateResponse } from "../shared/data-update-response"

export interface ILookupGetByTagNameClientTypeResponse
{
    dataUpdateResponse: IDataUpdateResponse;
    lookupGetByTagNameClientTypeList: ILookupGetByTagNameClientTypeList[];
}

export interface ILookupGetByTagNameClientTypeList
{
    "tagName": string,
    "keyValue": number,
    "keyData": string
}

