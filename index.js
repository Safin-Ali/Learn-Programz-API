const express = require('express');
const cors = require('cors');

const pythonDocsAPI = express();

const PGlangData = require('./pythonAPIData.json');

const questionsData = require('./questionsAndAnswer.json')

const port = process.env.PORT || 5000;

pythonDocsAPI.use(cors())

// get all language name fata

pythonDocsAPI.get('/',(req,res)=>{
    res.send(PGlangData)
})

// get data categories wise

pythonDocsAPI.get('/category/:uid',(req,res)=>{
    const params = req.params.uid;
    const categoryData = PGlangData.find(elm => params.toLowerCase() === elm.name.toLowerCase());
    res.send(categoryData);
})

// get data subject/topic/id wise

pythonDocsAPI.get('/:langname/:subtitle',(req,res)=>{

    const subjname = req.params.langname;
    let i = 0;
    const getOnlyName = PGlangData.find(elm => subjname.toLowerCase() === elm.name.toLowerCase());
    const subtitle = req.params.subtitle;
    const getSingleData = PGlangData[getOnlyName.id].data.find(elm => parseInt(elm.categoryId) === parseInt(subtitle))
    res.send(getSingleData)
})

// get questions array of object data

pythonDocsAPI.get('/questions/ph/sa',(req,res)=>{
    res.send(questionsData);
})

pythonDocsAPI.listen(port,()=>{
    console.log('This Server Is Running')
})