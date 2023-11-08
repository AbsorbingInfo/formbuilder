import { TextField, Switch, FormControlLabel, Button, InputLabel  } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ClozeOption from './ClozeOption';
import ClozeOptionContainer from './ClozeOptionContainer';

const Cloze = ({ setQuestions, question, setImageFiles, uniqueFormId}) => {

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

  const handleQueChange = (e) => {
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

  const handleUnderline = () => {
    const selection = window.getSelection().toString();
    if(question.questionData.question.includes(selection) && !selection.includes(' ')){
      setQuestions((prevQuestions) => {
        return prevQuestions.map((item) => {
          if (item.id === question.id) {
            const dashExists = item.questionData.dashs.find((dash) => dash.value === selection);
            if (!dashExists) {
              return {
                ...item,
                questionData: {
                  ...item.questionData,
                  dashs: [
                    ...item.questionData.dashs, 
                    {
                      id: item.questionData.dashs.length + 1,
                      value: selection,
                    }
                  ],
                },
              };
            }
          }
          return item;
        });
      });
           
    }
  };

  const handleRemoveOpt = (dashId) =>{
    setQuestions(prevQuestions => {
      return prevQuestions.map(item => {
        if (item.id === question.id) {
          return {
            ...item,
            questionData: {
              ...item.questionData,
              dashs: item.questionData.dashs.filter(dash => dash.id !== dashId),
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
            <FormControlLabel control={<Switch checked={question.isRequired} onChange={handleIsRequired} />} label="Required" />
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
        <div className='mb-4'>
          <div className='flex'>
            <div className='h-14 w-3/6 border-2 px-2 pt-3'>
                {question.questionData.question.split(' ').map((word, index) => (
                  <span key={index}>
                    {question.questionData.dashs.some(dash => dash.value === word) ? <u>{word}</u> : word}
                    {' '}
                  </span>
                ))}
            </div>
            <Button 
              variant="text" 
              style={{
                marginLeft: 15,
                width: 80,
                height: 55,
              }}
              onClick={handleUnderline}
              >
              Underline
            </Button>
          </div>
          <div>Select just a word with no spaces from above and then click 'Underline'</div>
        </div>
        
        <div>
          <TextField 

            placeholder='Enter your sentence here'
            className='w-3/6'
            value={question.questionData.question}
            onChange={handleQueChange}
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
      
      <div className='mt-5'>
        <div>Options</div>
        {question.questionData.dashs.map((dash,index) => (
          <ClozeOptionContainer key={index} data={{ id: index, queId: question.id, setQuestions}} >
            <ClozeOption data={{opt: dash, index, handleRemoveOpt}} />
          </ClozeOptionContainer>
        ))}
      </div>
    </div>
  </div>
  )
}

export default Cloze