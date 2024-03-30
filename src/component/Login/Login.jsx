
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from "../../firebase/firebase.init";
import { useState } from "react";

const Login = () => {
    const [user, setUser] = useState(null);
    const auth = getAuth(app)
    console.log(app);
    const Provider = new GoogleAuthProvider;

    const handleSignIn = () => {
        signInWithPopup(auth, Provider)
            .then(result => {
                const logInUser = result.user;
                console.log(logInUser);
                setUser(logInUser);
            })
            .catch(error => {
                console.log('error', error.message);
            })
    }
    const handleSignOut = () =>{
        signOut(auth)
        .then(result => {
            console.log(result);
            setUser(null)
        })
        .catch(error=>{
            console.log(error);
        })
    }
    return (
        <div>
           {
            user ?
             <button onClick={handleSignOut}>SignOut</button> :
            <button onClick={handleSignIn}>Google Login</button>
            }
            {
                user && <div>
                    <h3>User: {user.displayName}</h3>
                    <p>Email: {user.email}</p>
                    <img src = {user.photoURL}/>
                </div>
            }
        </div>
    );
};

export default Login;