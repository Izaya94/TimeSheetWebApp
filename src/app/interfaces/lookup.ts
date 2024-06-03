import { IDataUpdateResponse } from "./shared/data-update-response"

export interface ILookupList {
    "lookupId": number,
    "tagName": string,
    "keyValue": number,
    "keyData": string,
    "note": string,
    "referenceTable": string
}

export interface ILookupListResponse {
    "dataUpdateResponse": IDataUpdateResponse,
    "lookupList": ILookupList[]
}