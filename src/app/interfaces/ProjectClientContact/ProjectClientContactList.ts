import { IDataUpdateResponse } from "../shared/data-update-response";

export interface IProjectClientContactDTOResponse {
    dataUpdateResponse: IDataUpdateResponse | null;
    projectClientContactList: ProjectClientContactDTOList[] | null;
}

export interface ProjectClientContactDTOList {
    projectClientContactId: number;
    projectId: number;
    projectName: string | null;
    clientContactId: number;
    contactPersonName: string | null;
    description: string | null;
}