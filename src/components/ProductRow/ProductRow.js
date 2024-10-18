import React from 'react';

const ProductRow = ({ product, color }) => {
  return (
    <tr className={`border-b border-orange-300 hover:bg-orange-100 bg-red-500 ${color}`}>
      <td className="border border-orange-400 p-4 text-orange-700">{product.product_id}</td>
      <td className="border border-orange-400 p-4 text-orange-700">{product.product_name}</td>
      <td className="border border-orange-400 p-4 text-orange-700">{product.unit.unity_type}</td>
      <td className="border border-orange-400 p-4 text-orange-700">{product.quantity}</td>
      <td className="border border-orange-400 p-4 text-orange-700">{product.stock}</td>
      <td className="border border-orange-400 p-4 text-orange-700">{product.prod_cost_value}</td>
      <td className="border border-orange-400 p-4 text-orange-700">{product.lots}</td>
    </tr>
  );
};

export default ProductRow;
