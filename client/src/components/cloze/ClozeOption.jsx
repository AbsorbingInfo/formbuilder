import React from 'react'
import { TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { useDrag } from 'react-dnd'

const ClozeOption = ({data}) => {
  const opt = data.opt
  const index = data.index
  const handleRemoveOpt = data.handleRemoveOpt

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'categoryOptions',
    item: {
      optId: index
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    }),
  }));

  return (
    <div ref={drag} className='my-3'>
      <DragIndicatorIcon className='mt-2 hover:cursor-grab'/>
      <TextField 
        className='w-2/6'
        value={opt.value}
        disabled
      />
      <CloseIcon 
        className='mt-4 ml-2 hover:cursor-pointer hover:bg-slate-200 rounded-md'
        style={{
          width: 30,
          height: 30,
        }}
        onClick={() => handleRemoveOpt(opt.id)}
      />
    </div>
  )
}

export default ClozeOption