import React from 'react';

function LoginButton({type}) {
    return (
        <button type={type} className="flex justify-center cursor-pointer items-center rounded-[60px] w-96 h-14 bg-DarkBlue text-white font-bold text-lg border-DarkBlue border-[3px] ">
            Login
        </button>
    );
}

export default LoginButton;