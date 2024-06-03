
import { IDataUpdateResponse } from "/Users/pujar/OneDrive/Desktop/Vscode/TimeSheet_Web/TimeSheetWebApp/src/app/interfaces/shared/data-update-response";


export interface ILookupGetByTagNameProjectResponse
{
    "dataUpdateResponse": IDataUpdateResponse,
    "lookupGetByTagNameProjectList": ILookupGetByTagNameProjectList[],
}

export interface ILookupGetByTagNameProjectList
{
    "tagName": string,
    "keyValue": number,
    "keyData": string
}

