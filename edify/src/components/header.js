import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { PATH } from './../constants/appConstants'

export default class Header extends Component {

    render() {
        const noUnderline = {
            textDecoration: 'none'
        }

    return (
		<div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light shadow fixed-top">
            <div class="container">
            <Link to={PATH.HOME}><a className="navbar-brand" href="#"><img id="logo" src="./../../logo_name.png" /></a></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
                <div class="d-flex justify-contents-start text-left">
                    <ul class="navbar-nav ms-auto d-flex align-items-center">
                        <li class="nav-item active d-flex">
                        <Link style={noUnderline} to={PATH.HOME}><a className="nav-link" href="#">Home</a></Link>
                        </li>
                        <li class="nav-item">
                        <Link style={noUnderline} to={`/${PATH.TUTORS}`}><a className="nav-link" href="#">Tutors</a></Link>
                        </li>
                        <li class="nav-item">
                        <Link style={noUnderline} to={`/${PATH.APPOINTMENTS}`}><a className="nav-link" href="#">Meetings</a></Link>
                        </li>
                        <li class="nav-item">
                        <a className="nav-link" href="#">About</a>
                        </li>
                        <li>
                            <form class="d-flex align-items-center">
                                <input class="form-control input-sm" type="search" placeholder="Search" aria-label="Search" />
                                <button type="button" class="btn btn-sm m-1"><i class="bi bi-search"></i></button>
                            </form>
                        </li>
                    </ul>
                </div>
                <ul class="navbar-nav ms-auto d-flex align-items-center">
                    <li class="nav-item">
                        <button type="button" class="btn btn-outline-primary btn-sm m-1">Log in</button>
                    </li>
                    <li class="nav-item">
                        <button type="button" class="btn btn-warning btn-sm m-1">Signup</button>
                    </li>
                </ul>
            </div>
            </div>
            </nav>
        </div>
    )
  }
}
