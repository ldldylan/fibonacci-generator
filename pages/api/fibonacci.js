const pgPromise = require('pg-promise');
const pgp = pgPromise({});
const db = pgp('postgres://dilang:123456@localhost:5432/fibonacci_db');

export default async function handler(req, res) {
    const { number } = req.query;

    if (!number) {
        return res.status(400).json({ error: 'Number is required' });
    }

    const sequence = [];
    let a = 0, b = 1;

    // Compute the Fibonacci sequence first
    for (let i = 1; i <= number; i++) {
        let c;
        if (i === 1) {
            c = 0;
            a = 0;
        } else if (i === 2) {
            c = 1;
            b = 1;
        } else {
            c = +a + +b;
            a = b;
            b = c;
        }
        sequence.push(c);
    }

    // Then update the database in one go
    await db.tx(async t => {
        for (let i = 1; i <= sequence.length; i++) {
            await t.none('INSERT INTO fibonacci (id, number) VALUES ($1, $2) ON CONFLICT (id) DO UPDATE SET number = $2', [i, sequence[i-1]]);
        }
    });

    res.status(200).json({ result: sequence });
}
