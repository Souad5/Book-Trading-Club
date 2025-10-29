import HomePageLayout from '@/components/layout/HomePageLayout';
import AddNewBook from '@/pages/Add Book/AddNewBook';
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
import AroundMe from '@/pages/Map/AroundMe';
import { createBrowserRouter } from 'react-router';
import ErrorPage from '@/pages/ErrorPage/ErrorPage';
import DashboardLayout from '@/components/layout/DashboardLayout';

import Users from '@/pages/Dashboards/Admin/Users';
import UserProfile from '@/pages/Dashboards/Shared/UserProfile';
import DashboardHomePage from '@/pages/Dashboards/User/DashboardHomePage';
import MyBooks from '@/pages/Dashboards/User/MyBooks';
import MyCart from '@/pages/Dashboards/Shared/MyCart';
import MyOrders from '@/pages/Dashboards/Shared/MyOrders';

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
        // element: <h1>Favoourite</h1>,
      },
      {
        path: '/about',
        Component: About,
      },
      {
        path: '/add-book',
        Component: AddNewBook,
      },
      {
        path: '/contact',
        Component: Contact,
      },
      {
        path: '/around-me',
        Component: AroundMe,
      },
    ],
  },
  {
    path: '/dashboard',
    Component: () => <DashboardLayout />,
    children: [
      {
        index: true,
        Component: DashboardHomePage,
      },
      {
        path: 'users',
        Component: Users,
      },
      {
        path: 'myprofile',
        Component: UserProfile,
      },
      {
        path: 'mybooks',
        Component: MyBooks,
      },
      {
        path: 'my-cart',
        Component: MyCart,
      },
      {
        path: 'my-orders',
        Component: MyOrders,
      },
    ],
  },
]);

export default router;
