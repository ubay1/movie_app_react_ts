import React, { useEffect, useState, memo } from 'react';

// child komponen
const Show = memo((props: any) => {
  console.log(`${props.label} = ${props.val}`)
  return (
    <div>{props.label} {props.val}</div>
  );
});

// child komponen
const Button = memo((props: any) => {
  console.log(`${props.label} show`)
  return (
    <div>
      <button className="bg-red-500 p-1 text-white rounded-md shadow-md" onClick={props.action}>add {props.label}</button>
    </div>
  );
});

const usecallback = () => {
  const [number, setnumber] = useState(0)
  const [count, setcount] = useState(0)

  const incrementNumber = React.useCallback(() => {
    setnumber(number+1)
  }, [number])

  const incrementCount = React.useCallback(() => {
    setcount(count + 1)
  }, [count])

  return (
    <div className="m-3">
      <div className="text-3xl font-bold mb-5">5. React.memo & useCallback</div>
      <b>useCallback</b> hooks digunakan untuk mencegah render child komponen yang tidak di perlukan. <br/>
      <b>React.memo</b> fungsinya adalah merender component jika ada perubahan pada state atau props.
      <br/><br/>

      contohnya berikut ini : <br/>
      Dengan menambahkan <b>useCallback</b>, saat ada update untuk state number / props number maka komponen button / komponen show untuk countnya tidak akan di render. Begitu juga sebaliknya.
      <br/><br/>

      <Show label="number" val={number}/>
      <Button label="btn_number" action={incrementNumber} />
      <Show label="count" val={count} />
      <Button label="btn_count" action={incrementCount} />
    </div>
  );
}

export default usecallback;