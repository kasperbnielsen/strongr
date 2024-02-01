import React, { createContext, useEffect, useReducer, useState } from 'react';

const myState = { isLogged: false, test: false };

export const stateContext = React.createContext(null);

export class UseDispatch {
  tryDispatch(state: number, action: any) {
    switch (state) {
      case 0:
        myState.isLogged = action;
        break;
      case 1:
        myState.test = action;
        break;
    }
  }

  getState() {
    return myState;
  }
}
