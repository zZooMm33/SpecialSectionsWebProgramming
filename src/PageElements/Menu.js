import React from 'react';

export default function Menu() {
    return (
        <nav className="navbar navbar-dark bg-dark">
            <a className="navbar-brand" href="#">zZooMm</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link disabled" href="#">Features</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link disabled" href="#">Pricing</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
