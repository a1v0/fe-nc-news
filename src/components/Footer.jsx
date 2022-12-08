import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
    // FOOTER STUFF, e.g. links and copyright
    return (
        <div className="Footer">
            <p>
                Copyright &copy; 2022 <strong>AVC News</strong>.
            </p>
            <p>
                <Link to="/">Home</Link> | <Link to="/user/login">Login</Link>
            </p>
        </div>
    );
}
