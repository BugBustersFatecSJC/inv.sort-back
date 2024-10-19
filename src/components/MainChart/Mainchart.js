import { useState, useEffect } from 'react';
import { BarChart, Bar, ResponsiveContainer, LabelList, XAxis } from 'recharts';
import api from '../../services/api';
import FilterButton from '../../components/FilterButtons/Filterbutton'
import DropdownButtons from '../DropdownButtons/DropdownButtons'

const Mainchart = () => {
  const [selectedValue, setSelectedValue] = useState('/mensal'); // Default value
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

  return (
    <>
      <div className='flex w-[60%] justify-between'>
        <FilterButton selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
        <DropdownButtons 
          options={categories} 
          label="Selecione uma Categoria" 
          onChange={(e) => setSelectedCategory(e.target.value)}
        />

        <DropdownButtons 
          options={products} 
          label="Selecione um Produto" 
          disabled={products.length === 0}
        />
      </div>
      <ResponsiveContainer className="m-auto px-4" barGap="20" >
        <BarChart
          className="m-auto px-2"
          data={data}
          margin={{ top: 155, right: 45, left: 85, bottom: 0 }}
          width={600}
          barGap={10} // Adjust the gap between bars
          barCategoryGap="20%" // Adjust the category gap between bars
        >
          <XAxis dataKey="name" width={20} interval={0} dy={5} className="poppins-semibold" position="top" style={{ textAnchor: 'middle', fontSize: '55%', fill: '#3e1900' }} />
          <Bar barSize={55} dataKey="value" fill="#3e1900">
            <LabelList dataKey="value" barGap={150} className="poppins-semibold" position="top" style={{ margin: 'auto', textAnchor: 'middle', fontSize: '80%', fill: '#3e1900' }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default Mainchart;