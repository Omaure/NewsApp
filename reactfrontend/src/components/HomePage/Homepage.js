import React, {useEffect, useState, useRef} from "react";
import {Card, Image, Button} from "semantic-ui-react";
import axios from "axios";
import {Link} from "react-router-dom";
import {MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle, MDBCol, MDBRow} from "mdbreact";
import {Carousel, Container} from "react-bootstrap";
import NavbarPage from "../Navbar/Navbar";
import {fetchUser, logoutUser} from "../../actions/userActions";
import {useDispatch, useSelector, useStore} from "react-redux";
import {FcNext, FcNews, FcPrevious} from "react-icons/all";


export default function HomePage() {

    const [currentSubscribtions, setSubscribtion] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    let currentIndex = 1;

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
        });
    };

    useEffect(() => {
        getSubs();
    }, [currentPage]);

    const incrementPage = (index) => {
        setCurrentPage(index);
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
            <Carousel>
                {
                    currentSubscribtions.map((currentArticle) => (
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={`${currentArticle.urlToImage}`}
                                alt={"News Image"}
                            />
                            <Carousel.Caption>
                                <h3>{currentArticle.title}</h3>
                                <p>{currentArticle.description}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))
                }
            </Carousel>


            <MDBRow className='flex-1 mt-4'>
                {currentSubscribtions.map(currentArticle => {
                    return (
                        <MDBCol md="4" className='mb-3'>
                            <MDBCard>
                                <MDBCardBody className='align-items-center'>
                                    <MDBCardTitle className='text-center font-weight-bold'>
                                        <a className='blue-text text-center' onClick={() => {
                                            window.open(`${currentArticle.url}`, '_blank')
                                        }}>
                                            {currentArticle.title.toUpperCase()}
                                        </a>
                                    </MDBCardTitle>
                                    <img
                                        className="d-block w-75 mx-auto mb-3"
                                        src={`${currentArticle.urlToImage}`}
                                    />
                                    <MDBCardText className='font-weight-bold'>
                                        {currentArticle.description + "..."}
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
        </div>


    )
}
