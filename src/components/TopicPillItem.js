import React from 'react';

class TopicPillItem extends React.Component{

    constructor(props){
        super(props)
    }

    render(){
        return(
            <li className="nav-item list-group-item">
                {this.props.topic.title}
                <button className="btn btn-dark" type="button" onClick={()=>{
                    this.props.delete(this.props.topic.id);
                }}>
                    <i className="fa fa-times" style={{color:"white"}}></i>
                </button>
            </li>
        );
    }

}

export default TopicPillItem;