import { IDataUpdateResponse } from "../shared/data-update-response";

export interface ClientDTOResponse {
    dataUpdateResponse: IDataUpdateResponse | null;
    clientList: ClientDTOList[] | null;
}

export interface ClientDTOList {
    clientId: number;
    clientName: string | null;
    clientTypeId: number;
    clientType: string | null;
    cityId: number;
    city: string | null;
    address: string | null;
}