
import { IDataUpdateResponse } from "/Users/pujar/OneDrive/Desktop/Vscode/TimeSheet_Web/TimeSheetWebApp/src/app/interfaces/shared/data-update-response";


export interface ILookupGetByTagNameDesignationResponse
{
    "dataUpdateResponse": IDataUpdateResponse,
    "lookupGetByTagNameDesignationList": ILookupGetByTagNameDesignationList[],
}

export interface ILookupGetByTagNameDesignationList
{
    "tagName": string,
    "keyValue": number,
    "keyData": string
}

