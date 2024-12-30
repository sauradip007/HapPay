import React from 'react'

function Balance({balance}) {
  return (
    <div className="shadow h-14 flex justify-between">
      <div className="flex flex-col justify-center h-full ml-4 text-black-500 text-base font-bold">
        Your balance is {balance}
      </div>
    </div>
  );
}

export default Balance