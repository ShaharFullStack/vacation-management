import React from 'react';
import { Copyrights } from "../Copyrights/Copyrights";
import { Header } from "../Header/Header";
import { Routing } from "../Routing/Routing";
import "./Layout.css";

export function Layout(): JSX.Element {
    return (
        <div className="Layout">
                <Header />
            <main className="layout-main">
                <div className="main-content-wrapper">
                    <Routing />
                </div>
            </main>
            <footer className="layout-footer">
                <Copyrights />
            </footer>
        </div>
    );
}