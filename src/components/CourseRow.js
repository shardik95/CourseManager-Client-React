import React from 'react';
import {Link} from 'react-router-dom';
import Modal from 'react-responsive-modal';

class CourseRow extends React.Component{

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
            <tr>
                <td>
                    <div>
                        <Modal open={open} onClose={this.onCloseModal} center>
                            <br/>
                            <br/>
                            Are you sure?<br/><br/>
                            <button type="button" className="btn btn-danger float-right"
                                    onClick={() =>{
                                        this.props.delete(this.props.course.id)}}>
                                Delete
                            </button>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <button type="button" className="btn btn-success float-left"
                                    onClick={this.onCloseModal}>
                                Cancel
                            </button>
                        </Modal>
                        <i className="fa fa-book" style={{color:"#4286f4"}}></i>&nbsp;
                        <Link to={`/course/${this.props.course.id}`} style={{ color: '#000' }}>
                             Course - {this.props.course.title}
                        </Link>
                    </div>
                </td>
                <td>Me</td>
                <td>{this.props.course.modified}</td>
                <td><button type="button" className="btn" onClick={this.onOpenModal}><i className="fa fa-2x fa-times" style={{color:"red"}}></i></button>
                </td>
            </tr>
        );
    }

}

export default CourseRow;