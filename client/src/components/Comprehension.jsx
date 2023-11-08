
import { TextField, Switch, FormControlLabel, Checkbox, InputLabel  } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { useDrop } from 'react-dnd'
import McqOption from './McqOption';
import { swapPositions } from '../utils.js/helper';

const Comprehension = ({ setQuestions, question, setImageFiles, uniqueFormId}) => {

  const [{ isOver1 }, drop1] = useDrop(() => ({
    accept: "option",
    drop: (item) => addToOpt1(item),
    collect: (monitor) => ({
      isOver1: !!monitor.isOver(),
    }),
  }));

  const [{ isOver2 }, drop2] = useDrop(() => ({
    accept: "option",
    drop: (item) => addToOpt2(item),
    collect: (monitor) => ({
      isOver2: !!monitor.isOver(),
    }),
  }));

  const [{ isOver3 }, drop3] = useDrop(() => ({
    accept: "option",
    drop: (item) => addToOpt3(item),
    collect: (monitor) => ({
      isOver3: !!monitor.isOver(),
    }),
  }));

  const [{ isOver4 }, drop4] = useDrop(() => ({
    accept: "option",
    drop: (item) => addToOpt4(item),
    collect: (monitor) => ({
      isOver4: !!monitor.isOver(),
    }),
  }));


  const addToOpt1 = (data) => {
    setQuestions(prevQuestions => {
      return prevQuestions.map(item => {
        if (item.id === question.id) {
          return {
            ...item,
            questionData: {
              ...item.questionData,
              mcqs: item.questionData.mcqs.map(mcq => {
                if (mcq.id === data.mcqId) {
                  const options = mcq.options
                  const newOptions = swapPositions(options, 0, data.id-1)
                  return {
                    ...mcq,
                    options: newOptions
                  };
                }
                return mcq;
              }),
            },
          };
        }
        return item;
      });
    });
  }

  const addToOpt2 = (data) => {
    setQuestions(prevQuestions => {
      return prevQuestions.map(item => {
        if (item.id === question.id) {
          return {
            ...item,
            questionData: {
              ...item.questionData,
              mcqs: item.questionData.mcqs.map(mcq => {
                if (mcq.id === data.mcqId) {
                  const options = mcq.options
                  const newOptions = swapPositions(options, 1, data.id-1)
                  return {
                    ...mcq,
                    options: newOptions
                  };
                }
                return mcq;
              }),
            },
          };
        }
        return item;
      });
    });
  }

  const addToOpt3 = (data) => {
    setQuestions(prevQuestions => {
      return prevQuestions.map(item => {
        if (item.id === question.id) {
          return {
            ...item,
            questionData: {
              ...item.questionData,
              mcqs: item.questionData.mcqs.map(mcq => {
                if (mcq.id === data.mcqId) {
                  const options = mcq.options
                  const newOptions = swapPositions(options, 2, data.id-1)
                  return {
                    ...mcq,
                    options: newOptions
                  };
                }
                return mcq;
              }),
            },
          };
        }
        return item;
      });
    });
  }

  const addToOpt4 = (data) => {
    setQuestions(prevQuestions => {
      return prevQuestions.map(item => {
        if (item.id === question.id) {
          return {
            ...item,
            questionData: {
              ...item.questionData,
              mcqs: item.questionData.mcqs.map(mcq => {
                if (mcq.id === data.mcqId) {
                  const options = mcq.options
                  const newOptions = swapPositions(options, 3, data.id-1)
                  return {
                    ...mcq,
                    options: newOptions
                  };
                }
                return mcq;
              }),
            },
          };
        }
        return item;
      });
    });
  }

  const handleRemoveQue = () => {
    setQuestions(prevQuestions => {
      return prevQuestions.filter(que => que.id !== question.id)
    });
  }

  const handleIsRequired = (e) => {
    setQuestions(prevQuestions => {
      return prevQuestions.map(item => {
        if (item.id === question.id) {
          return {
            ...item,
            isRequired: !item.isRequired
          };
        }
        return item;
      });
    });
  }

  const handleAddMcq = () =>{
    setQuestions(prevQuestions => {
      return prevQuestions.map(item => {
        if (item.id === question.id) {
          return {
            ...item,
            questionData: {
              ...item.questionData,
              mcqs: [
                ...item.questionData.mcqs,
                {
                  id: question.questionData.mcqs.length+1,
                  question: "",
                  options: [
                    {
                      id: 1,
                      option: "",
                      isCorrect: false,
                    },
                    {
                      id: 2,
                      option: "",
                      isCorrect: false,
                    },
                    {
                      id: 3,
                      option: "",
                      isCorrect: false,
                    },
                    {
                      id: 4,
                      option: "",
                      isCorrect: false,
                    },
                  ],
                },
              ],
            },
          };
        }
        return item;
      });
    });
  }

  const handlePassageChange = (e) =>{
    setQuestions(prevQuestions => {
      return prevQuestions.map(item => {
        if (item.id === question.id) {
          return {
            ...item,
            questionData: {
              ...item.questionData,
              description: e.target.value
            },
          };
        }
        return item;
      });
    });
  }

  const handleMcqQueChange = ( e, id ) => {
    setQuestions(prevQuestions => {
      return prevQuestions.map(item => {
        if (item.id === question.id) {
          return {
            ...item,
            questionData: {
              ...item.questionData,
              mcqs: item.questionData.mcqs.map(mcq => {
                if (mcq.id === id) {
                  return {
                    ...mcq,
                    question: e.target.value
                  };
                }
                return mcq;
              }),
            },
          };
        }
        return item;
      });
    });
  }

  const handleMcqOptChange = ( e, id, order ) => {
    setQuestions(prevQuestions => {
      return prevQuestions.map(item => {
        if (item.id === question.id) {
          return {
            ...item,
            questionData: {
              ...item.questionData,
              mcqs: item.questionData.mcqs.map(mcq => {
                if (mcq.id === id) {
                  return {
                    ...mcq,
                    options: mcq.options.map((option) => {
                      if (option.id === order) {
                        return {
                          ...option,
                          option: e.target.value
                        };
                      }
                      return option;
                    })
                  };
                }
                return mcq;
              }),
            },
          };
        }
        return item;
      });
    });
  }

  const handleMcqOptCheckbox = (e, id, order) => {
    setQuestions(prevQuestions => {
      return prevQuestions.map(item => {
        if (item.id === question.id) {
          return {
            ...item,
            questionData: {
              ...item.questionData,
              mcqs: item.questionData.mcqs.map(mcq => {
                if (mcq.id === id) {
                  return {
                    ...mcq,
                    options: mcq.options.map((option) => {
                      if (option.id === order) {
                        return {
                          ...option,
                          isCorrect: !option.isCorrect
                        };
                      }else {
                        return {
                          ...option,
                          isCorrect: false
                        };
                      }
                    })
                  };
                }
                return mcq;
              }),
            },
          };
        }
        return item;
      });
    });
  }

  const handleImageUpload = (event) => {
    const files = event.target.files;
    setImageFiles((prevFiles) => ({
      ...prevFiles,
      [question.id]: files[0],
    }));
  };

  return (
    <div className='bg-white text-lg mx-auto h-fit w-4/6 p-4 shadow-slate-700 shadow-md rounded-lg mb-7 border-b-2 border-l-2' >
    <div className='px-5 py-3'> 

      <div>
        <div className='mb-2 flex justify-between'>
          Question {question.id}
          <div>
            <FormControlLabel control={<Switch checked={question.isRequired} onChange={handleIsRequired} />}  label="Required" />
          </div>
          <div>
            <CloseIcon 
              className='ml-2 hover:cursor-pointer hover:bg-slate-200 rounded-md'
              style={{
                width: 35,
                height: 35,
              }}
              onClick={() => handleRemoveQue()}
            />
          </div>
        </div>
        <div>
          <TextField 
            placeholder='Enter your passage here'
            multiline
            className='w-3/6'
            required
            value={question.questionData.description}
            onChange={handlePassageChange}
          />
        </div>
        <div className="mt-2">
            <InputLabel >Choose image (optional)</InputLabel>
            <TextField 
              className="text-xl block font-medium w-3/12"
              type="file"
              InputProps={{ inputProps: { accept: 'image/*' } }}
              name={`question${question.id}`}
              onChange={handleImageUpload}
            />
          </div>
      </div>
      
      <div>
        {
          question.questionData.mcqs.map((mcq) => (
            <div key={mcq.id} className='mt-5 py-3 px-5 border w-11/12 mx-auto'>
            <div>{`MCQ ${question.id}.${mcq.id}`}</div>
            <div className='my-4'>
              <TextField
                placeholder="Enter your Question here"
                className='w-4/6'
                value={mcq.question}
                onChange={(e) => handleMcqQueChange(e,mcq.id)}
              />
            </div>
            <div ref={drop1}>
              <McqOption data={{ mcqId: mcq.id, opt: mcq.options[0], handleMcqOptCheckbox, handleMcqOptChange }} />
            </div>
            <div ref={drop2}>
              <McqOption data={{ mcqId: mcq.id, opt: mcq.options[1], handleMcqOptCheckbox, handleMcqOptChange }} />
            </div>
            <div ref={drop3}>
              <McqOption data={{ mcqId: mcq.id, opt: mcq.options[2], handleMcqOptCheckbox, handleMcqOptChange }} />
            </div>
            <div ref={drop4}>
              <McqOption data={{ mcqId: mcq.id, opt: mcq.options[3], handleMcqOptCheckbox, handleMcqOptChange }} />
            </div>
            
            </div>
          ))
        }
        
        <div onClick={handleAddMcq} className=' mt-3 w-3/12 h-10 ml-52 bg-slate-300 flex justify-center items-center rounded-md hover:text-teal-100 hover:bg-slate-700 hover:cursor-pointer' >
          <AddIcon 
            className='text-green-350 ' 
            style={{
              width: 35,
              height: 35,
            }}
          />
        </div>
      </div>
    </div>
  </div>
  )
}

export default Comprehension