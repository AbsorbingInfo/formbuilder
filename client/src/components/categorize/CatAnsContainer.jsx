import React,{ useState } from 'react'
import { useDrop } from 'react-dnd'

const CatAnsContainer = ({data}) => {
  const [ans, setAns] = useState([])
  const currentColor = data.currentColor
  const value = data.value

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "catAnswer",
    drop: (item) => addToAnswer(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addToAnswer = ({word}) => { setAns((prev) => [ ...prev, word])}

  return (
    <div ref={drop} key={drop} style={ans.length>0 ? { paddingLeft: '20px', paddingRight: '20px', backgroundColor: currentColor } : { paddingLeft: '40px', paddingRight: '40px', backgroundColor: currentColor }} className={`${currentColor} h-44 pt-8 pb-36 mx-4 text-center rounded-md`}>
      {value}
      {
        ans.map((word, i) => (
        <div key={i} className={`bg-lime-100 text-black w-fit px-5 py-3 rounded-md text-lg font-medium mx-3 hover:cursor-grab select-none my-2`}>
          {word}
        </div>
        ))
      }
    </div>
  )
}

export default CatAnsContainer