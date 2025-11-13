
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import apiClient from '@/services/apiClient';
import { Product } from '@/types';
import ProductCard from '@/components/products/ProductCard';

const fetchProducts = async (): Promise<Product[]> => {
  const { data } = await apiClient.get('/produtos');
  return data;
};

const LandingPage = () => {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'], 
    queryFn: fetchProducts
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Catálogo de Produtos</h1>
      {isLoading && <p>A carregar produtos...</p>}
      {error && <p className="text-red-500">Ocorreu um erro ao carregar os produtos.</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products?.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
