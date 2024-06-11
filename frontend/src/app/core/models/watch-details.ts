export interface WatchDetails {
    _id?: string;
    productId: string; 
    productName: string;
    description: string;
    category: string;
    brand: string;
    price: number;
    image: string;
    specifications: string;
    color: string;
    weight: number;
    material: string;
    gender: string;
    __v?: number;
}
  
export interface databaseWatchDetails {
    _id: string;
    productId: string;
    productName: string;
    description: string;
    category: string;
    brand: string;
    price: number;
    image: string;
    specifications: string;
    color: string;
    weight: string;
    material: string;
    gender: string;
}