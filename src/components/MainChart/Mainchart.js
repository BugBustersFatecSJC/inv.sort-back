import { BarChart, Bar, ResponsiveContainer } from 'recharts';
const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      
    }
  ];
const Mainchart = () => {
  return (
    <ResponsiveContainer width="70%" height="100%">
    <BarChart width={70} height={40} data={data}>
      <Bar dataKey="uv" fill="#3e1900" />
    </BarChart>
  </ResponsiveContainer>
  );
}
export default Mainchart;