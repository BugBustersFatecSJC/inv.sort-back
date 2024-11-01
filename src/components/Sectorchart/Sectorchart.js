import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer,LabelList,Tooltip } from 'recharts';
import Label2 from '../../components/Label/Label';
import Tooltipporcentagem from '../../components/Tooltipporcentagem/Tooltipporcentagem';
import { useState, useEffect } from 'react';
import api from '../../services/api';


const COLORS = ['#4B5E71', '#044687', '#09794E', '#853C22', '#729B23' , ' #7E3998'];

const Sectorchart = () => {
  const [selectedValue, setSelectedValue] = useState('/sectoranual'); // Default value
  const [data, setData] = useState([]);

  /**
   * Obtém as categorias e os produtos para exibí-los no dropdown
   */
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [products, setProducts] = useState([])
 console.log(setSelectedCategory);
 console.log(setSelectedValue);
 console.log(categories);
 console.log(products);
 
 
 
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
  
    <ResponsiveContainer width={'100%'} height={200} className={'flex my-12 mx-auto flex-col justify-center align-center items-center text-center'}>
      <PieChart className=' h-[90%] my-4 ' >

      <Tooltip content={<Tooltipporcentagem />} />
      
        <Pie 

          data={data}
          cx={`50%`}
          cy={`50%`}
          innerRadius={60}
          outerRadius={100}
          
          paddingAngle={0}
          dataKey="total_difference"
          stroke="#ffc376"
          strokeWidth={1}
          
          
        >
         <LabelList dataKey="%" stroke='none'  fill='#ffc376'  className='poppins-semibold  text-white'   />
          {data.map((entry, index) => (
            <Cell  str key={`cell-${index}`}  fill={COLORS[index % COLORS.length]} />
            
          ))}
        </Pie>
       
      </PieChart>
      <div className='flex flex-wrap w-[100%] px-1/2 text-center justify-center'><Label2 className='border-[#B45105] border-4 '  data={data} colors={COLORS} />   </div>
    </ResponsiveContainer>
    
  );
};

export default Sectorchart;