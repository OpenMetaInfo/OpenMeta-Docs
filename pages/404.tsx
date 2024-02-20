import { useRouter } from 'next/router';
import { useEffect } from 'react';

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/');
  }, []);

  return <div>Page not found, redirecting to home ...</div>;
};

export default NotFound;
