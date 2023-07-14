import { API_URL } from "./config"

const registerRequest = (data) => {
  return fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('Registration failed')
      }
    })
}

export default registerRequest;