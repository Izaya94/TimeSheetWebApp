import { IDataUpdateResponse } from "../shared/data-update-response";

export interface ProjectClientContactDetailDTOResponse {
    dataUpdateResponse: IDataUpdateResponse | null;
    projectClientContactDetail: ProjectClientContactDTODetail | null;
}

export interface ProjectClientContactDTODetail {
    projectClientContactId: number;
    projectId: number;
    projectName: string | null;
    clientContactId: number;
    contactPersonName: string | null;
    description: string | null;
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