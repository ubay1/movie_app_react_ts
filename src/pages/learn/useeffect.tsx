import React, {useEffect, useState} from 'react';

const useeffect = () => {
  // ketika masuk ke file useeffect, maka log mount di jalankan.
  // ketika keluar dari file useeffect, maka log unmount di jalankan.
  useEffect(() => {
    // console.log('mount');
    alert('mount')
    return () => {
      // console.log('unmount');
      alert('unmount')
    }
  }, [])
  
  return(
    <div className="m-3">
      <div className="text-3xl font-bold mb-5">3. useEffect</div>
      <div className="text-xl mb-5">
        useEffect hooks akan menerima dua parameter, yaitu sebuah callback dan sebuah array. <br />
        Array di parameter kedua ini, bisa di isi atau bisa juga dikosongkan. <br />
        useEffect akan di jalankan setiap kali item di dalam array tersebut berubah. <br />
        Kalau arraynya kosong, maka useEffect akan dijalankan sekali saja, yaitu saat komponen pertama kali di render, ini seperti componentDidMount() pada class component.</div>
    </div>
  );
}

export default useeffect;