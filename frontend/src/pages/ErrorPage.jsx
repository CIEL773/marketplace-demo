import React from 'react';
import { Link } from 'react-router-dom';
import "@fortawesome/fontawesome-free/css/all.min.css";

function ErrorPage() {
    return (
        <div className="container d-flex flex-column justify-content-center align-items-center">
            <div className="text-center">
                <div className="mb-4">
                    <i className="fas fa-exclamation-circle text-primary" style={{ fontSize: '5rem'}}></i>
                </div>
                <h1 className="display-4 mb-3">Oops, something went wrong!</h1>
                <Link to="/" className="btn btn-primary btn-lg">
                    Go Home
                </Link>
            </div>
        </div>
    );
}

export default ErrorPage;
