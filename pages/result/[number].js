import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Result() {
  const router = useRouter();
  const { number } = router.query;
  const [result, setResult] = useState([]);

  useEffect(() => {
    if (number) {
      fetch(`/api/fibonacci?number=${number}`)
        .then((response) => response.json())
        .then((data) => setResult(data.result));
    }
  }, [number]);

  return (
    <div>
      <h1>Fibonacci Sequence</h1>
      <p>{result.join(', ')}</p>
    </div>
  );
}
