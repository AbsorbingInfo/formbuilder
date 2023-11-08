import React, { useEffect, useState } from 'react'
import { Checkbox, Button  } from '@mui/material';
import ClozeAnsContainer from '../components/ClozeAnsContainer';
import ClozeAns from '../components/ClozeAns';
import CatAns from '../components/CatAns';
import CatAnsContainer from '../components/CatAnsContainer';

const Form = (props) => {
  const [data, setData] = useState([])
  console.log(data)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:4000/api/form');
      const responseData = await response.json();
      setData(responseData);
    };
  
    fetchData();
  },[])

  const handleMcqMark = (queId, mcqId, optId) => {
    const updatedData = [...data];
    updatedData[1].questions.comprehension = updatedData[1].questions.comprehension.map(item => {
      if (item._id === queId) {
        return {
          ...item,
          mcqs: item.mcqs.map(mcq => {
            if (mcq.id === mcqId) {
              return {
                ...mcq,
                options: mcq.options.map(option => {
                  return {
                    ...option,
                    isCorrect: option.id === optId
                  };
                })
              };
            }
            return {
              ...mcq,
              options: mcq.options.map(option => ({
                ...option,
                isCorrect: false
              }))
            }
          })
        }
      }
      return item;
    });

    setData(updatedData)
  }


  return (
    <div className='bg-white my-8 text-lg mx-auto h-fit w-4/6 p-4 border-teal-600 border-t-8 border-s-0 border-b-0 shadow-slate-700 shadow-md rounded-lg mb-7 border-l-2' >
      <div className='text-xl font-medium'>
        { data.length > 0 ? data[0].name : ''}
      </div>
      <div>
        {data.length > 0 ? data[0].img.length > 0 ? <img src='http://localhost:4000/headerimg.jpg' className=' w-56' /> : "" : ""}
      </div>
      <div className='mt-5'>
        {data.length > 0 && data[1].questions.cloze.map((que, index) => {
          const ans= []
          return(
            <div key={index} className='flex border-2 p-4'>
              <div className='px-3 w-fit font-semibold text-xl'>
              Q {que.isRequired && <span className='text-red-600 text-2xl'>*</span>}
              </div>  
              <div>
                <div className='h-14 border-2 px-2 pt-3 hover:cursor-default text-lg font-medium pl-5'>
                  {que.question.split(' ').map((word, i) => {
                  return (
                    <span key={i}>
                      {que.dashs.some(dash => dash.value === word) ? <ClozeAnsContainer /> : word}
                      {' '}
                    </span>
                  )})}
                </div>
                <div className='my-4 mx-5 flex justify-center'>
                  {que.dashs.map((opt, index) => (
                    <ClozeAns key={index} data={{value: opt.value}} />
                  ))}
                </div>
              </div>
            </div>
        )})}
      </div>
      <div className='mt-5'>
        {data.length > 0 && data[1].questions.categorize.map((que, index) => {
          return(
            <div key={index} className='flex border-2 p-4 select-none'>
              <div className='px-3 w-fit font-semibold text-xl'>
              Q {que.isRequired && <span className='text-red-600 text-2xl'>*</span>}
              </div> 
              <div className='h-72'>
                <div className='text-xl font-medium'>
                  {que.question}
                </div>
              <div className='my-4 mx-5 flex justify-center'>
                  {que.options.map((opt, i) => (
                    <CatAns key={i} data={{value: opt.option}} />
                  ))}
                </div>
                <div className='flex h-14 px-2 pt-3 hover:cursor-default text-lg font-medium pl-5'>
                  {que.categories.map(( cat, index) => {
                    const colors = ['#fbcfe8','#a5f3fc', '#c7d2fe', '#f5d0fe', '#fecdd3' ]
                    return (
                      <CatAnsContainer key={index} data={{value: cat.category, currentColor: colors[index] }} />               
                  )})}
                </div>
                
              </div>
            </div>
        )})}
      </div>
      <div className='mt-5'>
        {data.length > 0 && data[1].questions.comprehension.map((que) => {
          return(
            <div key={que._id} className='flex border-2 p-4 h-96 overflow-auto'>
              <div className='px-3 w-fit font-semibold text-xl'>
              Q {que.isRequired && <span className='text-red-600 text-2xl'>*</span>}
              </div> 
              <div className='h-72'>
                <div className='text-xl font-medium'>
                  {que.description}
                </div>
                <div className='my-4 mx-5'>
                    {que.mcqs.map((mcq) => (
                      <div key={mcq.id} className='bg-lime-50 border-slate-600 border-y-2 w-8/12 px-5 py-3 rounded-md text-lg font-medium mx-3 hover:cursor-grab'>
                        <div>{mcq.question}</div>
                        <div className='pl-5'>
                          {mcq.options.map((opt,i) => (
                            <div key={i} className=''>
                              <Checkbox onChange={() => handleMcqMark(que._id, mcq.id, opt.id)} checked={opt.isCorrect} sx={{ '& .MuiSvgIcon-root': { fontSize: 30, background: 'white' } }} />
                              {opt.option}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>              
              </div>
            </div>
        )})}
      </div>
      <div className='mt-5 flex justify-end mr-5 mb-5' >
        <Button onClick={() => props.data(2)} variant="contained">Submit</Button>
      </div>
    </div>
  )
}

export default Form