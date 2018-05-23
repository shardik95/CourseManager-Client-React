import React from 'react';
import {BrowserRouter as Router,Link,Route} from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import Modal from 'react-responsive-modal';


class ModuleListItem extends React.Component{

    constructor(props){
        super(props);
    }

    state = {
        open: false,
    };

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };


    render(){
        const { open } = this.state;
        return(
                <li className="list-group-item" data-toggle="list" style={{padding:"0px",background:"#343a40"}}>
                    <Modal open={open} onClose={this.onCloseModal} center>
                        <br/>
                        <br/>
                        Are you sure you want to delete?<br/><br/>
                        <button type="button" className="btn btn-danger float-right"
                                onClick={() =>{
                                    this.props.delete(this.props.module.id)}}>
                            Delete
                        </button>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button type="button" className="btn btn-success float-left"
                                onClick={this.onCloseModal}>
                            Cancel
                        </button>
                    </Modal>
                    <div style={{paddingLeft:"25px",paddingRight:"25px",paddingTop:"15px",paddingBottom:"15px"}}>
                            <NavLink to={`/course/${this.props.courseId}/module/${this.props.module.id}`}
                                     style={{ color: '#000',textDecoration:"none",display:"block",padding:"15px",color:"white"}}
                                     activeStyle={style}>
                                {this.props.module.title}
                                <button type="button" className="btn float-right"
                                            onClick={this.onOpenModal}
                                            style={{padding:"0px",background:"transparent"}}>
                                    <i className="fa fa-lg fa-times" style={{color:"white"}}></i>
                                </button>
                            </NavLink>
                    </div>
                </li>
        );
    }
}

const style={
    fontWeight: 'bold',
    background: 'grey',
};



export default ModuleListItem;