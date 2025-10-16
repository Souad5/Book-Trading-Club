import ForgotPassword from '@/Component/ForgotPassword';
import Login from '@/Component/Login';
import HomePageLayout from '@/components/layout/HomePageLayout';
import AddNewBook from '@/components/Section/AddNewBook';
import Dashboard from '@/dashboard/DashBoard';
import About from '@/pages/About/About';
import BookDetails from '@/pages/Book Details/BookDetails';
import Browse from '@/pages/Browse/Browse';
import Contact from '@/pages/Contact/Contact';
import Home from '@/pages/Home/Home';
import HowItWorks from '@/pages/How It Works/HowItWorks';
import Register from '@/pages/Register/Register';

import FavouriteBooks from '@/pages/Wishlist/Wishlist';
import { createBrowserRouter } from 'react-router';

const router = createBrowserRouter([
  {
    path: '/',
    Component: HomePageLayout,
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
