import React, { useState } from 'react'
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Articles from './Articles'
import LoginForm from './LoginForm'
import Message from './Message'
import ArticleForm from './ArticleForm'
import Spinner from './Spinner'
import PrivateRoutes from './PrivateRoutes';
import {axiosWithAuth} from '../axios/index';

const articlesUrl = 'http://localhost:9000/api/articles'
const loginUrl = 'http://localhost:9000/api/login'

export default function App() {
  // ✨ MVP can be achieved with these states
  const [message, setMessage] = useState('')
  const [articles, setArticles] = useState([])
  const [currentArticleId, setCurrentArticleId] = useState(null)
  const [spinnerOn, setSpinnerOn] = useState(false)

  // ✨ Research `useNavigate` in React Router v.6
  const navigate = useNavigate();
  const redirectToLogin = () => { /* ✨ implement */ }
  const redirectToArticles = () => { /* ✨ implement */ }

  const logout = () => {
    // ✨ implement
    // If a token is in local storage it should be removed,
    // and a message saying "Goodbye!" should be set in its proper state.
    // In any case, we should redirect the browser back to the login screen,
    // using the helper above.
  }

  const login = (values) => {
    setMessage('');
    setSpinnerOn(true);
    axios.post(loginUrl, values)
      .then(res => {
        localStorage.setItem('token', res.data.token);
        setMessage(res.data.message);
        navigate('/articles');
        getArticles();
      })
      .catch(err => {
        setMessage('');
        setSpinnerOn(false);
        console.log(err);
      });
  }

  const getArticles = () => {
    setMessage('');
    setSpinnerOn(true);
    axiosWithAuth()
      .get(articlesUrl)
        .then(res => {
          console.log(res);
          setMessage(res.data.message);
          setArticles(res.data.articles);
          setSpinnerOn(false);
        })
        .catch(err => {
          setMessage('');
          if(err.response.status === 401) navigate('/');
          setSpinnerOn(false);
          console.log(err);
        });
    // ✨ implement
    // We should flush the message state, turn on the spinner
    // and launch an authenticated request to the proper endpoint.
    // On success, we should set the articles in their proper state and
    // put the server success message in its proper state.
    // If something goes wrong, check the status of the response:
    // if it's a 401 the token might have gone bad, and we should redirect to login.
    // Don't forget to turn off the spinner!
  }

  const postArticle = article => {
    console.log(article);
    setMessage('');
    setSpinnerOn(true);
    axiosWithAuth()
      .post(articlesUrl, article)
        .then(res => {
          console.log(res);
          setMessage(res.data.message);
          setArticles([...articles, res.data.article]);
          setSpinnerOn(false);
        })
        .catch(err => {
          setMessage('');
          if(err.response.status === 401) navigate('/');
          setSpinnerOn(false);
          console.log(err);
        });
    // ✨ implement
    // The flow is very similar to the `getArticles` function.
    // You'll know what to do! Use log statements or breakpoints
    // to inspect the response from the server.
  }

  const updateArticle = ({ article_id, article }) => {
    // ✨ implement
    // You got this!
  }

  const deleteArticle = article_id => {
    // ✨ implement
  }

  return (
    // ✨ fix the JSX: `Spinner`, `Message`, `LoginForm`, `ArticleForm` and `Articles` expect props ❗
    <>
      <Spinner on={spinnerOn} />
      <Message message={message} />
      <button id="logout" onClick={logout}>Logout from app</button>
      <div id="wrapper" style={{ opacity: spinnerOn ? "0.25" : "1" }}> {/* <-- do not change this line */}
        <h1>Advanced Web Applications</h1>
        <nav>
          <NavLink id="loginScreen" to="/">Login</NavLink>
          <NavLink id="articlesScreen" to="/articles">Articles</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<LoginForm login={login} />} />
          <Route element={<PrivateRoutes />}>
            <Route path="articles" element={
              <>
                <ArticleForm currentArticleId={currentArticleId} articles={articles} postArticle={postArticle} updateArticle={updateArticle} />
                <Articles articles={articles} currentArticleId={currentArticleId} getArticles={getArticles} setCurrentArticleId={setCurrentArticleId} />
              </>
            } />
          </Route>
        </Routes>
        <footer>Bloom Institute of Technology 2022</footer>
      </div>
    </>
  )
}
