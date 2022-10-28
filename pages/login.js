import {signInWithPopup, GoogleAuthProvider, GithubAuthProvider, onAuthStateChanged  } from "firebase/auth";
import { useEffect } from "react";
import {auth} from "./../firebaseConfig";
import { useRouter } from 'next/router';

const provider = new GoogleAuthProvider();

const googleSign = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        // ...
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    });
}

const githubSign = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
        // ...
    });
}


export default function Login() {
    const router = useRouter();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                router.push('/');
            }
          });
    }, [])

    return (
      <div>
        <div onClick={() => googleSign()}>Google signin</div>
        <div onClick={() => githubSign()}>Github signin</div>
      </div>
    )
  }
  