import React, { useContext, useRef } from 'react';
import iconCheck from '../assets/images/icon-check.svg';
import { ThemeContext } from './theme-context'
import { useDrag, useDrop } from "react-dnd";

const type = 'list';
const TodoItem =({ isComplete, value, completed, id, index, moveItem })=>{
    const {todoItemBg, txtColor, checkBtnBorder} = useContext(ThemeContext);

    const ref = useRef(null); // Initialize the reference
    
    // useDrop hook is responsible for handling whether any item gets hovered or dropped on the element
    const [, drop] = useDrop({
      // Accept will make sure only these element type can be droppable on this element
      accept: type,
      hover(item) { // item is the dragged element
        if (!ref.current) {
          return;
        }
        const dragIndex = item.index;
        // current element where the dragged element is hovered on
        const hoverIndex = index;
        // If the dragged element is hovered in the same place, then do nothing
        if (dragIndex === hoverIndex) { 
          return;
        }
        // If it is dragged around other elements, then move the image and set the state with position changes
        moveItem(dragIndex, hoverIndex);
        /*
          Update the index for dragged item directly to avoid flickering
          when the image was half dragged into the next
        */
        item.index = hoverIndex;
      }
    });
  
    // useDrag will be responsible for making an element draggable. It also expose, isDragging method to add any styles while dragging
    const [{ isDragging }, drag] = useDrag({
      // item denotes the element type, unique identifier (id) and the index (position)
      item: { type, id: id, index },
      // collect method is like an event listener, it monitors whether the element is dragged and expose that information
      collect: monitor => ({
        isDragging: monitor.isDragging()
      })
    });
    
    /* 
      Initialize drag and drop into the element using its reference.
      Here we initialize both drag and drop on the same element (i.e., Image component)
    */
    drag(drop(ref));

    return (
        <>
            <div ref={ref} style={{background:`${todoItemBg}`, opacity: isDragging ? 0 : 1}} className="w-full flex items-center justify-start border-b border-gray-500 rounded-t py-4 px-6">
                <button 
                    onClick={()=>isComplete(id, value)}
                    style={{border: `1px solid ${checkBtnBorder}`}} 
                    className={`w-5 h-5 bg-gradient-to-r ${completed ? 'from-blue-500 to-purple-500': ''} rounded-full mr-4 flex items-center justify-center`}>
                    {
                        completed ?
                        <img src={iconCheck} alt="icon"/> 
                        : null
                    }
                </button>
                <p style={{color: `${txtColor}`}} className={`${completed ? 'line-through opacity-50' : 'no-underline'}`}>{value}</p>
            </div>
        </>
    )    
}
export default React.memo(TodoItem);