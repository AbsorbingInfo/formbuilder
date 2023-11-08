import React from 'react'
import { useDrop } from 'react-dnd'
import { swapPositions } from '../utils.js/helper';

const CatItemContainer = (props) => {
  const id = props.data.id;
  const setQuestions = props.data.setQuestions;
  const queId = props.data.queId;

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "category",
    drop: (item) => addToCat(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addToCat = (data) => {
    setQuestions(prevQuestions => {
      return prevQuestions.map(item => {
        if(item.id === queId){
          const opts = item.questionData.options
          const newOpts = swapPositions(opts, id, data.optId)
          return{
            ...item,
            questionData: {
              ...item.questionData,
              options: newOpts
            }
          }
        }else{
          return item
        }
      })
    });
  }

  return (
    <div ref={drop}>
      {props.children}
    </div>
  )
}

export default CatItemContainer