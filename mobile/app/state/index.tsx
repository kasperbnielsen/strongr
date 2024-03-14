import React, { createContext, useEffect, useReducer, useState } from 'react';
import { WorkoutModel } from '../../types';
import { Animated } from 'react-native';

const myState = { isLogged: false, test: false, workouts: null, position: new Animated.ValueXY() };

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
      case 2:
        myState.workouts = action;
        break;
      case 3:
        myState.position = action;
        break;
    }
  }

  getState() {
    return myState;
  }
}
