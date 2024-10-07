// import React, { useState, useEffect, useRef } from 'react';
// import ConfirmAction from '../confirmAction/ConfirmAction';
// import "./Options.css";

// function Options({ deleteItem, toggleShowEdit, itemName}) {
//     const [showOptions, setShowOptions] = useState(false);
//     const [showConfirmDelete, setShowConfirmDelete] = useState(false);
//     const optionsRef = useRef(null);
//     const iconRef = useRef(null); // Reference for the options icon

//     // Toggle options dropdown
//     function toggleShowOptions() {
//         setShowOptions(prevState => !prevState);
//     }

//     // Toggle delete confirmation dialog
//     function toggleShowConfirmDelete() {
//         setShowConfirmDelete(prevState => !prevState);
//     }

//     // Handle click outside or on the icon to close options
//     useEffect(() => {
//         function handleClickOutside(event) {
//             // Check if clicked outside options or on the icon itself
//             if (optionsRef.current && !optionsRef.current.contains(event.target) && 
//                 iconRef.current && !iconRef.current.contains(event.target)) {
//                 setShowOptions(false);
//             }
//         }

//         if (showOptions) {
//             document.addEventListener("mousedown", handleClickOutside);
//         } else {
//             document.removeEventListener("mousedown", handleClickOutside);
//         }

//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, [showOptions]);

//     return (
//         <>
//             {/* Wrap the options icon in a relative container */}
//             <div className="options-container">
//                 <i
//                     ref={iconRef} // Reference to the icon
//                     className="fa-solid fa-ellipsis options-icon"
//                     onClick={toggleShowOptions}
//                 />
                
//                 {showOptions && (
//                     <div ref={optionsRef} className="options">
//                         <i className="fa-solid fa-caret-up caret-icon"></i>
//                         <div
//                             className="option edit-option"
//                             onClick={() => {
//                                 toggleShowEdit();
//                                 toggleShowOptions();
//                             }}
//                         >
//                             <i className="fa-solid fa-pen edit-icon"></i>
//                             <p>Edit {itemName}</p>
//                         </div>
//                         <div
//                             className="option delete-option"
//                             onClick={() => {
//                                 toggleShowConfirmDelete();
//                                 toggleShowOptions();
//                             }}
//                         >
//                             <i className="fa-solid fa-trash trash-icon"></i>
//                             <p>Delete {itemName}</p>
//                         </div>
//                     </div>
//                 )}
//             </div>

//             {showConfirmDelete && (
//                 <ConfirmAction
//                     header={`Delete ${itemName}`}
//                     message={`Are you sure you want to delete this ${itemName.toLowerCase()}?`}
//                     confirmText="Delete"
//                     cancelText="Cancel"
//                     handleConfirm={deleteItem}
//                     handleCancel={toggleShowConfirmDelete}
//                 />
//             )}
//         </>
//     );
// }

// export default Options;
