import express from "express";

const app = express();

app.get('/hi', (req, res) => {
    res.send('Hello World!')
});

app.listen(3000, () => {
    console.log('Server is working')
});

export default app