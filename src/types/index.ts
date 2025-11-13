
export type User = {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'Gerente' | 'Supervisor' | 'Vendedor' | 'Comprador';
};

export enum ProductKind {
  GOOD = 'GOOD',
  SERVICE = 'SERVICE',
}

export enum StockPolicy {
  FIFO = 'FIFO',
  LIFO = 'LIFO',
}

export interface ProductPackage {
  name: string; // ex: CX, GRD, UN
  factor: number; // ex: 12 (1 CX = 12 UN)
  ean: string;
  price?: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  kind: ProductKind;
  trackStock: boolean;
  baseUnit: string; // ex: KG, L, M, UN
  stockPolicy?: StockPolicy;
  packages: ProductPackage[];
  currentStock: number;
}

export interface CartItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  selectedPackage: string; // e.g., 'CX'
  baseUnitQuantity: number; // Calculated total in base unit
}

export interface Delivery {
  orderId: string;
  driverName: string;
  deliveryTime: string;
  vehicle: {
    make: string;
    model: string;
    licensePlate: string;
  };
  tracking: {
    lat: number;
    lng: number;
  };
  status: 'PENDING' | 'IN_TRANSIT' | 'DELIVERED';
}
