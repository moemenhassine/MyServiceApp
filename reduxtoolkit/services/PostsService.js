import axios from "axios";
import { url } from "./Urls";

const addPost = async (title, desc, email) => {
  const newPost = {
    title,
    desc,
    email,
  };

  try {
    const response = await axios.post(`${url}/api/posts/add`, newPost);
    console.log("Post ajouté avec succès", response.data);
    return response.data;
    // Effectuez les actions nécessaires après l'ajout du post
  } catch (error) {
    console.error("Erreur lors de l'ajout du post", error);
    // Gérez les erreurs d'ajout du post
  }
};

const fetchPosts = async () => {
  try {
    const response = await axios.get(`${url}/api/posts/`);
    return response; // Assuming the response data is an array of posts
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

const getPostByUser = async (userid) => {
  try {
    const response = await axios.get(`${url}/api/posts/user/${userid}`);
    return response; // Assuming the response data is an array of posts
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

const deletePost = async (id, userEmail) => {
  try {
    const response = await axios.delete(`${url}/api/posts/${id}/${userEmail}`);
    return response;
  } catch (error) {
    console.error("Error delete post:", error);
  }
};
const updatePost = async (id, email, title, desc, photo) => {
  try {
    const response = await axios.put(`${url}/api/posts/${id}/${email}`, {
      title: title,
      desc: desc,
      photo: photo,
    });
    return response;
  } catch (error) {
    console.error("Error update post:", error);
  }
};

const getPost = async (id) => {
  try {
    const response = await axios.get(`${url}/api/posts/${id}`);
    console.log("get data ", response);
    return response;
  } catch (error) {
    console.error("Error get post:", error);
  }
};

const PostServices = {
  addPost,
  fetchPosts,
  getPostByUser,
  deletePost,
  updatePost,
  getPost,
};

export default PostServices;
