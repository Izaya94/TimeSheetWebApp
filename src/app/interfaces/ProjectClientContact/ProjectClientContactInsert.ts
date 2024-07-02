import { IDataUpdateResponse } from "../shared/data-update-response";
import { ProjectClientContactDTODetail } from "./ProjectClientContactDetail";

export interface IProjectClientContactDTOAdd{
    dataUpdateResponse: IDataUpdateResponse;
    projectClientContactDetail: ProjectClientContactDTODetail;
}

export interface ProjectClientContactDTOAdd {
    projectId: number;
    clientContactId: number;
    description: string | null;
}