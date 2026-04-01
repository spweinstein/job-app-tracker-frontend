import { createContext, useState, useEffect, useCallback } from "react";

const UserContext = createContext();

const getUserFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const body = token.split(".")[1];
    if (!body) throw new Error("Invalid token");
    const decodedBody = atob(body);
    if (!decodedBody) throw new Error("Could not decode token body");
    const parsedBody = JSON.parse(decodedBody);
    const payload = parsedBody?.payload ?? parsedBody ?? null;
    if (!payload) throw new Error("Could not parse user from token");
    return payload;
  } catch (error) {
    console.error("Error getting user from token: ", error);
    return null;
  }
};

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(getUserFromToken());

  // Memoize signOut to prevent unnecessary re-renders
  const signOut = useCallback(() => {
    localStorage.removeItem("token");
    setUser(null);
  }, [setUser]);

  useEffect(() => {
    // add session expired listener
    // if the token is expired, sign out
    // clear event listener on unmount
    window.addEventListener("app:session-expired", signOut);
    return () => {
      window.removeEventListener("app:session-expired", signOut);
    };
  }, [signOut]);

  return (
    <UserContext.Provider value={{ user, setUser, signOut }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
