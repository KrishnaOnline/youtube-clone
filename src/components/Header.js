import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toggleMenu } from '../utils/menuSlice';
import { YOUTUBE_SEARCH_API } from '../utils/constants';

const Header = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => getSearchResults(), 100);

    return () => {
      clearTimeout(timer);
    }
  }, [searchQuery]);
  

  async function getSearchResults() {
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    // console.log(json);
    setResults(json[1]);
  };
  
  const dispatch = useDispatch();
  const handleSideBar = () => {
    dispatch(toggleMenu());
  }

  return (
    <div className='sticky top-0 z-50 bg-white'>
      <div className='grid grid-flow-col p-4 px-6 drop-shadow-lg shadow-lg'>
        <div className='flex gap-5 items-center col-span-3'>
          <img alt="menu" className='h-4 cursor-pointer' src={require('../assets/images/three-horizontal-lines.png')}
            onClick={() => handleSideBar()}
          />
          <a href='/'><img alt='logo' className='h-7 cursor-pointer' src={require('../assets/images/youtube-logo.png')}/></a>
        </div>
        <form className='col-span-8 relative'>
          <input className='w-1/2 p-2 border border-black border-opacity-40 rounded-l-full border-r-0' type='text' placeholder='Search'
            onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery}
          />
          <button className='p-2 border border-black border-opacity-40 bg-gray-100 rounded-r-full px-4'>
            Search
          </button>
          <ul className='absolute bg-white w-1/2 rounded-lg'>
            {
              results.map((s) => (<li key={s} className='shadow-sm p-2'>{s}</li>))
            }
          </ul>
        </form>
        <div className='col-span-1'>
          <img alt='user' className='h-10' src={require('../assets/images/user-icon.png')}/>
        </div>
      </div>
    </div>
  )
}

export default Header;