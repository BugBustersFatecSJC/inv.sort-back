import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import Label from '../../components/Label/Label';

const data = [
  { name: 'Utensílios', value: 400 },
  { name: 'Alimentos', value: 300 },
  { name: 'Vestimentas', value: 300 },
  { name: 'Materiais de Contrução', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Sectorchart = () => {
  return (
  
    <ResponsiveContainer width={'90%'} height={170} className={'flex mx-auto flex-col justify-center align-center items-center text-center'}>
      <PieChart className='h-[100%] p-2' >
        <Pie 

          
          data={data}
          cx={`50%`}
          cy={"50%"}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
              
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        
      </PieChart>
      <div className='flex flex-wrap w-[50%] text-center justify-center'><Label  data={data} colors={COLORS} />   </div>
    </ResponsiveContainer>
    
  );
};

export default Sectorchart;