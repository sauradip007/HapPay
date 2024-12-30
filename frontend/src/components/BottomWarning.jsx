import React from 'react'
import { useNavigate } from 'react-router';

function BottomWarning({label, link, route}) {

    const navigate = useNavigate()

    function handleClick(e){
        e.preventDefault()
        navigate(`/${route}`)
    }
  return (
    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
      {label}
      <a
        href="#"
        className="font-medium ml-1.5 text-primary-600 hover:underline dark:text-primary-500"
        onClick={handleClick}
      >
        {link}
      </a>
    </p>
  );
}

export default BottomWarning