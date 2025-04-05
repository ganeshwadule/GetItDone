import { createContext, useState, useEffect } from "react";

// context creation
const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [username, setUsername] = useState(() => {
    // Load from localStorage on first render
    const storedUsername = localStorage.getItem("username");
    return storedUsername ? JSON.parse(storedUsername) : null;
  });

  // Save to localStorage whenever username state changess
  useEffect(() => {
    if (username) {
      localStorage.setItem("username", JSON.stringify(username));
    } else {
      localStorage.removeItem("username");
    }
  }, [username]);
  // providing context
  return (
    <>
      <AuthContext.Provider value={{ username, setUsername }}>
        {children}
      </AuthContext.Provider>
    </>
  );
}

// allowing people to use the context
export { AuthContext, AuthContextProvider };
