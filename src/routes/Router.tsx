import HomePageLayout from '@/components/layout/HomePageLayout';
import AddNewBook from '@/pages/Add Book/AddNewBook';
import Dashboard from '@/dashboard/DashBoard';
import About from '@/pages/About/About';
import BookDetails from '@/pages/Book Details/BookDetails';
import Browse from '@/pages/Browse/Browse';
import Contact from '@/pages/Contact/Contact';
import ForgotPassword from '@/pages/Forgot Password/ForgotPassword';
import Home from '@/pages/Home/Home';
import HowItWorks from '@/pages/How It Works/HowItWorks';
import Login from '@/pages/Login/Login';
import Register from '@/pages/Register/Register';

import FavouriteBooks from '@/pages/Wishlist/Wishlist';
import { createBrowserRouter } from 'react-router';
import ErrorPage from '@/pages/ErrorPage/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    Component: HomePageLayout,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: '/book/:id',
        Component: BookDetails,
      },
      {
        path: '/browse',
        Component: Browse,
      },
      {
        path: '/how-it-works',
        Component: HowItWorks,
      },
      {
        path: '/register',
        Component: Register,
      },
      {
        path: '/login',
        Component: Login,
      },
      {
        path: '/forget',
        Component: ForgotPassword,
      },
      {
        path: '/wishlist',
        Component: FavouriteBooks,
      },
      {
        path: '/about',
        Component: About,
      },
      {
        path: '/dashboard',
        Component: Dashboard,
      },
      {
        path: '/add-book',
        Component: AddNewBook,
      },
      {
        path: '/contact',
        Component: Contact,
      },
    ],
  },
]);

export default router;
