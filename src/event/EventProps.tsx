//Interfata pentru evenimente
export interface EventProps {
  eventId: number;
  name: string;
  description: string;
  participants: number;
  eventDate: Date;
  locationName: string;
}
