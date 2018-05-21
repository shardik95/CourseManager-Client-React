import React from 'react';
import ModuleService from "../services/ModuleService";
import ModuleListItem from "../components/ModuleListItem";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

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


    render(){

        return(
            <div>
            <table className="table table-hover">
                <tbody>
                <tr>
                    <td><input type="text" className="form-control" placeholder="Module 1" onChange={this.titleChanged}></input></td>
                    <td><span className="float-right"><button className="btn "><i className="fa fa-2x fa-plus" onClick={this.createModule}></i></button></span></td>
                </tr>
                {this.renderModules()}
                </tbody>
            </table>
                <BootstrapTable data={this.state.modules} selectRow={ selectRowProp } striped hover version='4'>
                    <TableHeaderColumn isKey dataField='id' hidden={true}></TableHeaderColumn>
                    <TableHeaderColumn dataField='title'>Module</TableHeaderColumn>
                </BootstrapTable>
            </div>

        );
    }

}

const selectRowProp = {
    mode: 'radio',
    bgColor: 'lightblue', // you should give a bgcolor, otherwise, you can't regonize which row has been selected
    hideSelectColumn: true,  // enable hide selection column.
    clickToSelect: true
};


export default ModuleList;