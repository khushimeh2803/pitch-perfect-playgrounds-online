
import { Link } from 'react-router-dom';
import SignUpForm from '@/components/auth/SignUpForm';
import SocialSignUp from '@/components/auth/SocialSignUp';
import AdminNotice from '@/components/auth/AdminNotice';

const SignUp = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex items-center justify-center">
          <span className="text-pitch-blue font-bold text-2xl">Pitch</span>
          <span className="text-pitch-green font-bold text-2xl">Perfect</span>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link to="/signin" className="font-medium text-pitch-green hover:text-pitch-blue">
            sign in to your existing account
          </Link>
        </p>
      </div>
      
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <AdminNotice />
          <SignUpForm />
          <SocialSignUp />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
