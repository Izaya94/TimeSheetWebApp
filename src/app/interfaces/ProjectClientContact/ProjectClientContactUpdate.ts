import { IDataUpdateResponse } from "../shared/data-update-response";
import { ProjectClientContactDTODetail } from "./ProjectClientContactDetail";

export interface IProjectClientContactDTOEdit{
    dataUpdateResponse: IDataUpdateResponse;
    projectClientContactDetail: ProjectClientContactDTODetail;
}

export interface ProjectClientContactDTOEdit {
    projectClientContactId: number;
    clientContactId: number;
    description: string | null;
}