import React, {useEffect, useState} from 'react';

const useeffect = () => {
  const [email, setEmail] = useState('');
  
  useEffect(() => {
    console.log('mount');
    return () => {
      console.log('unmount');
    }
  }, [email])
  
  return(
    <div>
      <input
        type="text"
        className="border w-full shadow-md rounded-md p-1 mb-2"
        placeholder="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
        }}
        name="email"
      />
    </div>
  );
}

export default useeffect;