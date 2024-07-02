import { IDataUpdateResponse } from "../shared/data-update-response";
import { ClientDTODetail } from "./ClientDetail";

export interface IClientDTOEdit {
    dataUpdateResponse: IDataUpdateResponse;
    clientDetail: ClientDTODetail
}

export interface ClientDTOEdit {
    clientId: number;
    clientName: string | null;
    clientTypeId: number;
    address: string | null;
    cityId: number;
}