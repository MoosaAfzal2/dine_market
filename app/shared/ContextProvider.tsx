'use client';

import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

export interface ContextI {
    quantity: number
    setquantity?: Dispatch<SetStateAction<number>>
}

export const ThemeContext = createContext<ContextI>({ quantity: 1 });

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [quantity, setquantity] = useState(1)
    return (
        <ThemeContext.Provider value={{ quantity, setquantity }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useThemeContext = () => useContext<ContextI>(ThemeContext);