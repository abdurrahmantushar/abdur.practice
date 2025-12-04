
import { createContext, useState } from "react";
export const DataContext = createContext();

export const UserContext = ({ children }) => {
    const [showCard, setShowCard]=useState(false)


    return (
        <DataContext.Provider value={{ showCard,
        setShowCard}}>
            {children}
        </DataContext.Provider>
    );
};
