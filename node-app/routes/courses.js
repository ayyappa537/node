const express = require('express');
const router = express.Router();

const courses = [
    { id:1,name:"Courses1"},
    { id:2,name:"Courses2"},
    { id:3,name:"Courses3"}
]

router.get("/",(req, res)=>{
    res.send(courses);
});

router.post('/',(req, res) => {
    const {error} = validateCourse(req.body);// {error} Object destructuring
    if(error) return res.status(400).send(error.details[0].message);
    
    const course = {
        id: courses.length +1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

router.put('/:id',(req, res)=>{
    const course = courses.find(c=> c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("The course with the Given ID is Not Found.");

    //const result = validateCourse(req.body);
    const {error} = validateCourse(req.body); // {error} Object destructuring
    if(error) return res.status(400).send(error.details[0].message);
      
    course.name = req.body.name;
    res.send(course);

});

router.delete('/:id',(req, res)=>{
    const course = courses.find(c=> c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("The course with the Given ID is Not Found.");

    const index = courses.indexOf(course);
    courses.slice(index, 1);

    res.send(course);

});

router.get("/:courseId",(req, res)=>{
    
    const course = courses.find(c=> c.id === parseInt(req.params.courseId));
    if(!course) return res.status(404).send("The course with the Given ID is Not Found.");

    res.send(course);
});

function validateCourse(course){
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(course);
}

module.exports = router;