import express from 'express';
const bookRouter = express.Router();
bookRouter
    app.get('/', (req, res) => {
        res.json([
                {
                    id: 1,
                    title: "Alices Adventures in Wonderland",
                    author: "Charles Lutwidge Dodgson"
                },
                {
                    id: 2,
                    title: "Einsteins Dreams",
                    author: "Alan Lightman"
                }
            ])
    })
    app.get('/2', (req,res)=>{
        res.json(
                {
                    id: 2,
                    title: "Einsteins Dreams",
                    author: "Alan Lightman"
                }
            )
    })
export default bookRouter;