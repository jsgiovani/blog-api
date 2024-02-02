import mongoose from "mongoose";


const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true,
        unique:true
    },

    content:{
        type: String,
        required:true,
    },

    slug:{
        type: String,
        required:true,
        unique:true
    },

    userId:{
        type:String,
        required:true,
    },

    image:{
        type:String,
        required:true,
        default:'https://www.blogtyrant.com/wp-content/uploads/2017/02/how-to-write-a-good-blog-post.png'
    },

    category:{
        type:String,
        default:'uncategorized'
    }

    

}, {
    timestamps:true
});


const Post = mongoose.model('Post', postSchema);

export default Post;