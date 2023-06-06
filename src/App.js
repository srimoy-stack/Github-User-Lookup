import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from './redux/actions';
import './index.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    if (inputValue) {
      // Checking if user details already exist in the store
      if (user && user.username === inputValue) {
        return;
      }

      dispatch(fetchUser(inputValue));
    }
  }, [dispatch, inputValue, user]);

  return (
    <div className="container">
      <header>
        <h1 className="header-title">Github User Lookup</h1>
      </header>
      <input className="input-field" type="text" placeholder="Enter a GitHub username" value={inputValue} onChange={handleInputChange} />
      {user && (
        <div className="card">
          <img src={`https://www.gravatar.com/avatar/${user.gravatar_id}`} alt="Gravatar" />
          <h2>{user.name}</h2>
          <p>{user.company}</p>
          <p>{user.email}</p>
          <p>{user.bio}</p>
          <p>
            Followers:
            {user.followers}
          </p>
          <p>
            Following:
            {user.following}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
