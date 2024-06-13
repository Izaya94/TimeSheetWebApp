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
    startTime: string;
    endTime: string;
    totalTime: number;
    description: string;
}