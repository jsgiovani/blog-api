import Post from "../models/Post.js";
import { error } from "../utils/errorHandler.js";

//create a new post
const store = async ( req, res, next) => {

    if (!req.user.isAdmin) {
        return next(error(401, 'Unauthorized, You are not allowed to create a post'));
    }

   const {title, content} = req.body;

   if (!title || !content) {
    return next(error(401, 'Please provide all required fields'));
   }


   try {


    const slug = req.body.title.trim().split(' ').join('-').toLowerCase().replace(/[^a-zA-A0-9-]/g,'');
    
    const postObj = {
    ...req.body,
    slug,
    userId:req.user.id
    };
    
    const newPost = new Post(postObj);

    const request = await newPost.save();




    res.json({
    success:true,
    data:request,
    status:201
    });
    
   } catch (error) {
    next(error);
   }



    
};


export { store };