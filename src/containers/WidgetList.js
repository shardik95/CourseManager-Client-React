import React from 'react';
import {connect} from 'react-redux';

export const Widget = ({widget}) =>(
    <li>Widget {widget.title}
        <button>Delete Widget</button>
    </li>
)


class WidgetList extends React.Component{

    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <ul>
                    {this.props.widgets.map(
                        widget => (
                            <Widget widget={widget}/>
                        )
                    )}
                </ul>
                <butto>Add Widget</butto>
            </div>
        )
    }

}


export const WidgetContainer = connect()(WidgetList);