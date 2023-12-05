import React from 'react'
import { useDrop } from 'react-dnd'
import { swapPositions } from '../../utils.js/helper';

const CategoryContainer = (props) => {
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
          const cats = item.questionData.categories
          const newCats = swapPositions(cats, id, data.catId)
          return{
            ...item,
            questionData: {
              ...item.questionData,
              categories: newCats
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

export default CategoryContainer