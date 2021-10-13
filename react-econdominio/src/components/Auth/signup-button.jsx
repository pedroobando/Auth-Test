// src/components/signup-button.js
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const SignupButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button
      className="border bg-yellow-700 text-back rounded px-4 py-2 font-bold"
      onClick={() =>
        loginWithRedirect({
          screen_hint: 'signup',
        })
      }>
      Sign Up
    </button>
  );
};

export default SignupButton;
