"use client"

import { createContext, useContext, useState, ReactNode } from 'react';

interface PopupContextType {
    isOpen: boolean;
    message: string;
    isError: boolean;
    onConfirm: () => void;
    showPopup: (message: string, onConfirm: () => void, isError?: boolean) => void;
    closePopup: () => void;
}

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export const PopupProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [onConfirm, setOnConfirm] = useState<() => void>(() => () => { });

    const showPopup = (msg: string, confirmCallback: () => void, error: boolean = false) => {
        setMessage(msg);
        setIsError(error);
        setOnConfirm(() => confirmCallback);
        setIsOpen(true);
    };

    const closePopup = () => {
        setIsOpen(false);
    };

    return (
        <PopupContext.Provider value={{ isOpen, message, isError, onConfirm, showPopup, closePopup }}>
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
