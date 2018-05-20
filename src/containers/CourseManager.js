import React,{Component} from 'react';
import CourseList from "./CourseList";
import {BrowserRouter as Router,Link,Route}
    from 'react-router-dom'
import CourseEditor from "./CourseEditor";
import ModuleEditor from "./ModuleEditor";

class CourseManager extends Component{

    render(){
        return(
            <Router>
                <div className="container-fluid">
                        <div>
                            <Route path="/courses" component={CourseList}></Route>
                                <div className="row">
                                    <Route path='/course/:courseId' component={CourseEditor}></Route>
                                    <Route path='/course/:courseId/module/:moduleId' component={ModuleEditor}></Route>
                                </div>
                        </div>
                </div>
            </Router>
        );
    }

}

export default CourseManager;