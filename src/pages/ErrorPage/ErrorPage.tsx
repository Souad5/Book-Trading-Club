import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import ErrorImg from '../../assests/photo/404 image.jpg';
const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between items-center gap-20 w-full">
      <div className="bg-white w-full">
        <Navbar></Navbar>
      </div>
      <img className="h-1/4 w-1/2 mx-auto" src={ErrorImg} alt="" />
      <h1 className="text-4xl  font-extrabold font-mono underline">
        Coming Soon....
      </h1>
      <div className='w-full bg-white'>
        <Footer />
      </div>
    </div>
  );
};

export default ErrorPage;
