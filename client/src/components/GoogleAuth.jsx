import { useEffect, useState } from 'react';
import { useSelector, useDispatch} from 'react-redux'
import {oauthLogin } from '../features/auth/authSlice'
import jwt_decode from 'jwt-decode';

const GoogleAuth = () => {
  const dispatch = useDispatch();
    // const [ user, setUser ] = useState({});
    const handleCallbackResponse = response => {
        console.log("Encoded JWT ID token: " + response.credential);
        const userObj = jwt_decode(response.credential);
        console.log(userObj);
        // setUser(userObj);
        dispatch(oauthLogin(userObj));
        console.log('userObj.email ', userObj.email);
      };
    
    useEffect(() => {
        google.accounts.id.initialize({
          client_id: "304527423234-basf7n96kcqrl08smbges6ts2b6sea1f.apps.googleusercontent.com",
          callback: handleCallbackResponse
        });
    
        google.accounts.id.renderButton(
          document.getElementById("signInDiv"),
          { theme: "outline", size: "large"}
        );
      }, []); 
    //for the 2nd parameter, we put an empty array because we only want useEffect to run once
};
 
export default GoogleAuth;