import React, {useState, useEffect} from "react";
import axios from "axios";
import {
    MDBContainer,
    MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBRow, MDBLink, MDBView, MDBMask
} from "mdbreact";

import {FaJoint, IoMdRemoveCircle} from "react-icons/all";
import './SourcesPage.css';


export default function SourcesPage() {
    const [allSources, setallSources] = useState([]);
    const [userSources, setUserSources] = useState([]);
    let changedSources = [];

    changedSources = userSources;

    const subscribeToSource = (sourceName) => {
        axios
        ({
            method: 'post',
            url: `http://localhost:3100/sources/subscribe`,
            data: {sourceName},
            headers: {'JWT': localStorage.getItem('token')}
        }).then((res) => {
            console.log(res);
            console.log(res.data);
            if (res.data.error) {
                console.log("error");
            } else {
                setUserSources(res.data.sources);
                window.scroll({
                    top: 0,
                    left: 0,
                    behavior: 'smooth',
                });
            }
        })
    };


    const unsubscribeFromSource = (sourceName) => {
        axios
        ({
            method: 'post',
            url: `http://localhost:3100/sources/unsubscribe`,
            data: {sourceName},
            headers: {'JWT': localStorage.getItem('token')}
        }).then((res) => {
            console.log(res);
            console.log(res.data);
            if (res.data.error) {
                console.log("error");
            } else {
                setUserSources(res.data.sources);
                window.scroll({
                    top: 0,
                    left: 0,
                    behavior: 'smooth',
                });
            }
        })
    };

    useEffect(() => {
        axios({
            method: 'get',
            url: `http://localhost:3100/sources/allsources`,
            headers: {'JWT': localStorage.getItem('token')}
        }).then(res => {
            console.log("this is sources page", res.data);
            setallSources(res.data.response.sources);
            setUserSources(res.data.userSources);
        }).catch(err => {
            console.log(err);
        })

    }, []);

    return (
        <div style={{
            backgroundImage: `url(https://ak.picdn.net/shutterstock/videos/7339408/thumb/2.jpg)`,
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat'
        }}>
            <div>
                <h1 className='font-italic font-weight-bold text-center text-secondary'>
                    Sources
                </h1>
            </div>
            <div className='mt-3' style={{
                display: 'flex',
                flexWrap: 'wrap'
            }}>
                <MDBRow className='flex-1'>
                    {allSources.map(currentSource => {
                        let isSubscribed = false;
                        if (userSources.includes(currentSource.id)) {
                            isSubscribed = true;
                        }

                        return (
                            <MDBCol md="4" className='mb-3'>
                                <MDBCard>
                                    <MDBCardBody>
                                        <MDBCardTitle className='text-center font-weight-bold'>
                                            <a className='blue-text text-center' onClick={() => {
                                                window.open(`${currentSource.url}`, '_blank')
                                            }}>
                                                {currentSource.id.toUpperCase()}
                                            </a>
                                        </MDBCardTitle>
                                        <MDBCardText className='font-weight-bold'>
                                            {currentSource.description.slice(0, 100) + "..."}
                                        </MDBCardText>
                                    </MDBCardBody>
                                    {(() => {
                                        if (isSubscribed) {
                                            return (
                                                <MDBBtn
                                                    color="danger"
                                                    rounded
                                                    type="button"
                                                    className="btn-block z-depth-1 font-weight-bold mb-3"
                                                    onClick={() => {
                                                        unsubscribeFromSource(currentSource.id)
                                                    }}> Unsubscribe
                                                    <IoMdRemoveCircle/>
                                                </MDBBtn>
                                            )
                                        }
                                        if (!isSubscribed) {
                                            return (
                                                <MDBBtn
                                                    color="success"
                                                    rounded
                                                    type="button"
                                                    className="btn-block z-depth-1 font-weight-bold mb-3"
                                                    onClick={() => {
                                                        subscribeToSource(currentSource.id)
                                                    }}> Subscribe
                                                    <FaJoint/>
                                                </MDBBtn>
                                            )
                                        }
                                    })()}
                                </MDBCard>
                            </MDBCol>
                        )
                    })}

                </MDBRow>

            </div>
        </div>


    )
}
