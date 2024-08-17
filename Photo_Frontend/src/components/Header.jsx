import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/userSlice';
import Modal from '../components/Modal';

const Header = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleUploadClick = () => {
    if (!token) {
      setModalOpen(true);
    } else {
      navigate('/upload');
    }
  };

  return (
    <nav className='navigation'>
      <ul className='nav-left'>
        <li><Link to="/" className='logo'>Photo Manager</Link></li>
      </ul>
      <ul className='nav-right'>
        <li><Link to="/gallery" className='link'>Gallery</Link></li>
        {token ? (
          <li className="logout" onClick={handleLogout}>Logout</li>
        ) : (
          <li><Link to="/login" className="link">Login</Link></li>
        )}
      </ul>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} />
    </nav>
  );
};

export default Header;
