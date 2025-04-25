// import {createContext, useEffect, useState} from 'react'

// export const UserContext = createContext()

// const UserProvider = ({children}) => {
//     const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')))

//     useEffect(()=>{
//         localStorage.setItem('user', JSON.stringify(currentUser))
//     }, [currentUser])

//     return <UserContext.Provider value={{currentUser, setCurrentUser}}>{children}</UserContext.Provider>
// }
// export default UserProvider;


import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('user')) || null;
        } catch (error) {
            return null;
        }
    });

    useEffect(() => {
        if (currentUser !== null) {
            localStorage.setItem('user', JSON.stringify(currentUser));
        } else {
            localStorage.removeItem('user'); // Cleanup if null
        }
    }, [currentUser]);

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
