import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer,Legend,Tooltip } from 'recharts';
import Label from '../../components/Label/Label';
import Tooltipporcentagem from '../../components/Tooltipporcentagem/Tooltipporcentagem';
import { useState, useEffect } from 'react';
import api from '../../services/api';



const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#ff8888' , ' #A9A9A9'];

const Sectorchart = () => {
  const [selectedValue, setSelectedValue] = useState('/sectoranual'); // Default value
  const [data, setData] = useState([]);

  /**
   * Obtém as categorias e os produtos para exibí-los no dropdown
   */
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/category')
        setCategories(response.data)
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    }

    fetchCategories()
  }, [])

  useEffect(() => {
    if (selectedCategory) {
      const fetchProductsByCategory = async () => {
        try {
          const response = await api.get(`/products/category/${selectedCategory}`)
          setProducts(response.data)
        } catch (err) {
          console.error("Error fetching products by category:", err)
        }
      };

      fetchProductsByCategory()
    }
  }, [selectedCategory])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`${selectedValue}`);
        const data = response.data;
        console.log("dados", data);
        setData(data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [selectedValue]); // Fetch data whenever selectedValue changes
  console.log("selected",data);
  return (
  
    <ResponsiveContainer width={'100%'} height={270} className={'flex mx-auto flex-col justify-center align-center items-center text-center'}>
      <PieChart className='h-[100%] p-2' >
      <Tooltip content={<Tooltipporcentagem />} />
          
        <Pie 

          labelLine={false}
                
          data={data}
          cx={`50%`}
          cy={`50%`}
          innerRadius={60}
          outerRadius={90}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="total_difference"
          stroke="#B45105"
          strokeWidth={2.5}
          
          
        >
         
          {data.map((entry, index) => (
            <Cell  str key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        
      </PieChart>
      <div className='flex flex-wrap w-[100%] text-center justify-center'><Label className='border-[#B45105] border-4'  data={data} colors={COLORS} />   </div>
    </ResponsiveContainer>
    
  );
};

export default Sectorchart;