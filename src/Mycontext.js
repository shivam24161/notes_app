import React, { createContext, useState } from 'react';
export const notesContext=createContext();
const Mycontext = (props) => {
  const [notes,setnotes]=useState([]);
  const [searchText,setsearchText]=useState([])
  return (
    <>
    <notesContext.Provider value={{notes,setnotes,searchText,setsearchText}}>
    {props.children}
    </notesContext.Provider>
    </>
  )
}
export default Mycontext;