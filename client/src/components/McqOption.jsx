import React from 'react'
import { useDrag } from 'react-dnd'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { TextField, Checkbox } from '@mui/material'

const McqOption = ({data}) => {
  const opt = data.opt
  const mcqId = data.mcqId
  const handleMcqOptChange = data.handleMcqOptChange
  const handleMcqOptCheckbox = data.handleMcqOptCheckbox

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'option',
    item: {
      mcqId, 
      id: opt.id
    },
    collect: (monitor) => ({
      isDragging1: !!monitor.isDragging()
    }),
  }));

  return (
    <div ref={drag} className='my-2'>
      <DragIndicatorIcon className='mt-2 hover:cursor-grab'/>
      <Checkbox checked={opt.isCorrect} onChange={(e) => handleMcqOptCheckbox(e, mcqId, opt.id)} sx={{ '& .MuiSvgIcon-root': { fontSize: 30, marginTop:1 } }} />
      <TextField 
        placeholder={`Option ${opt.id}`}
        className={'w-3/6'}
        required
        value={opt.option}
        onChange={(e) => handleMcqOptChange(e, mcqId, opt.id)}
        sx={{'& .MuiOutlinedInput-root': {
          '& fieldset':{
          borderColor:`${isDragging ? 'cyan !important' : ''}`,
          }
        }}}
      />
    </div>
  )
}

export default McqOption