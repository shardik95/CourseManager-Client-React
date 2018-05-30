import * as Actions from "../actions";
import React from 'react';
import {connect} from 'react-redux'

const List = ({widget,preview,listtext,listtype,widgetNamePlace})=>{
    let listText;
    let listType;
    let widgetName;
    return (
        <div>
            <div hidden={preview}>
                <h2 style={{padding:"10px"}}>{widget.widgetType}</h2>
                <div className="form-group" style={{padding:"10px"}}>
                    <textarea className="form-control" onChange={()=>listtext(widget.id,listText.value)} ref={node=>listText=node} value={widget.listText} placeholder="Put each item in a separate row"/><br/>
                    <select className="form-control" ref={node=>listType=node} value={widget.listType} onChange={()=>listtype(widget.id,listType.value)}>
                        <option>Ordered List</option>
                        <option>Unordered List</option>
                    </select>
                    <br/>
                    <input className="form-control" placeholder="Widget Name" type="text" ref={node=>widgetName=node} onChange={()=>widgetNamePlace(widget.id,widgetName.value)} value={widget.widgetName}/><br/>
                </div>
                    <h4 style={{padding:"10px"}}>Preview</h4>
            </div>
            <div style={{padding:"10px"}}>
                {widget.listType==='Ordered List' && <OrderedList key={widget.id} list={widget.listText}/>}
                {widget.listType==='Unordered List' && <UnorderedList key={widget.id} list={widget.listText}/>}
            </div>
        </div>
    )

}

const dispatchToListPropsMapper = dispatch => ({
    listtext: (id,text)=>Actions.listtext(id,text,dispatch),
    listtype:(id,type)=>Actions.listtype(id,type,dispatch),
    widgetNamePlace: (id,widgetname)=> Actions.widgetName(id,widgetname,dispatch)
})


const UnorderedList = ({list})=>{
    let i=0;
    return (
        <div>
            <ul>
                {list.split("\n").map((listitem)=>(
                    <li key={i=i+1}>{listitem}</li>
                ))}
            </ul>
        </div>
    )
}


const OrderedList = ({list})=>{
    let i=0;
    return (
        <div>
            <ol>
                {list.split("\n").map((listitem)=>(
                    <li key={i=i+1}>{listitem}</li>
                ))}
            </ol>
        </div>
    )
}

export const ListContainer = connect(null,dispatchToListPropsMapper)(List);