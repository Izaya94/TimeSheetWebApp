import { ClientContactDTOList } from "../ClientContact/ClientContactList";
import { IDataUpdateResponse } from "../shared/data-update-response";

export interface ClientDetailDTOResponse {
    dataUpdateResponse: IDataUpdateResponse | null;
    clientDetail: ClientDTODetail | null;
    clientContactList: ClientContactDTOList[] | null;
}

export interface ClientDTODetail {
    clientId: number;
    clientName: string | null;
    clientTypeId: number;
    clientType: string | null;
    cityId: number;
    city: string | null;
    address: string | null;
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