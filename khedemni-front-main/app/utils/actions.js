'use server'
import { cookies } from 'next/headers'
import decodeToken from './jwt';
 

export const handleLogin = (sessionData) => { 
  const decodedToken = decodeToken(sessionData?.token);
  const currentTime = Math.floor(Date.now() / 1000); // Convert to seconds
  const expirationTime = decodedToken.exp;
  const remainingTime = expirationTime - currentTime;
  const encryptedSessionData = JSON.stringify(sessionData);
  cookies().set('session', encryptedSessionData, {
    httpOnly: true,
    secure: false,
    maxAge: remainingTime , 
    path: '/',
  });
};

export const handleLogout =()=>{
    cookies().set('session', '', {
        expires: new Date(0)
      });      
}

export const getSession=()=>{

  const SessionData = cookies().get('session')?.value
  if(SessionData){
    return JSON.parse(SessionData) ;
  }
  else {
    return null
  }
} 
