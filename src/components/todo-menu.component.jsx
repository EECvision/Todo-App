import React,{ useState, useEffect, useContext } from 'react';
import update from "immutability-helper";
import TodoItem from './todo-item.component';
import iconSun from '../assets/images/icon-sun.svg';
import iconMoon from '../assets/images/icon-moon.svg';
import { ThemeContext } from './theme-context'

const TodoMenu =()=>{    
    const [ value, setValue ] = useState('');
    const [ todoItems, setTodoItems ] = useState([]);
    const [ filteredItem, setFilteredItem ] = useState([])
    const [ state, setState ] = useState({all: true, active: false, completed: false})
    const {
        todoItemBg, txtColor, toggleTheme, dragDropTxtColor,bg,
        setToggleTheme, setTheme, checkBtnBorder, footerTxtColor
    } = useContext(ThemeContext);

    useEffect(()=>{
        document.body.style.backgroundColor=bg
        setFilteredItem(todoItems);

        return()=>{
            document.body.style.backgroundColor=null
        }

    },[todoItems, bg])

    const handleChange=(e)=>{
        setValue(e.target.value)
    }

    const saveTodoItem=()=>{
        if(value === '') return
        setTodoItems([...todoItems, { id: new Date(), value: value, completed:false}])
        setValue('')
        setState({all:true})
    }

    const handleComplete =(id)=>{
        setTodoItems(
            todoItems.map(item => {
            return item.id === id ? {...item, completed:!item.completed} : item
        }))        
    }

    const handleFilter =(e)=>{
        if(e === 'all'){
            setFilteredItem(todoItems)
            setState({all:true})
        }else if( e === 'active' ){
            setFilteredItem(todoItems.filter(item=>item.completed===false))
            setState({active:true})
        }else if( e === 'completed' ){
            setFilteredItem(todoItems.filter(item=>item.completed===true))
            setState({completed:true})
        }
    }

    const handleClear =()=>{
        setTodoItems(
            todoItems.filter(item => item.completed === false)
        )      
    }

    const moveItem = (dragIndex, hoverIndex) => {
        const draggedItem = filteredItem[dragIndex];
        setFilteredItem(
          update(filteredItem, {
            $splice: [[dragIndex, 1], [hoverIndex, 0, draggedItem]]
          })
        );
      };

    return (
        <div className="absolute w-full max-w-lg flex flex-col items-center justify-center transform translate-y-16">
            <div className="w-full flex items-center justify-between mb-16 px-4 sm:px-0">
                <div className="text-white text-3xl font-medium tracking-widest uppercase">todo</div>
                <div onClick={()=>{setToggleTheme(!toggleTheme); setTheme()}} className="cursor-pointer">
                    {
                        !toggleTheme 
                        ? <img src={iconSun} alt="icon"/>
                        : <img src={iconMoon} alt="icon"/>
                    }
                </div>
            </div>
            <div style={{background:`${todoItemBg}`}} className="w-full flex items-center justify-start rounded py-4 px-6 mb-4">
                <button
                    onClick={saveTodoItem}
                    style={{border: `1px solid ${checkBtnBorder}`}} className="w-5 h-5 rounded-full mr-4"
                />
                <input 
                    type="text"
                    value={value}
                    onChange={handleChange}
                    placeholder="Create a new todo..."
                    style={{color: `${txtColor}`, background: `${todoItemBg}`}} 
                    className="w-4/5 px-2 text-sm focus:outline-none"
                    autoFocus
                />
            </div>
            {
                filteredItem
                .map((item, idx) => (
                    <TodoItem key={item.id} index={idx} {...item} moveItem={moveItem} isComplete={handleComplete}/>
                ))
            }
            <div 
                style={{background:`${todoItemBg}`, color: `${footerTxtColor}`}} 
                className="w-full flex flex-wrap items-center justify-between rounded-b-md py-3 px-6 mb-12 shadow-2xl"
            >
                <div className="text-xs mb-4 sm:mb-0">{todoItems.filter(item=>item.completed===false).length}{' '}items left</div>
                <div className="w-full sm:w-2/5 flex flex-wrap items-center justify-evenly text-sm font-medium">
                    <button className={`${state.all ? 'text-blue-500' : ''}`} onClick={()=>handleFilter('all')}>All</button>
                    <button className={`${state.active ? 'text-blue-500' : ''}`} onClick={()=>handleFilter('active')}>Active</button>
                    <button className={`${state.completed ? 'text-blue-500' : ''}`} onClick={()=>handleFilter('completed')}>Completed</button>
                </div>
                <button onClick={handleClear} className="text-xs mt-4 sm:mt-0">clear completed</button>
            </div>
            <div style={{color: `${dragDropTxtColor}`}} className="w-full text-center text-xs font-medium">Drag and Drop to reorder list</div>
        </div>
    )
}

export default TodoMenu;
