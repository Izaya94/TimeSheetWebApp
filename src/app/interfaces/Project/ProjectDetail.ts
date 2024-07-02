import { IDataUpdateResponse } from "../shared/data-update-response";

export interface ProjectDetailDTOResponse {
    dataUpdateResponse: IDataUpdateResponse | null;
    projectDetail: ProjectDTODetail | null;
}

export interface ProjectDTODetail {
    projectId: number;
    projectName: string | null;
    clientId: number;
    clientName: string | null;
    startDate: string;
    endDate: string;
    description: string | null;
    statusCode: number;
    projectStatus: string | null;
    statusNotes: string | null;
    createdBy: string | null;
    createdByIpAddress: string | null;
    createdOn: string;
    modifiedBy: string | null;
    modifiedByIpAddress: string | null;
    modifiedOn: string | null;
    isDeleted: string | null;
    deletedBy: string | null;
    deletedByIpAddress: string | null;
    deletedOn: string | null;
}