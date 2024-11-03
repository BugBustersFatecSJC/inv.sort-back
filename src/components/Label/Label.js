import React from 'react';

const Label2 = ({ data, colors  }) => {
    
    
    
    return (
        <>
            {
            
            data.map((element,index) => {
                
                
                <div key={index} className='flex m-2 flex-row  justify-center'> 
                <p className='w-4 poppins-semibold ' style={{backgroundColor:colors[index % colors.length]}}></p>
                <p className='mx-2 poppins-semibold text-xs'>{element.category_name}</p>
                
                </div>
           
        
        })}
        </>
    )}
        ;

export default Label2;