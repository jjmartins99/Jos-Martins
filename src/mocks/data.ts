
import { User, Product, ProductKind, StockPolicy, Delivery } from '@/types';

export const mockUsers: User[] = [
  { id: 1, name: 'Admin PRegão', email: 'admin@pregao.co.ao', role: 'Admin' },
  { id: 2, name: 'Vendedor Teste', email: 'vendedor@pregao.co.ao', role: 'Vendedor' },
  { id: 3, name: 'Gerente Loja', email: 'gerente@pregao.co.ao', role: 'Gerente' },
];

export const mockProducts: Product[] = [
  {
    id: 'prod_1',
    name: 'Sumo de Laranja Compal 1L',
    description: 'Sumo 100% natural, sem adição de açúcar.',
    price: 850.00,
    imageUrl: 'https://picsum.photos/seed/juice/400/300',
    kind: ProductKind.GOOD,
    trackStock: true,
    baseUnit: 'UN',
    stockPolicy: StockPolicy.FIFO,
    packages: [
      { name: 'UN', factor: 1, ean: '1111111111111', price: 850.00 },
      { name: 'CX', factor: 6, ean: '1111111111112', price: 5000.00 },
    ],
    currentStock: 120,
  },
  {
    id: 'prod_2',
    name: 'Arroz Agulha 5kg',
    description: 'Arroz de grão longo, ideal para pratos do dia a dia.',
    price: 4500.00,
    imageUrl: 'https://picsum.photos/seed/rice/400/300',
    kind: ProductKind.GOOD,
    trackStock: true,
    baseUnit: 'KG',
    stockPolicy: StockPolicy.LIFO,
    packages: [
      { name: 'SACO', factor: 5, ean: '2222222222222' },
    ],
    currentStock: 50,
  },
  {
    id: 'prod_3',
    name: 'Serviço de Instalação AC',
    description: 'Instalação de unidade de ar condicionado. Duração média: 120 min.',
    price: 25000.00,
    imageUrl: 'https://picsum.photos/seed/ac/400/300',
    kind: ProductKind.SERVICE,
    trackStock: false,
    baseUnit: 'SERV',
    packages: [
      { name: 'SERV', factor: 1, ean: '3333333333333' },
    ],
    currentStock: 0,
  },
  {
    id: 'prod_4',
    name: 'Água Mineral 1.5L',
    description: 'Água pura e cristalina de nascente.',
    price: 250.00,
    imageUrl: 'https://picsum.photos/seed/water/400/300',
    kind: ProductKind.GOOD,
    trackStock: true,
    baseUnit: 'UN',
    stockPolicy: StockPolicy.FIFO,
    packages: [
      { name: 'UN', factor: 1, ean: '4444444444444' },
      { name: 'FARDO', factor: 6, ean: '4444444444445', price: 1400.00 },
    ],
    currentStock: 300,
  }
];

export const mockDelivery: Delivery = {
    orderId: 'order123',
    driverName: 'João Silva',
    deliveryTime: '14:30',
    vehicle: {
        make: 'Toyota',
        model: 'Hilux',
        licensePlate: 'LD-12-34-AB'
    },
    tracking: {
        lat: -8.8368, // Luanda, Angola
        lng: 13.2343
    },
    status: 'IN_TRANSIT'
};
