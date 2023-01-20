import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

const GoogleAuth = () => {
    const [ user, setUser ] = useState({});

    const handleCallbackResponse = response => {
        console.log("Encoded JWT ID token: " + response.credential);
        var userObj = jwt_decode(response.credential);
        console.log(userObj);
        //will use state to save user's info, but better to use a cache/redux
        setUser(userObj);
        //this allows us to hide the google login in button when someone logins in with Google
        document.getElementById("signInDiv").hidden = true;
      };
    
    const handleSignOut = event => {
        setUser({});
        document.getElementById("signInDiv").hidden = false;
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

        google.accounts.id.prompt();
    }, []); 
    //for the 2nd parameter, we put an empty array because we only want useEffect to run once
};
 
export default GoogleAuth;