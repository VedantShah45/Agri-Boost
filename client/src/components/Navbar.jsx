import React from 'react'
import '../CSS/Navbar.css'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <img src="/images/navlogo.png" alt="" className='nav-logo' />
                <NavLink className="navbar-brand" to='/'>AgriBoost</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link active" aria-current="page" to='/'>HOME</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/login'>LOGIN</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/register'>REGISTER</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/shop'>SHOP</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/about'>ABOUT</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/contact'>CONTACT</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/policy'>POLICY</NavLink>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>


    )
}

export default Navbar
