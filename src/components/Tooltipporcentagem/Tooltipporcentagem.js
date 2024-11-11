const Tooltipporcentagem = ({ active, payload }) => {
    if (active) {
      
      return (
        <div className=' border-4 rounded border-[#B45105] bg-[#FFC376] poppins-semibold   p-2 rounded-lg shadow-lg'>
          <p className='text-center'>{`${payload[0].payload.category_name} : ${payload[0].value }%`}</p>
        </div>
      );
    }
  
    return null;
  }
  export default Tooltipporcentagem;