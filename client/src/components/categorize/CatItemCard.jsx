import React from 'react'
import { TextField, MenuItem  } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDrag } from 'react-dnd'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

const CatItemCard = ({data}) => {
  const opt = data.opt
  const index = data.index
  const handleOptChange = data.handleOptChange
  const handleRemoveOpt = data.handleRemoveOpt
  const handleItemBelongs = data.handleItemBelongs
  const categories = data.categories

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'category',
    item: {
      optId: index
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    }),
  }));

  return (
    <div ref={drag} className='w-4/6 flex justify-between px-2'>
      
      <div className='my-3'>
        <DragIndicatorIcon className='mt-2 hover:cursor-grab'/>
        <TextField 
          placeholder={`option ${opt.id}`}
          className='w-3/1'
          required
          value={opt.option}
          onChange={(e) => handleOptChange(e, opt.id)}
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
      <div className='my-3'>
        <TextField 
          select
          className=' w-56'
          value={opt.belongsTo}
          onChange={(e) =>handleItemBelongs(e,opt.id)}
        >
          {categories.map((cat) => {
          return(
            <MenuItem key={cat.id} value={cat.category}>
              {cat.category}
            </MenuItem>
          )})}
        </TextField>
      </div>
    </div>
  )
}

export default CatItemCard