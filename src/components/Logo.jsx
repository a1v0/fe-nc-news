import React from "react";
import { NavLink } from "react-router-dom";

export default function Logo() {
    const LogoLettering = () => {
        return (
            <>
                <span>a</span>
                <span>v</span>
                <span>c</span>
                <span className="Logo-news">news</span>
            </>
        );
    };
    return (
        <div role={"banner"} className="Logo" aria-label={"AVC News logo"}>
            <NavLink
                to="/"
                children={({ isActive }) => {
                    return isActive ? (
                        <h1>
                            <LogoLettering />
                        </h1>
                    ) : (
                        <LogoLettering />
                    );
                }}
            />
        </div>
    );
}
