import React, {useState} from 'react';
import 'mdbreact/dist/css/mdb.css';
import './App.css';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import WelcomePage from './components/WelcomePage/WelcomePage';
import HomePage from './components/HomePage/Homepage';
import SourcesPage from "./components/SourcesPage/SourcesPage";
import NavbarPage from './components/Navbar/Navbar';
import LoginPage from "./components/Login/Login";
import RegistrationPage from "./components/Signup/Signup";
import NotFound from "./components/NotFound/NotFoundPage";
import {render} from "react-dom";
import {useDispatch, useSelector, useStore} from "react-redux";


function App(props) {

    console.log(window.location.pathname);

    const [userStatus, setUserStatus] = useState(false);
    const store = useStore();


    store.subscribe(function () {
        store.getState().loggedIn === true ? setUserStatus(true) : setUserStatus(false);
    });

    console.log(store.getState());
    console.log(userStatus);

    if (!userStatus) {
        return (
            <Router>
                <div className="App">
                    <Switch>
                        <Route path="/" exact component={WelcomePage}/>
                        <Route path="*" component={NotFound}/>
                    </Switch>
                </div>
            </Router>
        )
    } else {
        return (
            <Router>
                <div className="App">
                    <NavbarPage/>
                    <Switch>
                        <Route path="/" exact component={HomePage}/>
                        <Route path="/Home" component={HomePage}/>
                        <Route path="/Sources" component={SourcesPage}/>
                        <Route path="*" component={NotFound}/>
                    </Switch>
                </div>
            </Router>
        )
    }


}

export default App;

//
// import React from 'react';
// import './App.css';
// import {connect} from 'react-redux'
// import LoginPage from "./components/Login/Login";
// import RegistrationPage from "./components/Signup/Signup";
// // import {autoLogin} from './actions/userActions'
//
// class App extends React.Component{
//
//     componentDidMount(){
//         // this.props.autoLogin()
//     }
//
//     render(){
//         return (
//             <div className="App">
//                 {
//                     // console.log(this.props)
//                     this.props.userReducer && this.props.userReducer.loggedIn  ?  <h1>Welcome, {this.props.userReducer.user.username}</h1> :<h1>Sign Up or Login!</h1>
//                 }
//                 <LoginPage/>
//                 <RegistrationPage/>
//                 <button>Logout</button>
//             </div>
//         );
//     }
// }
//
// const mapStateToProps = (state) => {
//     return {
//         userReducer: state.userReducer
//     }
// };
//
// // const mapDispatchToProps = (dispatch) => {
// //     return {
// //         autoLogin: () => dispatch(autoLogin())
// //     }
// // };
//
// export default connect(mapStateToProps)(App);
