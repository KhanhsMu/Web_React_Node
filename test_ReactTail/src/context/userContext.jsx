import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

export function UserContextProvider({ children }) {
    const [user, setUser] = useState("");

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
        axios.get('/me', {
            headers: {
            Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
            setUser(res.data.user)
            })
            .catch(err => {
            console.log('Token không hợp lệ hoặc hết hạn:', err)
            localStorage.removeItem('token')
            setUser(null)
            })
        }
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}