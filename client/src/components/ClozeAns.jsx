import React from 'react'
import { useDrag } from 'react-dnd'

const ClozeAns = ({data}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'clozeAnswer',
    item: {
      word: data.value
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    }),
  }));

  return (
    <div ref={drag} className='bg-lime-100 w-fit px-5 py-3 rounded-md text-lg font-medium mx-3 hover:cursor-grab select-none'>
      {data.value}
    </div>
  )
}

export default ClozeAns