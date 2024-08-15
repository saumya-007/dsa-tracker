import React from 'react'

export default function Modal({open, onClose, children}) {
  console.log({open, onClose, children})
  return (
    <div onClick={onClose} className={`
        fixed inset-0 flex justify-center items-center
        transition-colors 
        ${open ? "visible bg-black/20": "invisible"}
    `}>
        <div onClick={(e) => e.stopPropagation()} className={`
            dark:bg-slate-800 rounded-xl shadow p-6 transition-all w-4/5
            ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}>
            {children}
        </div>
    </div>
  )
}


//note: ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"} the else condition is for zoom effect and fade effect
//note: event bubbling causes the modal to close even if we click on it, THE CLICK EVEN ON THE CHILD (inner div) IS BUBBLED UP TO THE PARENT (outer div). To prevent this we need to stop the propagation of the click event e.stopPropagation()