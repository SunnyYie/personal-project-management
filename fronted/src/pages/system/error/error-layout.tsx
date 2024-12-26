import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

interface ErrorLayoutProps {
    statusCode: number;
    title: string;
    description: string;
}

const ErrorLayout: React.FC<ErrorLayoutProps> = ({ statusCode, title, description }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
                <h1 className="text-6xl font-bold text-gray-800 mb-4">{statusCode}</h1>
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">{title}</h2>
                <p className="text-gray-600 mb-8">{description}</p>
                <Button asChild>
                    <Link to='/'>
                        返回首页
                    </Link>
                </Button>
            </div>
        </div>
    );
};

export default ErrorLayout;

