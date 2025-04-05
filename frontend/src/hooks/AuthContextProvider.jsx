import { createContext, useState } from "react";

// context creation
const AuthContext = createContext();

function AuthContextProvider({children}){
    const [username,setUsername] = useState();

    // providing context
    return <>
    
        <AuthContext.Provider value={{username,setUsername}}>
            {children}
        </AuthContext.Provider>

    </>
}

// allowing people to use the context
export {AuthContext,AuthContextProvider}