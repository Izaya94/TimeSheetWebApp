import { IDataUpdateResponse } from "../shared/data-update-response";
import { ProjectDTODetail } from "./ProjectDetail";

export interface IProjectDTOAdd{
    dataUpdateResponse: IDataUpdateResponse;
    projectDetail: ProjectDTODetail;
}

export interface ProjectDTOAdd {
    projectName: string | null;
    clientId: number;
    startDate: string;
    endDate: string;
    description: string | null;
    clientContactsXML: string | null;
    statusCode: number;
    statusNotes: string | null;
}

// export interface ClientContact {
//     clientContactId: number;
//     description: string | null;
// }