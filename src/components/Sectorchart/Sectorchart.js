import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, LabelList, Tooltip } from 'recharts';
import Label2 from '../../components/Label/Label';
import Tooltipporcentagem from '../../components/Tooltipporcentagem/Tooltipporcentagem';
import api from '../../services/api';

const COLORS = ['#4B5E71', '#044687', '#09794E', '#853C22', '#729B23', '#7E3998'];

const Sectorchart = () => {
  const [selectedValue, setSelectedValue] = useState('2024'); // Default value
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleChange = (event) => {
      const newValue = event?.target?.value || '2024';
      setSelectedValue(newValue);
      console.log("selected", selectedValue);
    };

    handleChange();
  }, [selectedValue]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/sectoranual');
        const data = response.data;
        console.log("dados", data);
        setData(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedValue]); // Fetch data whenever selectedValue changes
  
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data[selectedValue] || data[selectedValue].length === 0) {
    return <div>No data available for the selected year.</div>;
  }
const datas = data[selectedValue]
  return (
    <ResponsiveContainer width={'100%'} height={200} className={'flex my-12 mx-auto flex-col justify-center align-center items-center text-center'}>
      <PieChart className='h-[90%] my-4'>
        <Tooltip content={<Tooltipporcentagem />} />
        <Pie
          data={data[selectedValue]}
          cx={`50%`}
          cy={`50%`}
          innerRadius={60}
          outerRadius={100}
          paddingAngle={0}
          dataKey="total_difference"
          stroke="#ffc376"
          strokeWidth={1}
          
        >
          <LabelList dataKey="%" stroke='none' fill='#ffc376' className='poppins-semibold text-white' />
          {data[selectedValue].map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      <div className='flex flex-wrap w-[100%] px-1/2 text-center justify-center'>
        <Label2 className='border-[#B45105] border-4' data={data[selectedValue]} colors={COLORS} />
      </div>
    </ResponsiveContainer>
  );
};

export default Sectorchart;