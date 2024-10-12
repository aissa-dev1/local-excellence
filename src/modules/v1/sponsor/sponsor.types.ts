import { Document } from 'mongoose';
import { SponsorV1 } from './sponsor.schema';

export type SponsorV1Document = SponsorV1 & Document;

export interface CreateSponsorV1OwnerOptions {
  id: string;
  storeName: string;
}
