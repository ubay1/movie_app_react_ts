import React, { useState } from 'react';
import State from './usestate';
import Effect from './useeffect';
import Ref from './useRef';
import Callback from './usecallback';
import Memo from './usememo';
import Context from './usecontext';

export const Learn = () => {
  return(
    <>
      <State />
      <Effect />
      <Ref />
      <Callback />
      <Memo />
      <Context />
    </>
  );
}