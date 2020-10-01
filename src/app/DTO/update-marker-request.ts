import { MarkerDto } from './marker-dto';

export class UpdateMarkerRequest {
    "DocId": string
    "MarkerId": string
    "MarkerType": string
    "ForColor": string
    "BackColor": string
    "UserId": string
    "LocationX": number
    "LocationY": number
    "Width": number
    "Height": number
}
