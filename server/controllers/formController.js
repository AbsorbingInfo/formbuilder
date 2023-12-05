const Form = require('../models/form.model')
const Cloze = require('../models/cloze.model')
const Categorize = require('../models/categorize.model')
const Comprehension = require('../models/comprehension.model')

const createForm = async (req, res) => {
  try {
    let { formName, questions } = req.body;
    questions = JSON.parse(questions)
    await Form.deleteMany({})
    await Cloze.deleteMany({})
    await Categorize.deleteMany({})
    await Comprehension.deleteMany({})
    await Form.create({ name: formName, img: req.file ? req.file.buffer : ''})

    questions.forEach((que) => {
      if(que.type === 'categorize'){
        const categorize = new Categorize({
          question: que.questionData.question,
          img: que.questionData.img ? Buffer.from(que.questionData.img, 'base64') : '',
          categories: que.questionData.categories,
          options: que.questionData.options,
          isRequired: que.isRequired
        })
        categorize.save()
      }else if(que.type === 'cloze'){
        const cloze = new Cloze({
          question: que.questionData.question,
          img: que.questionData.img ? Buffer.from(que.questionData.img, 'base64') : '',
          dashs: que.questionData.dashs,
          isRequired: que.isRequired
        })
        cloze.save()
      }else if(que.type === 'comprehension'){
        const comprehension = new Comprehension({
          description: que.questionData.description,
          img: que.questionData.img ? Buffer.from(que.questionData.img, 'base64') : '',
          mcqs: que.questionData.mcqs,
          isRequired: que.isRequired
        })
        comprehension.save()
      }
    })
    return res.status(200).json({ message: "successfully uploaded" });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Error creating the form' });
  }
};

const getForm = async(req, res) => {
  try{
    const [forms, cloze, categorize, comprehension] = await Promise.all([
      Form.find({}),
      Cloze.find({}),
      Categorize.find({}),
      Comprehension.find({})
    ]);

    const finalComprehension = comprehension.map((que) =>{
      return{
        ...que._doc,
        mcqs: que._doc.mcqs.map(mcq => {
          return {
            ...mcq._doc,
            options: mcq._doc.options.map(option => ({
              ...option._doc,
              isCorrect: false
            }))
          }
        })
      }
    })

    const data = [
      {name: forms.length > 0 ? forms[0].name : '',
      img: forms.length > 0 ? forms[0].img : ''},
      {questions: {
        cloze: [...cloze],
        categorize: [...categorize],
        comprehension: [...finalComprehension],
      }}
    ];
    return res.status(200).json(data);
  }catch(error){
    console.log(error)
    return res.status(500).json({ error: 'Error getting the form' });
  }
}

module.exports = {
  createForm,
  getForm
}

