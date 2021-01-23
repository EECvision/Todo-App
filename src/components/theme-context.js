import {useState, createContext} from 'react';

export const ThemeContext = createContext()

const ThemeContextProvider=({children})=>{
    const [toggleTheme, setToggleTheme] = useState(false);

    const [todoItemBg, setTodoItemBg] = useState('hsl(235, 24%, 19%)');
    const [checkBtnBorder, setCheckBtnBorder] = useState('hsl(235, 19%, 35%)');
    const [txtColor, setTxtColor] = useState('hsl(233, 11%, 84%)');
    const [footerTxtColor, setFooterTxtColor] = useState('hsl(236, 9%, 61%)');
    const [dragDropTxtColor, setDragDropTxtColor] = useState('hsl(233, 14%, 35%)');
    const [bg, setBg] = useState('hsl(235, 21%, 11%)')
    const setTheme =()=>{
        if(toggleTheme){
            setTodoItemBg('hsl(235, 24%, 19%)');
            setCheckBtnBorder('hsl(235, 19%, 35%)');
            setTxtColor('hsl(233, 11%, 84%)');
            setFooterTxtColor('hsl(236, 9%, 61%)');
            setDragDropTxtColor('hsl(233, 14%, 35%)')
            setBg('hsl(235, 21%, 11%)')
        }else{
            setTodoItemBg('hsl(0, 0%, 98%)');
            setCheckBtnBorder('hsl(233, 11%, 84%)');
            setTxtColor('hsl(235, 19%, 35%)');
            setFooterTxtColor('hsl(236, 9%, 61%)');
            setDragDropTxtColor('hsl(236, 9%, 61%)')
            setBg('hsl(0, 0%, 98%)')
        }
    }

    return (
        <ThemeContext.Provider value={{toggleTheme, setToggleTheme, setTheme, bg, todoItemBg, checkBtnBorder, txtColor, footerTxtColor, dragDropTxtColor}}>
            {children}
        </ThemeContext.Provider>
    )
}


export default ThemeContextProvider;