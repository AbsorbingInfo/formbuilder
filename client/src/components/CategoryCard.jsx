import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { TextField } from '@mui/material';
import { useDrag } from 'react-dnd'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';


const CategoryCard = ({data}) => {
  const cat = data.cat
  const handleCatChange= data.handleCatChange
  const handleRemoveCat = data.handleRemoveCat
  const index = data.index

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'category',
    item: {
      catId: index
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    }),
  }));

  return (
    <div ref={drag} className='my-3'>
      <DragIndicatorIcon className='mt-2 hover:cursor-grab'/>
      <TextField 
        placeholder={`Category ${cat.id}`}
        className='w-2/6'
        required
        value={cat.category}
        onChange={(e) => handleCatChange(e, cat.id)}
      />
      <CloseIcon 
        className='mt-4 ml-2 hover:cursor-pointer hover:bg-slate-200 rounded-md'
        style={{
          width: 30,
          height: 30,
        }}
        onClick = {() => handleRemoveCat(cat.id)}
      />
    </div>
  )
}

export default CategoryCard