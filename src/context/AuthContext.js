import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export const AuthContext = createContext(null);
const initialAuthData = {};

const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState(initialAuthData);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const publicKey = localStorage.getItem('publicKey');
        if (publicKey) {
            const hdKey = JSON.parse(localStorage.getItem('hdKey'));
            setAuthData({ publicKey, hdKey });
        }
        setLoading(false);
    }, []);

    const onLogin = (newAuthData) => {
        localStorage.setItem('publicKey', newAuthData.publicKey);
        localStorage.setItem('hdKey', JSON.stringify(newAuthData.hdKey));
        setAuthData({ publicKey: newAuthData.publicKey, hdKey: newAuthData.hdKey });
    };

    const onLogout = () => {
        localStorage.removeItem('publicKey');
        localStorage.removeItem('hdKey');
        setAuthData(initialAuthData);
    };

    // const resetAuthData = (userInfo) => {
    //     localStorage.setItem('userInfo', JSON.stringify(userInfo));
    //     setAuthData({ userInfo });
    // };

    const authDataValue = useMemo(() => ({ authData, onLogin, onLogout }), [authData]);

    return (
        <AuthContext.Provider value={authDataValue}>{!loading && children}</AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthProvider;
