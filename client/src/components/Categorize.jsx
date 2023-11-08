import { useEffect, useState } from 'react';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { TextField, Switch, FormControlLabel, InputLabel  } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { swapPositions } from '../utils.js/helper';
import CategoryCard from './CategoryCard';
import { useDrop } from 'react-dnd'
import CatItemCard from './CatItemCard';
import CategoryContainer from './CategoryContainer';
import CatItemContainer from './CatItemContainer';

const Categorize = ({ setQuestions, question, setImageFiles, uniqueFormId }) => {

  const [{ isOver1 }, drop1] = useDrop(() => ({
    accept: "option",
    drop: (item) => addToOpt1(item),
    collect: (monitor) => ({
      isOver1: !!monitor.isOver(),
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

  const handleQuestionChange = (e) =>{
    setQuestions(prevQuestions => {
      return prevQuestions.map(item => {
        if (item.id === question.id) {
          return {
            ...item,
            questionData: {
              ...item.questionData,
              question: e.target.value
            },
          };
        }
        return item;
      });
    });
  }

  const handleCatChange = ( e, id ) => {
    setQuestions(prevQuestions => {
      return prevQuestions.map(item => {
        if (item.id === question.id) {
          return {
            ...item,
            questionData: {
              ...item.questionData,
              categories: item.questionData.categories.map(cat => {
                if (cat.id === id) {
                  return {
                    ...cat,
                    category: e.target.value
                  };
                }
                return cat;
              }),
            },
          };
        }
        return item;
      });
    });
  }

  const handleAddCat = () =>{
    setQuestions(prevQuestions => {
      return prevQuestions.map(item => {
        if (item.id === question.id) {
          const catLength = item.questionData.categories.length
          return {
            ...item,
            questionData: {
              ...item.questionData,
              categories: [
                ...item.questionData.categories,
                {
                  id: item.questionData.categories[catLength-1].id +1,
                  category: "",
                },
              ],
            },
          };
        }
        return item;
      });
    });
  }

  const handleRemoveCat = (catId) => {
    if(question.questionData.categories.length > 1){
      setQuestions(prevQuestions => {
        return prevQuestions.map(item => {
          if (item.id === question.id) {
            return {
              ...item,
              questionData: {
                ...item.questionData,
                categories: item.questionData.categories.filter(cat => cat.id !== catId),
              },
            };
          }
          return item;
        });
      });
    }
  }

  const handleOptChange = (e, optId) => {
    setQuestions(prevQuestions => {
      return prevQuestions.map(item => {
        if (item.id === question.id) {
          return {
            ...item,
            questionData: {
              ...item.questionData,
              options: item.questionData.options.map(opt => {
                if (opt.id === optId) {
                  return {
                    ...opt,
                    option: e.target.value
                  };
                }
                return opt;
              }),
            },
          };
        }
        return item;
      });
    });
  }

  const handleRemoveOpt = (optId) => {
    if(question.questionData.options.length > 1){
      setQuestions(prevQuestions => {
        return prevQuestions.map(item => {
          if (item.id === question.id) {
            return {
              ...item,
              questionData: {
                ...item.questionData,
                options: item.questionData.options.filter(opt => opt.id !== optId),
              },
            };
          }
          return item;
        });
      });
    }
  }

  const handleItemBelongs = (e, optId) => {
    setQuestions(prevQuestions => {
      return prevQuestions.map(item => {
        if (item.id === question.id) {
          return {
            ...item,
            questionData: {
              ...item.questionData,
              options: item.questionData.options.map(opt => {
                if (opt.id === optId) {
                  return {
                    ...opt,
                    belongsTo: e.target.value
                  };
                }
                return opt;
              }),
            },
          };
        }
        return item;
      });
    });
  }

  const handleAddItem = () => {
    setQuestions(prevQuestions => {
      return prevQuestions.map(item => {
        if (item.id === question.id) {
          const optLength = item.questionData.options.length
          return {
            ...item,
            questionData: {
              ...item.questionData,
              options: [
                ...item.questionData.options,
                {
                  id: item.questionData.options[optLength-1].id + 1,
                  option: "",
                  belongsTo: "",
                }
              ],
            },
          };
        }
        return item;
      });
    });
  }

  const handleImageUpload = (event) => {
    const files = event.target.files;
    if (files[0]) {
      const fileName = `question ${question.id} ${uniqueFormId}`;
      const fileExtension = files[0].name.split('.').pop(); 
      const newFileName = `${fileName}.${fileExtension}`;
      
      // Now you can use 'newFileName' for your file operations
      console.log(newFileName);
      setImageFiles((prevFiles) => ({
        ...prevFiles,
        [question.id]: files[0],
      }));
    }
  };

  return (
    <div className='bg-white text-lg mx-auto h-fit w-4/6 p-4 shadow-slate-700 shadow-md rounded-lg mb-7 border-b-2 border-l-2' >
      <div className='px-5 py-3'> 

        <div>
          <div className='mb-2 flex justify-between'>
            Question {question.id}
            <div>
              <FormControlLabel control={<Switch checked={question.isRequired ? question.isRequired: false} onChange={handleIsRequired} />} label="Required" />
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
          <TextField 
            placeholder='Enter your question here'
            className='w-3/6'
            required
            value={question.questionData.question}
            onChange={handleQuestionChange}
          />
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
        
        <div className='mt-5'>
          <div>Categories</div>
          {question.questionData.categories.map((cat,index) => (
            <CategoryContainer key={index} data={{ id: index, queId: question.id, setQuestions}}>
              <CategoryCard data={{ cat, index,handleCatChange, handleRemoveCat }} />
            </CategoryContainer>
          ))}
          <div className='w-2/6 my-5'>
            <div onClick={handleAddCat} className='w-1/2 h-10 mx-auto bg-slate-300 flex justify-center items-center rounded-md hover:text-teal-100 hover:bg-slate-700 hover:cursor-pointer' >
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

        <div className='w-4/6 px-8 mt-8 flex justify-between'>
          <div>Item</div>
          <div>Belongs To</div>
        </div>

        <div>
        {question.questionData.options.map((opt, index) => (
          <CatItemContainer key={index} data={{ id: index, queId: question.id,setQuestions}}>
            <CatItemCard data={{opt, index, handleOptChange, handleRemoveOpt, handleItemBelongs, categories: question.questionData.categories}}/>
          </CatItemContainer>
          ))}
        </div>
        
        </div>

        <div className='w-4/6 my-5'>
          <div onClick={handleAddItem} className='w-1/2 h-10 mx-auto bg-slate-300 flex justify-center items-center rounded-md hover:text-teal-100 hover:bg-slate-700 hover:cursor-pointer' >
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
  )
}

export default Categorize