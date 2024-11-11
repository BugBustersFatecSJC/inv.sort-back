import { useState, useEffect } from 'react';
import { BarChart, Bar, ResponsiveContainer, LabelList, XAxis } from 'recharts';
import api from '../../services/api';
import FilterButton from '../../components/FilterButtons/Filterbutton'
import DropdownButtons from '../DropdownButtons/DropdownButtons'
const Mainchart = () => {
  const [selectedValue, setSelectedValue] = useState('/mensal'); // Default value
  const [data, setData] = useState([]);

  
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)

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
          const response = await api.get(`/products/category/${selectedCategory}`);
          setProducts(response.data);
          console.log(response.data);
          
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
        const response = await api.get(`${selectedValue}/?category=${selectedCategory}&product=${selectedProduct}`);
        const data = response.data;
        setData(data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [selectedValue,selectedCategory,selectedProduct]); // Fetch data whenever selectedValue changes

  return (
    <ResponsiveContainer className="x-auto  flex flex-col w-full h-full"  height={350}  >
      <div className='flex justify-start w-full mx-1 h-auto '>
        <FilterButton selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
        <span className='flex h-auto  '><DropdownButtons 
          options={categories} 
          type={"category"}
          label="Categoria..." 
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            console.log(e.target.value);
            
          }}
          
          
        />

        <DropdownButtons 
          options={products} 
          label="Produto..." 
          type={"product"}
          disabled={products.length === 0}
          onChange={(e) => {
            setSelectedProduct(e.target.value)
            console.log(e.target.value);
            
          }}
        />
    </span>
      </div>
      
        <BarChart
          className="m-auto px-2"
          data={data}
          margin={{ top: 145, right: 5 , left: 5, bottom: 10 }}
          width={900}
  
        >
          <XAxis dataKey="name" angle={15} width={30} interval={0} dx={5} dy={5} className="poppins-semibold" position="top" style={{ textAnchor: 'middle', fontSize: '55%', fill: '#3e1900' }} />
          <Bar barSize={55} barGap={5} dataKey="value" fill="#3e1900">
            <LabelList dataKey="value"  className="poppins-semibold"  position="top" style={{ margin: 'auto', textAnchor: 'middle', fontSize: '80%', fill: '#3e1900' }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    
  );
};

export default Mainchart;