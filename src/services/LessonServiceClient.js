const LESSON_API_URL="http://localhost:8080/api/course/CID/module/MID/lesson";
const LESSONS_URL="http://localhost:8080/api/lesson/LID"
let _singleton=Symbol();

class LessonServiceClient{
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }
    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new LessonServiceClient(_singleton);
        return this[_singleton]
    }

    findAllLessonsForCourse(courseId,moduleId){
        return fetch(LESSON_API_URL.replace('CID',courseId).replace('MID',moduleId))
            .then(function (response) {
                return response.json();
            })
    }

    createLesson(courseId,moduleId,module){
        return fetch(LESSON_API_URL.replace('CID',courseId).replace('MID',moduleId),{
            method:'post',
            body:JSON.stringify(module),
            headers:{
                'content-type':'application/json'
            }
        }).then(function (response) {
            return response.json();
        });
    }

    deleteLesson(lessonId){
        return fetch(LESSONS_URL.replace('LID',lessonId),{
            method:'delete'
        })
    }
}

export default LessonServiceClient;