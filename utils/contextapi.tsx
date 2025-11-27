"use client"

import {
    createContext,
    useState,
    ReactNode,
    useContext
} from "react";
import Cookies from "js-cookie";

interface DataUser {
    userId: number | null;
    role: string | null;
    isAccepted?: boolean | null;
    token: string | null;
}

interface AuthContextType {
    userData: DataUser | null;
    login: (payload: DataUser) => void;
    logout: (redirectTo?: string) => void;
    isLoading: boolean;
}

type AuthProviderProps = {
    children: ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getUserDataFromCookies = (): DataUser | null => {
    const userId = Cookies.get("userId");
    const role = Cookies.get("role");
    const token = Cookies.get("token");
    const isAccepted = Cookies.get("isAccepted");

    if (!userId && !role && !token && !isAccepted) {
        return null;
    }

    return {
        userId: userId ? Number(userId) : null,
        role: role ?? null,
        token: token ?? null,
        isAccepted: isAccepted ? isAccepted === "true" : null
    };
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [userData, setUserData] = useState<DataUser | null>(() => getUserDataFromCookies());
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const cookieOptions = {
        sameSite: "strict" as const,
        secure: false,
        path: "/",
        expires: 7
    };

    const login = (payload: DataUser) => {
        setIsLoading(true);
        setUserData(payload);

        Cookies.set("userId", String(payload.userId), cookieOptions);
        Cookies.set("role", payload.role ?? "", cookieOptions);
        Cookies.set("token", payload.token ?? "", cookieOptions);
        Cookies.set("isAccepted", String(payload.isAccepted ?? false), cookieOptions);

        setIsLoading(false);
    };

    const logout = (redirectTo?: string) => {
        setIsLoading(true);
        setUserData(null);
        Cookies.remove("userId");
        Cookies.remove("role");
        Cookies.remove("token");
        Cookies.remove("isAccepted");
        setIsLoading(false);

        window.location.href = redirectTo ?? "/";
    };

    return (
        <AuthContext.Provider value={{ userData, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
