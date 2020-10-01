import React from 'react'


const Header = (props)  => {
    return (
        <>
            <nav className="navbar navbar-expand-md fixed-top bg-dark navbar-dark">
                <a href="#" className="navbar-brand">MY BUDGET</a>
                {props.children} 
            </nav>
              
        </>
    );
}

export default Header;