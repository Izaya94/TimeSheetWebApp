import { IDataUpdateResponse } from "../shared/data-update-response";
import { ClientContactDTODetail } from "./ClientContactDetail";

export interface IClientContactDTOAdd {
    dataUpdateResponse: IDataUpdateResponse;
    clientContactDetail: ClientContactDTODetail | null;
}


export interface ClientContactDTOAdd {
    clientId: number;
    contactPersonName: string | null;
    mobile1: string | null;
    mobile2: string | null;
    email1: string | null;
    email2: string | null;
}