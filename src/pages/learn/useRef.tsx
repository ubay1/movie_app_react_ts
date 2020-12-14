import React, { useRef } from 'react';

const useref = () => {
  const inputRef = useRef(null);

  return (
    <div className="m-3">
      <div className="text-3xl font-bold mb-5">4. useRef</div>
      <div className="text-xl mb-5">
        React hooks useRef umunnya digunakan untuk mengakses DOM node dalam sebuah komponen.
        Misal kita mau mengakses element input, maka kita bisa menambahkan ref ke element inputnya.
      </div>

      <div className="mb-5 flex flex-row justify-center items-center">
        <input 
          ref={inputRef} 
          type="text" 
          name="inputref" 
          className="border rounded-md shadow-md p-1" 
          placeholder="input ref"
        />
        <button
          className="bg-red-500 p-1 rounded-md text-white"
          onClick={() => {
            inputRef.current.focus()
          }}
        >focus input ref</button>
      </div>

    </div>
  );
}

export default useref;