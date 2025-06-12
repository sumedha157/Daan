import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Button from '../components/common/Button';

const NotFoundPage = () => {
    return (
         <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4 text-center">
            <div>
                 <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
                 <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-2">Page Not Found</h2>
                 <p className="text-gray-500 dark:text-gray-400 mb-8">Sorry, the page you are looking for does not exist.</p>
                 <Button as={Link} to="/" size="lg">
                    <ArrowRight className="mr-2 h-5 w-5 transform -rotate-180"/>
                    Go back home
                 </Button>
            </div>
         </main>
    );
}

export default NotFoundPage;
