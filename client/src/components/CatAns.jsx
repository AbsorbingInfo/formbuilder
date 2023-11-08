import React from 'react'
import { useDrag } from 'react-dnd'

const CatAns = ({data}) => {
  
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'catAnswer',
    item: {
      word: data.value
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    }),
  }));

  return (
    <div ref={drag} className='bg-lime-100 w-fit px-5 py-3 rounded-md text-lg font-medium mx-3 hover:cursor-grab' >
      {data.value}
    </div>
  )
}

export default CatAns