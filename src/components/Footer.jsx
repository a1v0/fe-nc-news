import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
    // FOOTER STUFF, e.g. links and copyright
    return (
        <div className="Footer">
            Copyright &copy; 2022 <strong>AVC News</strong>.<br />
            <Link to="/">Home</Link> | <Link to="/">Topics</Link>
        </div>
    );
}
