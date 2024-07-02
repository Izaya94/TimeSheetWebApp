import { IDataUpdateResponse } from "../shared/data-update-response";

export interface ClientContactDetailDTOResponse {
    dataUpdateResponse: IDataUpdateResponse | null;
    clientContactDetail: ClientContactDTODetail | null;
}

export interface ClientContactDTODetail {
    contactPersonName: string | null;
    clientId: number;
    clientName: string | null;
    mobile1: string | null;
    mobile2: string | null;
    email1: string | null;
    email2: string | null;
    createdBy: string | null;
    createdByIpAddress: string | null;
    createdOn: string;
    modifiedBy: string | null;
    modifiedByIpAddress: string | null;
    modifiedOn: string;
    deletedBy: string | null;
    deletedByIpAddress: string | null;
    deletedOn: string;
    isDeleted: string | null;
}