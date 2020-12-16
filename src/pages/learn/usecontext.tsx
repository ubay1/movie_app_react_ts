import React, { useContext } from "react";
import { ColorContext } from './colorContext';

const usecontext = () => {
  const colors = useContext(ColorContext);
  console.log(colors)

  return <div style={{ backgroundColor: colors.red }}>Hello World</div>;
};

export default usecontext;