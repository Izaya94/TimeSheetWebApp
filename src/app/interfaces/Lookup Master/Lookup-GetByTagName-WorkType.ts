
import { IDataUpdateResponse } from "/Users/pujar/OneDrive/Desktop/Vscode/TimeSheet_Web/TimeSheetWebApp/src/app/interfaces/shared/data-update-response";


export interface ILookupGetByTagNameWorkTypeResponse
{
    "dataUpdateResponse": IDataUpdateResponse,
    "lookupGetByTagNameWorkTypeList": ILookupGetByTagNameWorkTypeList[],
}

export interface ILookupGetByTagNameWorkTypeList
{
    "tagName": string,
    "keyValue": number,
    "keyData": string
}

