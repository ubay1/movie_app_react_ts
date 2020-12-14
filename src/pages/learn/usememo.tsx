import React, { useMemo, useState } from 'react';

const usememo = () => {

  const [number, setnumber] = useState(0)
  const [count, setcount] = useState(0)

  const incrementNumber = () => {
    console.log(number)
    setnumber(number + 1)
  }
  const incrementCount = () => {
    console.log(count)
    setcount(count + 1)
  }

  const isNumberEven = useMemo(() => {
    let i = 0;
    while (i < 2000000000) {
      i++
    }
    return number % 2 === 0
  }, [number])

  const isCountEven = useMemo(() => {
    let i = 0;
    while (i < 2000000000) {
      i++
    }
    return count % 2 === 0
  }, [count])

  return (
    <div className="m-3">
      <div className="text-3xl font-bold mb-5">3. usememo</div>
      <div className=" mb-5">
        React hooks useMemo digunakan untuk mengoptimalkan performance sebuah function.
        O iya, useMemo hooks berbeda dengan React.memo yang kita singgung di materi sebelumnya tentang useCallback.
        useMemo di gunakan untuk memoize hasil sebuah function, sedangkan React.memo digunakan untuk mencegah render sebuah component ketika state atau propsnya tidak berubah. <br/><br/>

        Memoize adalah sebuah teknik yang digunakan mengoptimalkan sebuah program.
        Caranya adalah dengan menyimpan hasil dari program tersebut, istilah kerennya caching.
        Jadi, ketika program tersebut dipanggil kembali dengan input yang sama, maka tidak perlu lagi melakukan kalkulasi ulang.
        Jadi prosesnya akan jadi lebih cepat.
      </div>
         
        <button 
          className="bg-red-500 p-1 text-white rounded-md shadow-md" 
          onClick={incrementNumber}
        >
          add number
        </button>
        <div>
          {isNumberEven ? "even" : "odd"}
        </div>
      <button
        className="bg-red-500 p-1 text-white rounded-md shadow-md"
        onClick={incrementCount}
      >
        add count
      </button>
      <div>
        {isCountEven ? "even" : "odd"}
      </div>
    </div>
    
  );
}

export default usememo;