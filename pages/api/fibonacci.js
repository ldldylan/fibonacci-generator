const pgPromise = require('pg-promise');
const pgp = pgPromise({});
const db = pgp('postgres://dilang:123456@localhost:5432/dilang');

export default async function handler(req, res) {
    const { number } = req.query;

    if (!number) {
        return res.status(400).json({ error: 'Number is required' });
    }

    const sequence = [];
    let a = 0, b = 1;

    for (let i = 1; i <= number; i++) {
        const rows = await db.any('SELECT * FROM fibonacci WHERE id=$1', [i]);

        if (rows.length > 0) {
            sequence.push(rows[0].number);
            if (i === 1) {
                a = rows[0].number;
            } else if (i === 2) {
                b = rows[0].number;
            } else {
                a = b;
                b = rows[0].number;
            }
        } else {
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
            // console.log([i, c])
            await db.none('INSERT INTO fibonacci (id, number) VALUES ($1, $2)', [i, c]);
        }
    }

    res.status(200).json({ result: sequence });
}