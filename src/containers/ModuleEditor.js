import React from 'react';
import LessonTabs from "./LessonTabs";
import LessonEditor from "./LessonEditor";

class ModuleEditor extends React.Component{

    constructor(props){
        super(props);
        this.state={
            moduleId:'',
            courseId:''
        };
        this.setModuleId=this.setModuleId.bind(this);
        this.setCourseId=this.setCourseId.bind(this);
    }

    componentDidMount(){
        this.setModuleId(this.props.match.params.moduleId);
        this.setCourseId(this.props.match.params.courseId);
    }

    setCourseId(courseId){
        this.setState({courseId:courseId});
    }

    setModuleId(moduleId){
        this.setState({moduleId:moduleId});
    }

    componentWillReceiveProps(newProps){
        this.setModuleId(newProps.match.params.moduleId);
        this.setCourseId(newProps.match.params.courseId);
    }

    render(){
        return(
            <div>
                <LessonTabs courseId={this.state.courseId} moduleId={this.state.moduleId}/>
            </div>

        )
    };

}

export default ModuleEditor;