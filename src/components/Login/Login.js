import React, { useContext } from 'react';
import './Login.css';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Button from '@material-ui/core/Button';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';


const Login = () => {
    // Use Context API
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    // User redirect after sign in
    const history = useHistory();
    const location = useLocation();

    const { from } = location.state || { from: { pathname: "/" } };

    // Initialize Firebase
    if(firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    };

    const handleGoogleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
            var token = result.credential.accessToken;
            const {displayName, email} = result.user;
            const signInUser = {name: displayName, email: email};
            console.log(signInUser)
            setLoggedInUser(signInUser);
            history.replace(from);
            
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
          });

    }
    return (
        <div className="login">
            <h1>This is Login</h1>
            <Button onClick={handleGoogleSignIn} variant="contained" color="primary" startIcon={<LockOpenIcon />}> Sign In With Google</Button>
        </div>
    );
};

export default Login;