import React,{Component} from 'react';
import CourseList from "./CourseList";
import {BrowserRouter as Router,Link,Route}
    from 'react-router-dom'
import CourseEditor from "./CourseEditor";

class CourseManager extends Component{

    render(){
        return(
            <Router>
                <div className="container-fluid">
                        <div>
                            <Route path="/courses" component={CourseList}></Route>
                            <Route path='/course/:courseId' component={CourseEditor}></Route>
                        </div>
                </div>
            </Router>
        );
    }

}

export default CourseManager;