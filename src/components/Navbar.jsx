import React from 'react'
import logo from '../images/logo.png'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <>
            <nav className="navbar">
                {/* Logo */}
                <div className="logo">
                    <img src={logo} alt="NA" />
                    <Link to="/">Infinity.Run</Link>
                </div>

                {/* menu */}
                <ul>
                    <li>
                        <Link aria-current="page" to="/Rules">Rules</Link>
                    </li>
                    <li>
                        <Link aria-current="page" to="/About">About</Link>
                    </li>
                    <li>
                        <Link aria-current="page" to="https://github.com/yashcode4/" target="_blank">Github</Link>
                    </li>
                    <li>
                        <Link aria-current="page" to="https://www.linkedin.com/in/yash-kumar-yk/" target="_blank">LinkedIn</Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar