export interface IProduct {
  name: string;
  photoUrl?: string;
  price: number;
  totalStock: number;
  availableStock: number;
  startTime: Date;
  endTime: Date;
}
