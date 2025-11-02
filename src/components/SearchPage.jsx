import React from 'react'

const SearchPage = () => {
  return (
    <div className='h-screen w-full'>
      <label className='border-[1px] border-[#c1c1c1] px-2 rounded-full flex justify-center items-center' htmlFor="#">
                <input className='w-60 rounded-full pl-2' type="text" placeholder='Search'/>
                <a className='' href="#"><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="24px" fill="#fff"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg></a>
     </label>
    </div>
  )
}

export default SearchPage
