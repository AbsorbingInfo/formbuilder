import React, { useEffect, useState } from 'react'
import { useDrop } from 'react-dnd'

const ClozeAnsContainer = ({data}) => {
  const [ans, setAns] = useState(null)


  const [{ isOver }, drop] = useDrop(() => ({
    accept: "clozeAnswer",
    drop: (item) => addToAnswer(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  
  const addToAnswer = ({word}) => setAns(word)

  return (
    <div ref={drop} style={ans !== null ? { paddingLeft: '8px', paddingRight: '8px' } : { paddingLeft: '40px', paddingRight: '40px' }} className={`bg-rose-100 text-rose-100 rounded-md border-cyan-300 border-2 inline mx-2 py-4`}>
      {
        ans && 
        <div className='bg-lime-100 text-black w-fit px-5 py-3 rounded-md text-lg font-medium mx-3 hover:cursor-grab select-none inline'>
          {ans}
        </div>
      }
    </div>
  )
}

export default ClozeAnsContainer