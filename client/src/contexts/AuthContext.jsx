import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [teamId, setTeamId] = useState("");

    return (
        <AuthContext.Provider value={{ isAdmin, setIsAdmin, teamId, setTeamId }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
