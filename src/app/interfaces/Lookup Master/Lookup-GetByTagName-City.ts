
import { IDataUpdateResponse } from "../shared/data-update-response"

export interface ILookupGetByTagNameCityResponse
{
    dataUpdateResponse: IDataUpdateResponse,
    lookupGetByTagNameCityList: ILookupGetByTagNameCityList[];
}

export interface ILookupGetByTagNameCityList
{
    "tagName": string,
    "keyValue": number,
    "keyData": string
}

