import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }); 
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId }).sort({ createdAt: -1 }); 
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);  ///--- 

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }
  ///---------
//   In the provided code, the { new: true } option is used in the Post.findByIdAndUpdate method to instruct Mongoose (an Object Data Modeling library for MongoDB) to return the updated post as the response.

// By default, when you use findByIdAndUpdate, Mongoose returns the original document (pre-update) as the result of the operation. However, by specifying { new: true }, you are telling Mongoose to return the updated document instead.

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


export const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    const {comment} = req.body;
    post.comments.push(comment);

    const updatedPost = await post.save();

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
