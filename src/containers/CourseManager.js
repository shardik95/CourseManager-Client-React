import React,{Component} from 'react';
import CourseList from "./CourseList";
import {BrowserRouter as Router,Link,Route}
    from 'react-router-dom'
import CourseEditor from "./CourseEditor";
import ModuleEditor from "./ModuleEditor";
import LessonEditor from "./LessonEditor";

class CourseManager extends Component{

    render(){
        return(
            <Router>
                <div>
                    <div>
                        <Route path="/courses" component={CourseList}></Route>
                                <div className="row">
                                    <div className="col-4" style={{paddingRight:"0px"}}>
                                        <Route path='/course/:courseId' component={CourseEditor}></Route>
                                    </div>
                                    <div className="col-8" style={{paddingLeft:"0px"}}>
                                        <div>
                                             <Route path='/course/:courseId/module/:moduleId' component={ModuleEditor}></Route>
                                            <div style={{margin:"5px"}}>
                                             <Route path="/course/:courseId/module/:moduleId/lesson/:lessonId" component={LessonEditor}></Route>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                </div>
            </Router>
        );
    }

}

export default CourseManager;