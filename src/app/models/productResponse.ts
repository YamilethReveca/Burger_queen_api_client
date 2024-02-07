export interface ProductResponse {
  id: number;
  name: string;
  price: number;
  image: string;
  imageFallback?: string;
  type: string;
  dateEntry?: string; // Propiedad opcional
}


