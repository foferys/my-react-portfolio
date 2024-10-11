import { createContext, useState } from "react";



export const ClickTermCatContext = createContext();

export const ClickTermCatProvider = ({children}) => {

    const [terminalClicked, setTerminalClicked] = useState("no");

    return (
        <ClickTermCatContext.Provider value={{terminalClicked, setTerminalClicked}}>
            {children}
        </ClickTermCatContext.Provider>

    );
};