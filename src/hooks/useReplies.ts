import { getCommentReplies } from '@/lib/actions/comment.actions';
import { getErrorMessage } from '@/lib/utils';
import { useEffect, useState } from 'react';

export default function useReplies<T>(callback: () => Promise<T>) {
  const [error, setError] = useState<Error | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | undefined>(undefined);

  useEffect(() => {
    async function getReplies() {
      setError(undefined);
      setLoading(false);
      setData(undefined)
      try {
        setLoading(true);

        const result = await callback();

        console.log('result = ', result)
        setData(result);
        setLoading(false);
      } catch (error) {
        const message = getErrorMessage(error);
        setError(new Error(message));
      }
    }
    getReplies();
  }, []);

  return {
    error,
    loading,
    data,
  };
}
