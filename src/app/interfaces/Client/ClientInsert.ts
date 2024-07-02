import { IDataUpdateResponse } from "../shared/data-update-response";
import { ClientDTODetail } from "./ClientDetail";

export interface IClientDTOAdd {
    dataUpdateResponse: IDataUpdateResponse;
    clientDetail: ClientDTODetail
}


export interface ClientDTOAdd {
    clientName: string | null;
    clientTypeId: number;
    address: string | null;
    cityId: number;
    contactPersonName: string | null;
    mobile1: string | null;
    mobile2: string | null;
    email1: string | null;
    email2: string | null;
}