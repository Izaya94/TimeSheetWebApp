import { IDataUpdateResponse } from "../shared/data-update-response";
import { ProjectDTODetail } from "./ProjectDetail";

export interface IProjectDTOEdit {
    dataUpdateResponse: IDataUpdateResponse;
    projectDetail: ProjectDTODetail;
}


export interface ProjectDTOEdit {
    projectId: number;
    projectName: string | null;
    clientName: string | null;
    startDate: string;
    endDate: string;
    description: string | null;
    statusCode: number;
    statusNotes: string | null;
}