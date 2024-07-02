import { IDataUpdateResponse } from "../shared/data-update-response";

export interface IProjectDTOResponse {
    dataUpdateResponse: IDataUpdateResponse | null;
    projectList: ProjectDTOList[];
}

export interface ProjectDTOList {
    projectId: number;
    projectName: string | null;
    clientId: number;
    clientName: string | null;
    startTime: string;
    endTime: string;
    description: string | null;
    statusCode: number;
    projectStatus: string | null;
    statusNotes: string | null;
}