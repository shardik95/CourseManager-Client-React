import * as Constants from "../constants";
import React from 'react';

export const findWidgetsForTopic = (topicId,dispatch) => (
    fetch("http://localhost:8080/api/topic/TID/widget".replace("TID",topicId))
        .then(response => (response.json()))
        .then(widgets => (dispatch(
            {type:'FIND_WIDGETS_TOPIC',
                widgets:widgets,topicId:topicId}
        )))
)

export const save = (topicId,dispatch) =>(
    dispatch({type:Constants.SAVE,topicId:topicId})
)

export const add = (topicId,dispatch) => (
    dispatch({type:Constants.ADD,topicId:topicId})
)

export const preview = (topicId,preview,dispatch) => (
    dispatch({type:Constants.PREVIEW,topicId:topicId,preview:preview})
)

export const selectWidget = (id,topicId,widgetType,dispatch) => (
    dispatch({
        type:Constants.SELECT_WIDGET,
        id:id,
        topicId:topicId,
        widgetType:widgetType
    })
)

export const up = (id,topicId,orderWidget,dispatch) => (
    dispatch(
        {
            type:Constants.UP,
            id:id,
            topicId:topicId,
            orderWidget:orderWidget
        })
)

export const down = (id,topicId,orderWidget,dispatch) =>(
    dispatch(
        {
            type:Constants.DOWN,
            id:id,
            topicId:topicId,
            orderWidget:orderWidget
        }
    )
)

export const deleteWidget = (id,topicId,orderWidget,dispatch) =>(
    dispatch({type: Constants.DELETE, id: id, topicId: topicId,orderWidget:orderWidget})
)

export const headingText = (id,text,dispatch) =>(
    dispatch({
        type:Constants.HEADING_TEXT,
        id:id,
        text:text
    })
)

export const headingSize = (id,size,dispatch) => (
    dispatch({
        type:Constants.HEADING_SIZE,
        id:id,
        size:size
    })
)

export const widgetName = (id,widgetname,dispatch) => (
    dispatch(
        {
            type:Constants.WIDGET_NAME,
            id:id,
            widgetName:widgetname
        }
    )
)

export const paragraphtext = (id,text,dispatch) =>(
    dispatch({
        type:Constants.PARAGRAPH_TEXT,
        id:id,
        paragraphText:text
    })
)

export const linktext = (id,text,dispatch) => (
    dispatch(
        {
            type:Constants.LINK_TEXT,
            id:id,
            linkText:text
        }
    )
)

export const linkurl = (id,url,dispatch) => (
    dispatch(
        {
            type:Constants.LINK_URL,
            id:id,
            linkUrl:url
        }
    )
)

export const listtext = (id,text,dispatch) => (
    dispatch({
        type:Constants.LIST_TEXT,
        id:id,
        listText:text
    })
)

export const listtype = (id,type,dispatch)=>(
    dispatch({
        type:Constants.LIST_TYPE,
        id:id,
        listType:type
    })
)

export const imgurl= (id,url,dispatch)=>(
    dispatch(
        {
            type:Constants.IMAGE_URL,
            id:id,
            imageUrl:url
        }
    )
)

export const search = (searchQuery,dispatch)=>(
    fetch("https://www.googleapis.com/customsearch/v1?key=AIzaSyCG-dD8kckSHXcOJfE82mZzRmU5l2J0b5o&cx=017661173743464904363:okgv-u30f8q&q=QUERY".replace("QUERY",searchQuery))
        .then(response => (response.json()))
        .then(results => dispatch(
            {
                type:Constants.SEARCH,
                results:results
            }
            )
        ))

export const clickImage = (id,result,dispatch) =>(
    dispatch(
        {
            type:Constants.IMAGE_URL,
            id:id,
            imageUrl:result
        }
    )
)