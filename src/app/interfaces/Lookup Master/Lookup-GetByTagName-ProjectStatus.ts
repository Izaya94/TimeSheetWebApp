
import { IDataUpdateResponse } from "../shared/data-update-response"

export interface ILookupGetByTagNameProjectStatusResponse
{
    dataUpdateResponse: IDataUpdateResponse,
    lookupGetByTagNameProjectStatusList: ILookupGetByTagNameProjectStatusList[];
}

export interface ILookupGetByTagNameProjectStatusList
{
    "tagName": string,
    "keyValue": number,
    "keyData": string
}

