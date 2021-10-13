/* eslint-disable no-undef */
import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const authenticateRetToken = async (email, password) => {
  console.log(process.env.REACT_APP_API_URL);
  return await fetch(`${process.env.REACT_APP_API_URL}/graphql`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        mutation authenticateRetToken($input:AuthenticateInput!){
          authenticateRetToken(input:$input){
            token
          }
        }
      `,
      variables: {
        'input': {
          email,
          password,
        },
      },
    }),
  });
};

const protectedToken = async (token) => {
  console.log(token);
  return await fetch(`${process.env.REACT_APP_API_URL}/graphql`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      query: `
        query getCondominios{
          getCondominios{
            id
            name
            contactName
            email
          }
        }
      `,
      variables: {},
    }),
  });
};

const ExternalApi = () => {
  const [message, setMessage] = useState('');
  // const serverUrl = process.env.REACT_APP_SERVER_URL;
  // console.log(serverUrl);

  const { getAccessTokenSilently } = useAuth0();

  const callApi = async () => {
    const tokeniNT = await getAccessTokenSilently();
    try {
      const { data, errors } = await (
        await authenticateRetToken('usuario01@gmail.com', '123456')
      ).json();
      const { token } = data.authenticateRetToken;

      setMessage(tokeniNT);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const callSecureApi = async () => {
    const token = await getAccessTokenSilently();
    console.log(token);
    try {
      const { data, errors } = await (await protectedToken(token)).json();

      const { getCondominios } = data.authenticateRetToken;

      setMessage(getCondominios);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="container">
      <h1>External API</h1>
      <p>
        Use these buttons to call an external API. The protected API call has an access token
        in its authorization header. The API server will validate the access token using the
        Auth0 Audience value.
      </p>
      <div className="btn-group mt-5" role="group" aria-label="External API Requests Examples">
        <button type="button" className="btn btn-primary" onClick={callApi}>
          Get Public Message
        </button>
        <button type="button" className="btn btn-primary" onClick={callSecureApi}>
          Get Protected Message
        </button>
      </div>
      {message && (
        <div className="mt-5">
          <h6 className="muted">Result</h6>
          <div className="container-fluid">
            <div className="row">
              <code className="col-12 text-light bg-dark p-4">{message}</code>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExternalApi;
