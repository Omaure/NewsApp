import React, {useEffect, useState} from "react";
import axios from "axios";
import {MDBBtn, MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBCol, MDBRow} from "mdbreact";
import {Carousel} from "react-bootstrap";
import {useDispatch, useStore} from "react-redux";
import {FcNext, FcPrevious} from "react-icons/all";
import './Homepage.css'
import {Link} from "react-router-dom";

export default function HomePage() {

    const [currentSubscribtions, setSubscribtion] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();

    const store = useStore();

    console.log(store.getState().loggedIn);

    const getSubs = async () => {
        console.log(currentPage);
        axios({
            method: 'get',
            url: `http://localhost:3100/home/getnews/${currentPage}`,
            headers: {'JWT': localStorage.getItem('token')}
        }).then(result => {
            console.log(result.data);
            setSubscribtion(result.data.articles);
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth',
            });
        });
    };

    useEffect(() => {
        getSubs();
    }, [currentPage]);

    const incrementPage = (index) => {
        setCurrentPage(index);
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    };

    const decrementPage = (index) => {
        setCurrentPage(index);
    };

    return (
        <div>
            <div>
                <h1 className='font-italic font-weight-bold text-center text-secondary'>
                    Top News
                </h1>
            </div>
            {(() => {
                if (!currentSubscribtions) {
                    return (
                        <Link className='font-italic font-weight-bold text-center align-content-center text-secondary'
                              to='/Sources'>
                            Subscribe to a Source
                        </Link>
                    )
                } else {
                    return (
                        <div>
                            <Carousel>
                                {
                                    currentSubscribtions.map((currentArticle) => (
                                        <Carousel.Item>
                                            {(() => {
                                                if (currentArticle.urlToImage === "" || currentArticle.urlToImage === null || currentArticle.urlToImage === "null") {
                                                    return (
                                                        <img
                                                            className="d-block w-100"
                                                            src="https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png"
                                                        />

                                                    )
                                                } else {
                                                    return (
                                                        <img
                                                            className="d-block w-100"
                                                            src={`${currentArticle.urlToImage}`}
                                                            alt={"News Image"}
                                                        />)
                                                }
                                            })()}

                                            <Carousel.Caption>
                                                <h3 className='red-text font-weight-bold'> Title:{currentArticle.title}</h3>
                                                <p className='font-weight-bold'>{currentArticle.description}</p>
                                            </Carousel.Caption>
                                        </Carousel.Item>
                                    ))
                                }
                            </Carousel>


                            <MDBRow className='flex-1 mt-4'>
                                {currentSubscribtions.map(currentArticle => {
                                    return (
                                        <MDBCol md="4" className='mb-3'>
                                            <MDBCard className='mycard'>
                                                <MDBCardBody className='align-items-center'>
                                                    <MDBCardTitle className='text-center font-weight-bold'>
                                                        <a className='blue-text text-center' onClick={() => {
                                                            window.open(`${currentArticle.url}`, '_blank')
                                                        }}>
                                                            {currentArticle.title.toUpperCase()}
                                                        </a>
                                                    </MDBCardTitle>
                                                    {(() => {
                                                        if (currentArticle.urlToImage === "" || currentArticle.urlToImage === null || currentArticle.urlToImage === "null") {
                                                            return (
                                                                <img
                                                                    className="d-block w-75 mx-auto mb-3"
                                                                    src="https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png"
                                                                />
                                                            )
                                                        } else {
                                                            return (
                                                                <img
                                                                    className="d-block w-75 mx-auto mb-3"
                                                                    src={`${currentArticle.urlToImage}`}
                                                                />)
                                                        }
                                                    })()}
                                                    <MDBCardText className='font-weight-bolder font-weight-bold'>
                                                        {currentArticle.content === null ? "No Info" : currentArticle.content}
                                                    </MDBCardText>
                                                </MDBCardBody>
                                            </MDBCard>
                                        </MDBCol>
                                    )
                                })}

                            </MDBRow>


                            <MDBBtn
                                color="black"
                                rounded
                                type="button"
                                className="btn-block z-depth-1 font-weight-bold mb-3 text-white"
                                onClick={event => {
                                    currentPage > 0 ? setCurrentPage(currentPage - 1) :
                                        alert('This is the first Page');
                                }}>
                                <FcPrevious/>
                                Previous Page
                            </MDBBtn>

                            <MDBBtn
                                color="black"
                                rounded
                                type="button"
                                className="btn-block z-depth-1 font-weight-bold mb-3 text-white"
                                onClick={event => {
                                    setCurrentPage(currentPage + 1);
                                }}>

                                Next Page
                                <FcNext/>
                            </MDBBtn>
                        </div>)
                }
            })()}

        </div>


    )
}
