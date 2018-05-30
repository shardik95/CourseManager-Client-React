import * as Actions from "../actions";
import React from 'react';
import {connect} from 'react-redux'

const Image = ({widget,preview,results,imgurl,widgetNamePlace,search}) =>{
    let imageUrlElem;
    let widgetName;
    let searchInput;
    return (
        <div>
            <div hidden={preview}>
                <h2 style={{padding:"10px"}}>{widget.widgetType}</h2>
                <div style={{padding:"10px"}}>
                    <input className="form-control" type="text" placeholder="Link Url" onChange={()=>imgurl(widget.id,imageUrlElem.value)} ref={node=>imageUrlElem=node} value={widget.imageUrl}/><br/>
                    <input className="form-control" placeholder="Widget Name" type="text" ref={node=>widgetName=node} onChange={()=>widgetNamePlace(widget.id,widgetName.value)} value={widget.widgetName}/><br/>
                    <div className="row">
                        <div className="col-10" style={{paddingRight:"0px"}}>
                            <input  placeholder="Google Search (right click on the image to copy image address)" className="form-control" type="text" ref={node=>searchInput=node}/>
                        </div>
                        <div className="col-2 float-right">
                            <button className="btn" style={{background:"#4286f4"}} onClick={()=>search(searchInput.value)}><i className="fa fa-lg fa-search"></i></button>
                        </div>
                    </div>
                    <br/>
                            {results!==undefined &&results.length>0 && results.map(result=>(
                                    <img style={{widget:"150px",height:"150px",margin:"10px"}} src={result}/>
                        ))}
                </div>
                    <h4 style={{padding:"10px"}}>Preview</h4>
            </div>
            <div style={{padding:"10px"}}>
             {widget.widgetType==='Image'&&<img src={widget.imageUrl} style={{width:"300px",height:"300px"}}/>}
            </div>
        </div>

    )
}


const dispatchToImagePropsMapper = dispatch => ({
    imgurl: (id,url)=>Actions.imgurl(id,url,dispatch),
    widgetNamePlace: (id,widgetname)=> Actions.widgetName(id,widgetname,dispatch),
    search:(searchQuery)=> Actions.search(searchQuery,dispatch)
})


export const ImageContainer= connect(null,dispatchToImagePropsMapper)(Image);
