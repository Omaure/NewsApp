import React, {useState, useEffect} from "react";
import axios from "axios";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBCard,
    MDBInput,
} from "mdbreact";

import {fetchUser} from "../../actions/userActions";
import {useDispatch, useSelector, useStore} from "react-redux";
import {FcSignature, FcUnlock} from "react-icons/all";
import Cookies from "universal-cookie";

import "./Login.css";
import {Container} from "react-bootstrap";

const sendLoginRequest = (email, password) =>
    axios
        .post(`http://localhost:3100/login`, {
            email,
            password,
        })
        .then((res) => {
            console.log(res);
            console.log(res.data);
            if (res.data.error) {
                console.log("error");
            } else {
                sessionStorage.setItem("user", JSON.stringify(res.data));
                console.log(sessionStorage.getItem('user'));
                return (window.location = `/homepage`);
            }
        });

const loginRequest = (userEmail, userPassword) => {
    console.log(
        userEmail,
        userPassword,
    );
    sendLoginRequest(
        userEmail,
        userPassword
    ).then((req) => alert("Login Successful"));
};

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState("");

    const store = useStore();

    const dispatch = useDispatch();

    const mapUser = useSelector((dispatch) => {
        return {
            fetchUser: (email, password) => {
                dispatch(fetchUser(email, password))
            }
        }
    });

    // useEffect(() => {
    //     console.log("Ya lahweee" + JSON.stringify(email));
    // });

    return (

        <div style={{width: '50%', marginTop: "10%", marginLeft: "auto", marginRight: "auto"}}>
            <MDBCard
                className="card-image signupForm w-100 h-100"
                style={{
                    backgroundImage:
                        "url(https://previews.123rf.com/images/microone/microone1812/microone181200305/112856531-sketch-vintage-books-seamless-pattern-or-background-sketch-education-seamless-book-for-school-litera.jpg)",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                    border: "solid grey 2px",
                }}
            >
                <div className="text-white rgba-stylish-strong pb-2 px-2 z-depth-4 h-35 ">
                    <div className="text-center">
                        <h3 className="white-text mb-2 mt-2 font-weight-bold">
                            <strong>SIGN</strong>
                            <a href="" className="green-text font-weight-bold">
                                <strong> IN <FcUnlock/></strong>
                            </a>
                        </h3>
                    </div>
                    <MDBInput
                        label="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        group
                        type="email"
                        validate
                        labelClass="white-text"
                        className="text-success"
                    />
                    <MDBRow>
                        <MDBCol>
                            <MDBInput
                                label="Password"

                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                group
                                type="password"
                                validate
                                labelClass="white-text"
                                className="md-col-4 m-0 text-success"

                            />
                        </MDBCol>

                    </MDBRow>

                    <MDBRow className="d-flex align-items-center mb-0">
                        <div className="text-center mb-0 col-md-12">
                            <MDBBtn
                                color="success"
                                rounded
                                type="button"
                                className="btn-block z-depth-1 font-weight-bolder"
                                onClick={() => {
                                    dispatch(fetchUser(email, password))
                                }}
                            >
                                SignIn
                                <FcSignature/>
                            </MDBBtn>
                        </div>
                    </MDBRow>

                    <MDBCol md='12'>
                        <p className='font-small white-text d-flex justify-content-end'>
                            Don't have an account?
                            <a href='/Register' className='green-text ml-1 font-weight-bold'>
                                Click here to register
                            </a>
                        </p>
                    </MDBCol>
                </div>
            </MDBCard>

        </div>


    );
}
