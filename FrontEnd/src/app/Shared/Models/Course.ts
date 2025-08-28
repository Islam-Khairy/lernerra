export interface Course{
  id: number;
  name: string;
  description: string;
  rate: number;
  price: number;
  instructorName: string;
  categoryName: string;
  status: string;
  imageUrl?: string; 
  categoryId?: number; 
}