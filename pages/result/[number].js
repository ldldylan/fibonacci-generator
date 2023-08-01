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

    function goBack() {
        router.push('/')
    };

    return (
        <div>
        <h1>Fibonacci Sequence</h1>
        <h3>The first {number} Fibonacci numbers are:</h3>
        <p>{result.join(', ')}</p>
        <button onClick={goBack}>Go Back</button>
        </div>
    );
}
