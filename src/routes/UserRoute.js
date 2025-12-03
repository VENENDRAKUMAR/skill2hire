import {Router} from 'express';




//  create a router instance
const router = Router();
//  define a simple route
router.get('/', (req, res) => {
    res.send('User Route is working!');
});
//  export the router
export default router;