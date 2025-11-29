"use client"

import { createContext, useContext, useState, ReactNode } from 'react';

interface PopupContextType {
    isOpen: boolean;
    message: string;
    onConfirm: () => void;
    showPopup: (message: string, onConfirm: () => void) => void;
    closePopup: () => void;
}

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export const PopupProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [onConfirm, setOnConfirm] = useState<() => void>(() => () => { });

    const showPopup = (msg: string, confirmCallback: () => void) => {
        setMessage(msg);
        setOnConfirm(() => confirmCallback);
        setIsOpen(true);
    };

    const closePopup = () => {
        setIsOpen(false);
    };

    return (
        <PopupContext.Provider value={{ isOpen, message, onConfirm, showPopup, closePopup }}>
            {children}
        </PopupContext.Provider>
    );
};

export const usePopup = () => {
    const context = useContext(PopupContext);
    if (!context) {
        throw new Error('usePopup must be used within a PopupProvider');
    }
    return context;
};
