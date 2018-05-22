import React from 'react';
import ModuleService from "../services/ModuleService";
import ModuleListItem from "../components/ModuleListItem";

class ModuleList extends React.Component{

    constructor(props){
        super(props);
        this.state={
            courseId:'',
            modules:[],
            module:{title:""}
        }
        this.setCourseId=this.setCourseId.bind(this);
        this.renderModules=this.renderModules.bind(this);
        this.moduleService=ModuleService.instance;
        this.titleChanged=this.titleChanged.bind(this);
        this.createModule=this.createModule.bind(this);
        this.deleteModule=this.deleteModule.bind(this);

    }

    setCourseId(courseId){
        this.setState({courseId:courseId});
    }

    componentDidMount(){
        this.setCourseId(this.props.courseId);
    }

    findAllModulesForCourse(courseId) {
        return this.moduleService
            .findAllModulesForCourse(courseId)
            .then((modules) => {this.setModules(modules)});
    }

    setModules(modules) {
        this.setState({modules: modules})
    }

    componentWillReceiveProps(newProps){
        this.setCourseId(newProps.courseId);
        this.findAllModulesForCourse(newProps.courseId)

    }

    deleteModule(moduleId){
        this.moduleService.deleteModule(this.state.courseId,moduleId)
            .then(()=>{
                return this.findAllModulesForCourse(this.state.courseId);
            })
    }

    renderModules(){
        return this.state.modules.map(
            (module) =>{
                return <ModuleListItem courseId={this.state.courseId} module={module} key={module.id} delete={this.deleteModule}/>
            }
        )
    }

    titleChanged(event){
        this.setState({module:{title:event.target.value}});
    }

    createModule(){

        if(this.state.module.title==""){
            var module={
                title:"New Module"
            }
            return this.moduleService.createModule(this.state.courseId,module)
                .then(()=>{
                    this.findAllModulesForCourse(this.state.courseId);
                })
        }
        else{
            return this.moduleService.createModule(this.state.courseId,this.state.module)
                .then(()=>{
                    this.findAllModulesForCourse(this.state.courseId);
                })
        }

    }
/**/

    render(){

        return(
            <div>
                <div id="list-tab" role="tablist">
                    <ul className="list-group">
                                <li className="container-fluid" style={{background:"#343a40",padding:"20px 30px"}}>
                                <div className="row">
                                    <div className="col-10" >
                                        <input type="text" className="form-control" placeholder="Module 1" onChange={this.titleChanged}></input>
                                    </div>
                                    <div className="col-2">
                                        <button className="btn float-right" style={{background:"transparent"}}><i className="fa fa-lg fa-plus" style={{color:"white"}} onClick={this.createModule}></i></button>
                                    </div>
                                </div>
                            </li>
                        {this.renderModules()}
                    </ul>
                </div>
            </div>

        );
    }

}



export default ModuleList;