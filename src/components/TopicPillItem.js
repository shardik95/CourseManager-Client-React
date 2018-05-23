import React from 'react';
import Modal from 'react-responsive-modal';

class TopicPillItem extends React.Component{

    constructor(props){
        super(props)
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
            <li className="nav-item" style={{background:"grey",color:"white",marginLeft:"5px",paddingLeft:"10px"}}>
                <Modal open={open} onClose={this.onCloseModal} center>
                    <br/>
                    <br/>
                    Are you sure you want to delete?<br/><br/>
                    <button type="button" className="btn btn-danger float-right"
                            onClick={() =>{
                                this.props.delete(this.props.topic.id)}}>
                        Delete
                    </button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button type="button" className="btn btn-success float-left"
                            onClick={this.onCloseModal}>
                        Cancel
                    </button>
                </Modal>
                {this.props.topic.title}
                <button className="btn" type="button" style={{background:"transparent"}} onClick={this.onOpenModal}>
                    <i className="fa fa-times" style={{color:"white"}}></i>
                </button>
            </li>
        );
    }

}

export default TopicPillItem;