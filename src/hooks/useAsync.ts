import { useState, useCallback, useEffect } from 'react';

// export default function useAsync<T>(
//   callback: () => Promise<T>,
//   dependencies: any[] = []
// ) {
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<Error | null>(null);
//   const [value, setValue] = useState<T | null>(null);

//   const callbackMemoized = useCallback(() => {
//     setLoading(true);
//     setError(null);
//     setValue(null);

//     callback()
//       .then(setValue)
//       .catch(setError)
//       .finally(() => setLoading(false));
//   }, [callback, ...dependencies]);

//   useEffect(() => {
//     callbackMemoized();
//   }, [callbackMemoized]);

//   return { loading, error, value };
// }
