import React from "react";
import { Link } from "react-router-dom";

export default function Logo() {
    return (
        <div className="Logo">
            <Link>
                <span>a</span>
                <span>v</span>
                <span>c</span>
                <span className="Logo-news">news</span>
            </Link>
        </div>
    );
}
