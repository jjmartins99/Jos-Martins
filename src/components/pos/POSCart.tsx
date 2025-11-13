
import React, { useState, useEffect } from 'react';
import { Product, CartItem } from '@/types';
import { PlusIcon, MinusIcon, TrashIcon } from '@heroicons/react/24/solid';

// Business rules for cart limits
const CART_LIMITS = {
  MAX_LINES: 10,
  MAX_QTY_PER_LINE: 50,
  MAX_TOTAL_VALUE: 500000, // 500,000 Kz
};

interface POSCartProps {
  initialProduct: Product | null;
}

const POSCart: React.FC<POSCartProps> = ({ initialProduct }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    if (initialProduct) {
      addItem(initialProduct);
    }
  }, [initialProduct]);
  
  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.unitPrice * item.quantity), 0);
  };

  const addItem = (product: Product, selectedPackageName: string = product.packages[0].name) => {
    // Check line limit
    if (items.length >= CART_LIMITS.MAX_LINES && !items.find(item => item.productId === product.id)) {
        setValidationError(`Aviso: Limite de ${CART_LIMITS.MAX_LINES} linhas no carrinho atingido.`);
        return;
    }

    setValidationError(null);
    const selectedPackage = product.packages.find(p => p.name === selectedPackageName);
    if (!selectedPackage) return;

    const existingItemIndex = items.findIndex(item => item.productId === product.id && item.selectedPackage === selectedPackageName);

    if (existingItemIndex > -1) {
      // Update quantity
      const newItems = [...items];
      const newQty = newItems[existingItemIndex].quantity + 1;
      
      if (newQty > CART_LIMITS.MAX_QTY_PER_LINE) {
        setValidationError(`Aviso: Quantidade máxima de ${CART_LIMITS.MAX_QTY_PER_LINE} por linha atingida.`);
        return;
      }

      newItems[existingItemIndex].quantity = newQty;
      newItems[existingItemIndex].baseUnitQuantity = newQty * selectedPackage.factor;
      setItems(newItems);
    } else {
      // Add new item
      const newItem: CartItem = {
        productId: product.id,
        productName: product.name,
        quantity: 1,
        unitPrice: selectedPackage.price || product.price,
        selectedPackage: selectedPackage.name,
        baseUnitQuantity: selectedPackage.factor,
      };
      setItems([...items, newItem]);
    }
  };

  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(index);
      return;
    }
    if (newQuantity > CART_LIMITS.MAX_QTY_PER_LINE) {
        setValidationError(`Aviso: Quantidade máxima de ${CART_LIMITS.MAX_QTY_PER_LINE} por linha atingida.`);
        return;
    }
    setValidationError(null);

    const newItems = [...items];
    const item = newItems[index];
    const productPackage = mockProducts.find(p => p.id === item.productId)?.packages.find(pkg => pkg.name === item.selectedPackage);
    
    if (productPackage) {
        item.quantity = newQuantity;
        item.baseUnitQuantity = newQuantity * productPackage.factor;
        setItems(newItems);
    }
  };
  
  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };
  
  const totalValue = calculateTotal();
  const totalValueExceeded = totalValue > CART_LIMITS.MAX_TOTAL_VALUE;

  return (
    <div className="flex flex-col h-full">
      {validationError && <div className="p-3 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50" role="alert">{validationError}</div>}
      <div className="flex-grow overflow-y-auto">
        {items.length === 0 ? (
          <p className="text-gray-500 text-center py-10">O carrinho está vazio. Escaneie um produto para começar.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {items.map((item, index) => (
              <li key={index} className="py-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-800">{item.productName} ({item.selectedPackage})</p>
                  <p className="text-sm text-gray-500">{item.unitPrice.toFixed(2)} Kz</p>
                </div>
                <div className="flex items-center space-x-3">
                  <button onClick={() => updateQuantity(index, item.quantity - 1)} className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"><MinusIcon className="h-4 w-4"/></button>
                  <span className="font-medium w-8 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(index, item.quantity + 1)} className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"><PlusIcon className="h-4 w-4"/></button>
                  <button onClick={() => removeItem(index)} className="text-red-500 hover:text-red-700"><TrashIcon className="h-5 w-5"/></button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="border-t pt-4 mt-4">
        <div className="flex justify-between items-center text-xl font-bold">
          <span>Total:</span>
          <span className={totalValueExceeded ? 'text-red-600' : 'text-gray-900'}>{totalValue.toFixed(2)} Kz</span>
        </div>
        {totalValueExceeded && <p className="text-red-600 text-sm mt-1">Atenção: O valor total excede o limite de {CART_LIMITS.MAX_TOTAL_VALUE.toFixed(2)} Kz.</p>}
        <button 
          disabled={items.length === 0 || totalValueExceeded}
          className="w-full mt-4 bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
          Finalizar Venda
        </button>
      </div>
    </div>
  );
};
// This is needed for the component to receive props updates
const MemoizedPOSCart = React.memo(POSCart);
export default MemoizedPOSCart;
// Mock products for demonstration as we don't have a backend yet
const mockProducts: Product[] = [
    { id: '1', name: 'Refrigerante 330ml', description: '', price: 150, imageUrl: '', kind: 'GOOD', trackStock: true, baseUnit: 'UN', currentStock: 100, packages: [{name: 'UN', factor: 1, ean: '6001234567890'}, {name: 'CX', factor: 24, ean: '6001234567891'}]}
];
