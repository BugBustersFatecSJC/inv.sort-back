import React from 'react';
//Fluxo de Estoque, Usado No Buy And Sell
const ProductRow = ({ product, bgColor }) => {
  return (
    <tr className={`border-b border-orange-300 hover:bg-orange-100 ${bgColor}`}>
      <td className="border border-orange-400 p-2">{product.product_id}</td>
      <td className="border border-orange-400 p-2">{product.product_name}</td>
      <td className="border border-orange-400 p-2">{}</td>
      <td className="border border-orange-400 p-2">{product.quantity}</td>
      <td className="border border-orange-400 p-2">{product.stock}</td>
      <td className="border border-orange-400 p-2">{product.prod_cost_value}</td>
      <td className="border border-orange-400 p-2">{product.lots}</td>
    </tr>
  );
};

export default ProductRow;
