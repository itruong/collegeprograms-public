import config from 'config/config';


const createUser = async (args) => {
  const data = {};
  for (const [key, value] of Object.entries(args)) {
    if (value) {
      data[key] = value;
    }
  }
  return await fetch(
    `${config.SERVER_BASE_URL}/users`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    }
  );
}

const getCurrentUser = async () => {
  return await fetch(`${config.SERVER_BASE_URL}/users/token?type=student`);
}

const updateUser = async (args) => {
  const data = {};
  for (const [key, value] of Object.entries(args)) {
    if (value) {
      data[key] = value;
    }
  }

  return await fetch(
    `${config.SERVER_BASE_URL}/users/token`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    }
  );
};

export default {
  createUser,
  getCurrentUser,
  updateUser
};
