import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home'
import PostDetail from './pages/PostDetail'
import Register from './pages/Register'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword';
import UserProfile from './pages/UserProfile'
import Authors from './pages/Authors'
import CreatePost from './pages/CreatePost'
import CategoryPosts from './pages/CategoryPosts'
import AuthorPosts from './pages/AuthorPosts'
import Dashboard from './pages/Dashboard'
import EditPost from './pages/EditPost'
import DeletePost from './pages/DeletePost'
import Logout from './pages/Logout'
import UserProvider from './context/userContext'
import ResetPassword from './pages/ResetPassword';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import Favourites from './pages/Favourites';

const router = createBrowserRouter([
  {
    path: '/',
    element: <UserProvider><Layout /></UserProvider>,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: 'posts/:id', element: <PostDetail /> },
      { path: 'register', element: <Register /> },
      { path: 'login', element: <Login /> },
      { path: 'forgot-password', element: <ForgotPassword /> },
      { path: 'reset-password', element: <ResetPassword /> },
      { path: 'profile/:id', element: <UserProfile /> },
      { path: 'authors', element: <Authors /> },
      { path: 'create', element: <CreatePost /> },
      { path: 'posts/categories/:category', element: <CategoryPosts /> },
      { path: 'posts/users/:id', element: <AuthorPosts /> },
      { path: 'myposts/:id', element: <Dashboard /> },
      { path: 'posts/:id/edit', element: <EditPost /> },
      { path: 'posts/:id/delete', element: <DeletePost /> },
      { path: 'contact', element: <ContactUs /> },
      { path: 'about', element: <AboutUs /> },
      { path: 'favourites', element: <Favourites /> },
      { path: 'logout', element: <Logout /> },
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
