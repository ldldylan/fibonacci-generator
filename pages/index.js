import { useState } from 'react';
import { useRouter } from 'next/router';
import './index.css'

export default function Home() {
    const [number, setNumber] = useState('');
    const router = useRouter();

    const handleSubmit = (event) => {
        event.preventDefault();
        router.push(`/result/${number}`);
    };

    return (
        <div className='index'>
        <h1>Fibonacci Series Generator</h1>
        <p>Fibonacci sequence is a sequence in which each number is the sum of the two preceding ones. </p>
        <p>The first few values in the sequence are: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144.</p>
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
