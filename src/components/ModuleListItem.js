import React from 'react';

class ModuleListItem extends React.Component{

    constructor(props){
        super(props);

    }

    render(){
        return(
            <tr><td>{this.props.module.title}</td>
                <td><span className="float-right">
                   <button type="button" className="btn" onClick={() =>{
                       this.props.delete(this.props.module.id)
                   }}><i className="fa fa-2x fa-times" style={{color:"red"}}></i></button>
                </span></td>
            </tr>
        );
    }
}

export default ModuleListItem;