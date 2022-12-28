import React from 'react';
import Menu from "./Menu";
import "../style.css";

const Layout = ({title = 'Title', description = 'Description', className, children}) => (
    <div>
        <Menu/>
        <div>
       
    </div>
    <div className={className}>
        {children}
    </div>
    </div>
    
)

export default Layout;