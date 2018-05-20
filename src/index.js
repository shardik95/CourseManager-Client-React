import React from 'react';
import ReactDom from 'react-dom';
import CourseManager from "./containers/CourseManager";
import '../node_modules/font-awesome/css/font-awesome.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';


ReactDom.render(
    <CourseManager/>,
    document.getElementById('root')
)