import React, { Component } from "react";
import "./LandingPage.css";
import { Redirect } from "react-router-dom"

const style = {
    wrapper: {
        margin: "0 auto",
        marginTop: '12em',
        width: '50em',
        textAlign: 'center'
    },
    h1Title: {
        fontSize: '100px',
        fontWeight: 200,
        border: "3px solid #c88b96",
        borderRadius: '3px',
        marginBottom: '.25em',
        backgroundColor: '#252830',
        color: '#c88b96'
    },
    input: {
        fontSize: '2rem',
        borderRadius: '5px',
        border: '1px solid #c88b96'
    }
};

class LandingPage extends Component {
    state = {
        roomName: "",
        redirect: false,
        username: "",
        avatar: "https://st2.depositphotos.com/3369547/11372/v/950/depositphotos_113724550-stock-illustration-businessman-concept-avatar-male-person.jpg",
        title: ""
    };

    handleChange = e => {
        const { name, value } = e.target
        this.setState({ ...this.state, [name]: value });
    };

    handleClick = () => {
        localStorage.setItem("userInfo", JSON.stringify(this.state));
        this.handleRedirectState();
    };

    handleRedirectState = () => {
        this.setState({ ...this.state, redirect: true });
    };

    handleSelect = ({ target }) => {
        this.setState({ ...this.state, avatar: target.value });
    };

    renderRedirect = () => {
        if(this.state.redirect) {
            return <Redirect to={`/chatroom/${this.state.roomName}`} />
        }
    };

    render() {
        return (
            <div style={style.wrapper}>
                <h1 style={style.h1Title}>Connex</h1>
                <input className="room-input" onChange={this.handleChange} placeholder="Username" name="username" />
                <input className="room-input" onChange={this.handleChange} placeholder="Title" name="title" />
                <input className="room-input" onChange={this.handleChange} placeholder="Room Name" name="roomName" />
                <select onChange={this.handleSelect} style={{display: "flex", margin: "0 auto", marginBottom: "1em"}}>
                    <option value="https://st2.depositphotos.com/3369547/11372/v/950/depositphotos_113724550-stock-illustration-businessman-concept-avatar-male-person.jpg">Male Avatar</option>
                    <option value="https://st2.depositphotos.com/2703645/11507/v/950/depositphotos_115078618-stock-illustration-woman-avatar-character.jpg">Female Avatar</option>
                </select>
                <button onClick={this.handleClick} className="join-btn">JOIN</button>
                {this.renderRedirect()}
            </div>
        )
    }
}

export default LandingPage