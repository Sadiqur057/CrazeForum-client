import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types'
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import useAxiosCommon from "../hooks/useAxiosCommon";
import auth from "../firebase/firebase.config";

export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
  const googleProvider = new GoogleAuthProvider();
  const axiosCommon = useAxiosCommon();
  const [user, setUser] = useState(null);
  const [reload, setReload] = useState(true);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      if(currentUser){
        // get token and store client
        const userInfo = {email: currentUser.email}
        axiosCommon.post('/jwt',userInfo)
        .then(res=>{
          if(res.data.token){
            localStorage.setItem('access-token', res.data.token)
            setLoading(false)
            setReload(false)
          }
        })
      }else{
        localStorage.removeItem('access-token')
        setLoading(false)
        setReload(false)
      }
      console.log('current user', currentUser)
      
      
    });
    return () => {
      unsubscribe()
    }
  }, [reload, axiosCommon])




  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const signIn = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider)
  }

  const githubLogin = () => {
    const githubProvider = new GithubAuthProvider();
    return signInWithPopup(auth, githubProvider);
  };

  const logOut = () => {
    setLoading(true)
    return signOut(auth)
  }


  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name, photoURL: photo
    })
  }

  const authInfo = {
    user, loading, setReload, createUser, signIn, logOut, updateUserProfile, googleSignIn, githubLogin
  }

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;