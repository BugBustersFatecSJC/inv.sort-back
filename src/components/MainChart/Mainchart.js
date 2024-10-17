import { useState, useEffect } from 'react';
import { BarChart, Bar, ResponsiveContainer, LabelList, XAxis } from 'recharts';
import api from '../../services/api';
import FilterButton from '../../components/FilterButtons/Filterbutton';

const Mainchart = () => {
  const [selectedValue, setSelectedValue] = useState('/mensal'); // Default value
  const [data, setData] = useState([]);

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
      <FilterButton selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
      <ResponsiveContainer className="m-auto px-4" barGap="20" width={600} height={220}>
        <BarChart
          className="m-auto px-2"
          data={data}
          margin={{ top: 55, right: 45, left: 85, bottom: 0 }}
          width={500}
          barGap={10} // Adjust the gap between bars
          barCategoryGap="20%" // Adjust the category gap between bars
        >
          <XAxis dataKey="name" width={20} angle={10} className="poppins-semibold" position="top" style={{ textAnchor: 'middle', fontSize: '55%', fill: '#3e1900' }} />
          <Bar barSize={55} dataKey="value" fill="#3e1900">
            <LabelList dataKey="value" barGap={150} className="poppins-semibold" position="top" style={{ margin: 'auto', textAnchor: 'middle', fontSize: '80%', fill: '#3e1900' }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default Mainchart;