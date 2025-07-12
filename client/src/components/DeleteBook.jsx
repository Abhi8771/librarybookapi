import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const DeleteBook = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.delete(`http://localhost:3001/book/book/${id}`, { withCredentials: true })
      .then(res => {
        if (res.data.deleted) {
          navigate('/books');
        }
      })
      .catch(err => console.log(err));
  }, [id, navigate]);

  return null; 
};

export default DeleteBook;
