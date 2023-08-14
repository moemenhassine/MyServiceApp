import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import PostServices from "../../services/PostsService";

const initialState = {
  isDeleted: "",
  isUpdated: "",
  postGetted: {},
  Post: {},
  PostUpdated: {},
  Posts: [],
  PostsByUser: [],
  status: "",
};

export const addPost = createAsyncThunk("posts/add", async (values) => {
  console.log("before service addpost", values);
  try {
    const res = await PostServices.addPost(
      values.title,
      values.description,
      values.userEmail
    );

    return {
      Post: res.data.Post,
    };
  } catch (error) {
    console.error(error.response.data);
    return rejectWithValues(error.response.data);
  }
});

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const res = await PostServices.fetchPosts();
    return res.data;
  } catch (error) {
    console.error(error.response.data);
    return rejectWithValues(error.response.data);
  }
});
export const getPostByUser = createAsyncThunk(
  "posts/getPostByUser",
  async (userid) => {
    try {
      const res = await PostServices.getPostByUser(userid);

      return res.data;
    } catch (error) {
      console.error(error.response.data);
      return rejectWithValues(error.response.data);
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async ({id,userEmail}) => {
    console.log('email user delete',userEmail);
    try{
      const res = await PostServices.deletePost(id,userEmail)
      return res.data ;

    }catch(error){
      console.error(error.response.data);
    }
  }
)
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({idPost,userEmail,title,desc,photo}) => {
    // console.log('email user update',userEmail);
    // console.log('id post update',idPost);

    try{
      const res = await PostServices.updatePost(idPost,userEmail,title,desc,photo)
      console.log(res.data);
      return {
        PostUpdated: res.data,
      };

    }catch(error){
      console.error(error.response.data);
    }
  }
)

export const getPost = createAsyncThunk(
  "posts/getPost",
  async (id) => {
    
    try{
      const res = await PostServices.getPost(id)
      return res.data;

    }catch(error){
      console.error(error.response.data);
    }
  }
)

const PostSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addPost.fulfilled, (state, action) => {
        state.Post = action.payload;
      })
      .addCase(addPost.rejected, (state, action) => {
        state.Post = {};
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "success";
        state.Posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getPostByUser.fulfilled, (state, action) => {
        state.status = "success";
        state.PostsByUser = action.payload;
      })
      .addCase(getPostByUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = "success";
        state.isDeleted=true;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.isDeleted=false;

      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.PostUpdated=action.payload
        state.status = "success";
        state.isUpdated=true;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.isUpdated=false;

      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.postGetted=action.payload
        state.status = "success";
        state.isUpdated=true;
      })
      .addCase(getPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        

      })
      
  },
});

export default PostSlice.reducer;
