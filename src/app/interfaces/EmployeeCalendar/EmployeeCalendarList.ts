import { IDataUpdateResponse } from "../shared/data-update-response";

export interface IEmployeeCalendarDTOResponse {
    dataUpdateResponse: IDataUpdateResponse | null;
    employeeCalendarList: IEmployeeCalendarDTOList[];
}

export interface IEmployeeCalendarDTOList {
    employeeCalendarId: number;
    calendarId: number;
    date: Date;
    projectId: number;
    project: string;
    workTypeId: number;
    workType: string;
    title: string;
    start: Date;
    end: Date;
    totalTime: number;
    description: string;
}