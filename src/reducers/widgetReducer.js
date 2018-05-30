import * as Constants from "../constants";

function immutablySwapItems(items, firstIndex, secondIndex) {
    const results= items.slice();
    const firstItem = items[firstIndex];
    results[firstIndex] = items[secondIndex];
    results[secondIndex] = firstItem;

    return results;
}

 export const WidgetReducer = (state={
    widgets:[],topicId:"",preview:false,results:[]}, action)=>{
    switch (action.type){

        case Constants.UP:
            let newarray=immutablySwapItems(state.widgets,action.orderWidget-1,action.orderWidget-2)
            newarray[action.orderWidget-2].orderWidget=newarray[action.orderWidget-2].orderWidget-1
            newarray[action.orderWidget-1].orderWidget=newarray[action.orderWidget-1].orderWidget+1
            return{
                widgets:newarray,
                topicId:state.topicId,
                preview:state.preview
            }

        case Constants.DOWN:let newarray2=immutablySwapItems(state.widgets,action.orderWidget-1,action.orderWidget)
            newarray2[action.orderWidget].orderWidget=newarray2[action.orderWidget].orderWidget+1
            newarray2[action.orderWidget-1].orderWidget=newarray2[action.orderWidget-1].orderWidget-1
            return{
                widgets:newarray2,
                topicId:state.topicId,
                preview:state.preview
            }

        case Constants.LIST_TYPE:return {
            widgets:state.widgets.map(widget => {
                if (widget.id===action.id){
                    widget.listType=action.listType
                }
                return Object.assign({},widget);
            })
        }

        case Constants.LIST_TEXT:return {
            widgets:state.widgets.map(widget => {
                if (widget.id===action.id){
                    widget.listText=action.listText
                }
                return Object.assign({},widget);
            })
        }

        case Constants.IMAGE_URL:return {
            widgets:state.widgets.map(widget => {
                if (widget.id===action.id){
                    widget.imageUrl=action.imageUrl
                }
                return Object.assign({},widget);
            })
        }


        case Constants.LINK_URL:return {
            widgets:state.widgets.map(widget => {
                if (widget.id===action.id){
                    widget.linkUrl=action.linkUrl
                }
                return Object.assign({},widget);
            })
        }

        case Constants.LINK_TEXT:return {
            widgets:state.widgets.map(widget => {
                if (widget.id===action.id){
                    widget.linkText=action.linkText
                }
                return Object.assign({},widget);
            })
        }

        case Constants.PARAGRAPH_TEXT:return {
            widgets:state.widgets.map(widget => {
                if (widget.id===action.id){
                    widget.paragraphText=action.paragraphText
                }
                return Object.assign({},widget);
            })
        }

        case Constants.PREVIEW:return{
            widgets:state.widgets,
            topicId:action.topicId,
            preview: !action.preview
        }

        case Constants.WIDGET_NAME: return {
            widgets:state.widgets.map(widget => {
                if (widget.id===action.id){
                    widget.widgetName=action.widgetName
                }
                return Object.assign({},widget);
            })
        }

        case Constants.HEADING_SIZE:return {
            widgets:state.widgets.map(widget => {
                if (widget.id===action.id){
                    widget.size=action.size
                }
                return Object.assign({},widget);
            })
        }

        case Constants.HEADING_TEXT:
            return {
                widgets:state.widgets.map(widget => {
                    if (widget.id===action.id){
                        widget.text=action.text
                    }
                    return Object.assign({},widget);
                })
            }

        case Constants.SELECT_WIDGET:
            let newState={
                widgets:state.widgets.filter(widget=>{
                    if(widget.id===action.id) {
                        widget.widgetType = action.widgetType;
                    }
                    return true;
                })}
            return JSON.parse(JSON.stringify(newState));


        case Constants.FIND_WIDGETS_TOPIC:return{
            widgets:action.widgets,
            topicId:action.topicId
        }


        case Constants.ADD:return {
            widgets:[...state.widgets,
                {
                    topicId:action.topicId,
                    id:state.widgets.length+1,
                    widgetType:'Heading',
                    size:'1',
                    widgetName:'',
                    orderWidget:state.widgets.length+1
                }
            ],
            topicId:action.topicId
        }

        case Constants.DELETE: return {
            widgets: state.widgets.filter(widget=>(
                widget.id !== action.id
            )).map(widget=>{
                if(widget.orderWidget>action.orderWidget)
                    widget.orderWidget=widget.orderWidget-1
                return widget;
            }),
            topicId:action.topicId
        }

        case Constants.SAVE: fetch('http://localhost:8080/api/topic/TID/widget'.replace('TID',action.topicId),{
            method:'POST',
            body:JSON.stringify(state.widgets),
            headers:{
                'content-type': 'application/json'
            }
        })
            return state;

        case Constants.SEARCH:
                let array1 =action.results.items.map(result=>(
                        result.pagemap
               ));
                let array2= array1.map(item=>{
                    if(item.cse_image){
                        return item.cse_image
                    }
                }).filter(item=>(
                    item!==undefined
                ))
            let array3=array2.map(item=>item[0]).map(item=>item.src)
            state.results=array3
            return JSON.parse(JSON.stringify(state));


        default: return state;
    }
}