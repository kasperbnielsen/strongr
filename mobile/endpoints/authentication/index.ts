import { API_BASE_URL } from '..';

export async function AuthenticateCredentials(email: string, password: string) {
  return fetch(`${API_BASE_URL}/auth`, {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    }),
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function AuthenticateSession(jwtToken: string) {
  const response = fetch(`${API_BASE_URL}/sesssionauth`, {
    method: 'POST',
    body: JSON.stringify({
      jwtToken,
    }),
  });

  return (await response).json();
}
