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
                <textarea onChange={()=>listtext(widget.id,listText.value)} ref={node=>listText=node} value={widget.listText} placeholder="Put each item in a separate row"/><br/>
                <select ref={node=>listType=node} value={widget.listType} onChange={()=>listtype(widget.id,listType.value)}>
                    <option>Ordered List</option>
                    <option>Unordered List</option>
                </select>
                <input placeholder="Widget Name" type="text" ref={node=>widgetName=node} onChange={()=>widgetNamePlace(widget.id,widgetName.value)} value={widget.widgetName}/><br/>
            </div>
            {widget.listType==='Ordered List' && <OrderedList key={widget.id} list={widget.listText}/>}
            {widget.listType==='Unordered List' && <UnorderedList key={widget.id} list={widget.listText}/>}
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