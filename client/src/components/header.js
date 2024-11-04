import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { message } from 'antd';

const Header = () => {
  const [loginUser, setLoginUser] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setLoginUser(user);
    }
  }, []);
  
  const logouthandler = () => {
    localStorage.removeItem('user');
    message.success("Logout successful");
    navigate('/login');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-blue"> {/* Change bg-body-tertiary to bg-light */}
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link className="navbar-brand" to="/">Expense-Management</Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <span 
                  className="nav-link"
                  style={{ cursor: 'pointer', padding: '0.5rem 1rem' }} // Adding padding for better aesthetics
                >
                  {loginUser && loginUser.name}
                </span>
              </li>
              <li className='nav-item'>
                <button 
                  className="btn btn-primary"
                  onClick={logouthandler}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
