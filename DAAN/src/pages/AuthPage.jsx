import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Users, Mail, Lock, Heart } from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4 animate-fade-in">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
            <Link to="/" className="inline-flex items-center space-x-2 mb-4">
              <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-2xl text-gray-800 dark:text-white">FundHope</span>
            </Link>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            {isSignUp ? 'Create an Account' : 'Welcome Back'}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            {isSignUp ? 'Join our community to make a difference.' : 'Sign in to continue your journey.'}
          </p>
        </div>

        <Card className="p-8">
            <div className="flex mb-6 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                <button
                onClick={() => setIsSignUp(false)}
                className={`w-full py-2 rounded-md text-sm font-medium transition-colors ${!isSignUp ? 'bg-white dark:bg-gray-700 text-blue-600 shadow' : 'text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700/50'}`}
                >
                Sign In
                </button>
                <button
                onClick={() => setIsSignUp(true)}
                className={`w-full py-2 rounded-md text-sm font-medium transition-colors ${isSignUp ? 'bg-white dark:bg-gray-700 text-blue-600 shadow' : 'text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700/50'}`}
                >
                Sign Up
                </button>
            </div>

          <form className="space-y-4">
             {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                <div className="relative">
                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                       <Users className="h-5 w-5 text-gray-400" />
                     </div>
                    <input type="text" placeholder="John Doe" className="w-full pl-10 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" />
                </div>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                <div className="relative">
                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                       <Mail className="h-5 w-5 text-gray-400" />
                     </div>
                    <input type="email" placeholder="you@example.com" className="w-full pl-10 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" />
                </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input type={showPassword ? 'text' : 'password'} placeholder="••••••••" className="w-full pl-10 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 pr-10" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500">
                    {showPassword ? <EyeOff className="h-5 w-5"/> : <Eye className="h-5 w-5"/>}
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500"/>
                    <span className="text-gray-600 dark:text-gray-400">Remember me</span>
                </label>
                {!isSignUp && <Link to="#" className="font-medium text-blue-600 hover:underline">Forgot password?</Link>}
            </div>

            <Button type="submit" size="lg" className="w-full">
              {isSignUp ? 'Create Account' : 'Sign In'}
            </Button>
            
             <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400">Or</span>
              </div>
            </div>
            
            <Button type="button" variant="outline" size="lg" className="w-full">
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="h-5 w-5 mr-2"/>
              Sign in with Google
            </Button>

          </form>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
                {isSignUp ? "Already have an account? " : "Don't have an account? "}
                <button onClick={() => setIsSignUp(!isSignUp)} className="font-medium text-blue-600 hover:underline">
                {isSignUp ? 'Sign In' : 'Sign Up'}
                </button>
            </p>
        </Card>
      </div>
    </main>
  );
};

export default AuthPage;
