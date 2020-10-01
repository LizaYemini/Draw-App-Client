import { MarkerDto } from './document-marker-dto';
import { Response } from './server-response';

export class GetMarkersResponseOk extends Response {
    "Markers": MarkerDto[]
}
