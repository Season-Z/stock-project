import React, { createContext } from 'react';

export const layoutContext = createContext();

export const LayoutWrapper = props => {
  return <layoutContext.Provider value={props.value}>{props.children}</layoutContext.Provider>;
};
