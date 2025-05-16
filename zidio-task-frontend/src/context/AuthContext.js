// import { createContext, useState, useEffect } from "react";

// // Create Context
// export const AuthContext = createContext();

// // AuthProvider
// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);


//   // Check local storage for token when the app loads
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) setUser(JSON.parse(storedUser));
//   }, []);

//   const login = (userData) => {
//     setUser(userData);
//     localStorage.setItem("user", JSON.stringify(userData));
//   };
//   const register = (userData) => {
//     setUser(userData);
//     localStorage.setItem("user", JSON.stringify(userData));
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//   };

//   const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') === 'true');

//   return (
//     <AuthContext.Provider value={{ user, setUser, isAdmin,  login, register, logout,setIsAdmin }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
import { createContext, useState, useEffect } from "react";

// Create Context
export const AuthContext = createContext();

// AuthProvider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check local storage for user when the app loads
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      setIsAdmin(parsed.role === "admin");
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsAdmin(userData.role === "admin");
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const register = (userData) => {
    setUser(userData);
    setIsAdmin(userData.role === "admin");
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, isAdmin, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
