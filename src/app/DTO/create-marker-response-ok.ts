import { MarkerDto } from './marker-dto';

export class CreateMarkerResponseOk extends Response {
    "Marker": MarkerDto
    /*
    "DocId": string
    "MarkerId": string
    "MarkerType": string
    "ForColor": string
    "BackColor": string
    "UserId": string
    "LocationX": number
    "LocationY": number
    "Width": number
    "Height": number */
}
