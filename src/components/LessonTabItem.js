import React from 'react';
import Modal from 'react-responsive-modal';

class LessonTabItem extends React.Component{

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
            <li className="nav-item" style={{"color":"white"}}>
                <Modal open={open} onClose={this.onCloseModal} center>
                    <br/>
                    <br/>
                    Are you sure?<br/><br/>
                    <button type="button" className="btn btn-danger float-right"
                            onClick={() =>{
                                this.props.delete(this.props.lesson.id)}}>
                        Delete
                    </button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button type="button" className="btn btn-success float-left"
                            onClick={this.onCloseModal}>
                        Cancel
                    </button>
                </Modal>
                {this.props.lesson.title}&nbsp;
                <button className="btn btn-dark" type="button" onClick={this.onOpenModal}>
                    <i className="fa fa-times" style={{color:"white"}}></i>
                </button>
            </li>
        );

    }

}

export default LessonTabItem;