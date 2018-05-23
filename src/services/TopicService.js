const TOPIC_API_URL="http://localhost:8080/api/course/CID/module/MID/lesson/LID";
const TOPIC_URL="http://localhost:8080/api/topic/TID"

let _singleton=Symbol();

class TopicService{
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }
    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new TopicService(_singleton);
        return this[_singleton]
    }

    findAllTopicsForLesson(courseId,moduleId,lessonId){
        return fetch(TOPIC_API_URL.replace('CID',courseId).replace('MID',moduleId).replace('LID',lessonId))
            .then(function (response) {
                return response.json();
            })
    }

    createTopic(courseId,moduleId,lessonId,topic){
        return fetch(TOPIC_API_URL.replace('CID',courseId).replace('MID',moduleId).replace('LID',lessonId),{
            method:'post',
            body:JSON.stringify(topic),
            headers:{
                'content-type':'application/json'
            }
        }).then(function (response) {
            return response.json();
        });
    }

    deleteTopic(topicId){
        return fetch(TOPIC_URL.replace('TID',topicId),{
            method:'delete'
        })
    }

}

export default TopicService