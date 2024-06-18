// src/hooks/useSessionData.js



import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const useSessionData = (initialSession) => {
  const [sessions, setSessions] = useState(initialSession);
  const [loading, setLoading] = useState(!initialSession); 

  const router = useRouter();

  useEffect(() => {
    if (!initialSession) {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      const session = await getSession();
      if (!session) {
        router.push('/');
      } else {
        setSessions(session);
      }
    } catch (error) {
      console.error('Failed to fetch session data:', error);
    } finally {
      setLoading(false); // Set loading to false after data is fetched or failed
    }
  };

  return { sessions, loading }; // Return loading state along with sessions
};

export default useSessionData;







// import { getSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import { useState, useEffect } from 'react';

// const useSessionData = () => {
//   // const [sessions, setSessions] = useState(null);
//   const [sessions, setSessions] = useState(null);
//   const [loading, setLoading] = useState(true); // Add loading state

//   const router = useRouter()

// useEffect(() => {
//   fetchData();
// }, []);

// const fetchData = async () => {
//   try {
//     const session = await getSession();
//     if (!session) {
//       router.push('/');
//     } else {
//       setSessions(session);
//     }
//   } catch (error) {
//     console.error('Failed to fetch session data:', error);
//   } finally {
//     setLoading(false); // Set loading to false after data is fetched or failed
//   }
// };

// return { sessions, loading }; // Return loading state along with sessions
// };

// export default useSessionData;







