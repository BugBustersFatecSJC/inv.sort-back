import { BarChart, Bar, ResponsiveContainer,Tooltip,LabelList,XAxis,YAxis,Label } from 'recharts';
const data = [
    {
      name: '1° TRI',
      uv: 4000
      
      
    },
    {
      name: '2° TRI',
      uv: 3000
      
      
    },
    {
      name: '3° TRI',
      uv: 2000
      
      
    },
    {
      name: '4° TRI',
      uv: 2780
      
      
    }
  ];
  console.log(data);
  ;
  
  
const Mainchart = () => {
  return (
    
    <ResponsiveContainer  className={"m-auto"} width={350} height={220} >
      
    <BarChart className='m-auto '  width={90}  data={data}  margin={{ top: 25, right: 0, left: 0, bottom: 0 }}>
    <XAxis dataKey="name" className='poppins-semibold' position="top" style={{ textAnchor: 'middle', fontSize: '80%', fill: '#3e1900' }}>
    </XAxis>
    <Bar barSize={55} dataKey="uv" fill="#3e1900">
      <LabelList dataKey="uv" className='poppins-semibold' position="top" style={{ textAnchor: 'middle', fontSize: '80%', fill: '#3e1900' }} />
    </Bar>
  </BarChart>
  </ResponsiveContainer>
  


);
}
export default Mainchart;