import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
    const [number, setNumber] = useState('');
    const router = useRouter();

    const handleSubmit = (event) => {
        event.preventDefault();
        router.push(`/result/${number}`);
    };

    return (
        <div>
        <h1>Fibonacci Generator</h1>
        <h3>Enter a positive integer to generate the first nth Fibonacci numbers:</h3>
        <form onSubmit={handleSubmit}>
            <input
            type="number"
            min="1"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
            />
            <button type="submit">Generate</button>
        </form>
        </div>
    );
}
