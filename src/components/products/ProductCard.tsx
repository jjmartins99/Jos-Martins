
import React from 'react';
import { Product } from '@/types';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="bg-white border rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h3>
        <p className="text-sm text-gray-500 mt-1 h-10 overflow-hidden">{product.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold text-gray-900">{product.price.toFixed(2)} Kz</span>
          <button className="bg-primary text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
            <ShoppingCartIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
