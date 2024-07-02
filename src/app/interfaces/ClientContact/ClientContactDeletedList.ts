import { IDataUpdateResponse } from "../shared/data-update-response";

export interface ClientContactDTOResponse {
    dataUpdateResponse: IDataUpdateResponse | null;
    clientContactList: ClientContactDTOList[] | null;
}

export interface ClientContactDTOList {
    clientContactId: number;
    clientId: number;
    clientName: string | null;
    contactPersonName: string | null;
    mobile1: string | null;
    mobile2: string | null;
    email1: string | null;
    email2: string | null;
}