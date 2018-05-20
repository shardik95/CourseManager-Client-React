import React from 'react';
import ModuleList from "./ModuleList";


class CourseEditor extends React.Component{

    constructor(props){
        super(props);
        this.state={
            courseId:''
        }
        this.selectCourse=this.selectCourse.bind(this);
    }

    componentDidMount(){
        this.selectCourse(this.props.match.params.courseId);
    }

    componentWillReceiveProps(newProps){
        this.selectCourse(newProps.match.params.courseId);
    }

    selectCourse(id){
        this.setState({courseId:id});
    }

    render(){
        return (
            <div>
                <h3>Course Editor</h3>
                <div>
                    <div className="row">
                        <div className="col-4">
                            <table className="table table-bordered">
                                <thead>
                                    <tr><th>Modules</th></tr>
                                </thead>
                                <tbody>
                                <tr><td><ModuleList courseId={this.state.courseId}/></td></tr>
                                </tbody>

                            </table>
                        </div>
                        <div className="col-8">
                            <h4>Lessons</h4>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default CourseEditor;