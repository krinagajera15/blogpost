import { useContext, useEffect, useState } from "react";
import "./Createpostform.css";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';
import Loder from "./Loder";
import Modecontext from "../Context/ModeContext";

const Postform = () => {

  const ctx=useContext(Modecontext);
  console.log(ctx,"Create Post Context Value");
  const naviget=useNavigate();
  const [createPostForm, setCreatePostForm] = useState({
    title: "",
    body: "",
    image: "",
  });//1 usestate no use karo che jenath badha mate alag alag banava napade
  const [errors, setError] = useState({});//error no usestate
  const [loading, setLoading] = useState(false);

  const location=useLocation();
  console.log(location,":location values");
  const editPostID=location.state?.id||null;
  console.log(editPostID);


  


  const handelChange = (feild, value) => {//feild = je feilad nu name aapu hoy te
    setError((e) => ({ ...e, [feild]: "" })); //error msge ne remove karva ate,'...e'=spread opretor
    setCreatePostForm({ ...createPostForm, [feild]: value }); //usestate ma valu store karva mate
    console.log(createPostForm);

  };
//   useEffect(() => {
//     const timer = setTimeout(() => {
//         setLoading(false);
//     }, 3000);

//     return () => clearTimeout(timer);
// }, []);

  console.log("edit postid:",editPostID);

  useEffect(()=>{
    if(!editPostID)return;//jo id na male to return kare

    const posts=JSON.parse(localStorage.getItem("postdata"))||[]
    const postToEdit=posts.find((p)=>p.id===editPostID);
    console.log(postToEdit);

    if(postToEdit){
      setCreatePostForm({//post ma data ne re-store thay
        title: postToEdit.title,
        body: postToEdit.body,
        image: postToEdit.image,
      });
    }
    
  },[editPostID])
  

  const handleCancel=()=>{
    // {editPostID?naviget("/"):}
    naviget("/");
  }

  const handelImageChange = (file) => {
    console.log(file, "File");
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      setError((e) => ({
        ...e,
        image: "only jpeg,jpg and png image are allowed",
      }));
      return;
    }
    console.log("function call");

    const reader = new FileReader();
    reader.onloadend = () => {
      console.log(reader.result, "file");

      setCreatePostForm({ ...createPostForm, image: reader.result });
      setError((e) => ({ ...e, image: "" }));
    };
    reader.readAsDataURL(file);
  };
  console.log(createPostForm, "form");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const newError = {};
    if (!createPostForm.title.trim()) newError.title = "Tital Requird.....";
    if (!createPostForm.body.trim()) newError.body = "Body Requird.....";
    if (!createPostForm.image.trim()) newError.image = "Image Not Uloded....";

    setError(newError);
    if (Object.keys(newError).length > 0){ setLoading(false); return;}

    const existingPosts=JSON.parse(localStorage.getItem("postdata"))||[];

    const updatedPost = [...existingPosts,{id:uuidv4(),... createPostForm},];

    if(editPostID){
      console.log("createpostformdata:",createPostForm);
      const updatedPost=existingPosts.map((p)=>p.id===editPostID?{...p,...createPostForm}:p);
      localStorage.setItem("postdata",JSON.stringify(updatedPost))
    toast.success("Your Post Updeted Successfully");
    setTimeout(()=>{
      setLoading(false);
      naviget("/");
    },3000);
    return;
    }

    localStorage.setItem("postdata",JSON.stringify(updatedPost))
    toast.success("Your Post Add Successfully");
    setTimeout(()=>{
      setLoading(false);
      naviget("/");
    },3000);
    

    console.log("Success",updatedPost);
    
  };

  return (
    <>
    <div className={`main-create-class ${ctx.mode}`}>
    {loading&&<Loder/>}
    <ToastContainer/>
      <form className="form-class" onSubmit={handleSubmit}>
        <h1 className="heder-class">{editPostID?"Let's Edit This Post":"Let's Create New Post"}</h1>
        

        <div className="main-class">
          <div className="fild-class">
            <input
              type="text"
              name="title"
              value={createPostForm.title}
              placeholder="Enter Tital"
              onChange={(e) => handelChange("title", e.target.value)}
            />
            {errors.title && <p className="error-class">{errors.title}</p>}
          </div>
          <div className="fild-class">
            <textarea
              name="body"
              value={createPostForm.body}
              placeholder="Enter Body"
              onChange={(e) => handelChange("body", e.target.value)}
            />
            {errors.body && <p className="error-class">{errors.body}</p>}
          </div>
          <div className="filde-class">
            <input
              type="file"
              name="image"
              placeholder="Enter image"
              onChange={(e) => handelImageChange( e.target.files[0])}
            />
            {errors.image && <p className="error-class">{errors.image}</p>}
          </div>
          {createPostForm.image && (
            <img
              src={createPostForm.image}
              alt="preview"
              style={{ width: 200, borderRadius: 15 }}
            />
          )}
          <div className={`btn-post-btn-class ${ctx.mode}`}>
          <button className="btnpost">{editPostID?"Update Post":"Add Post"}</button>
          {editPostID && <button type="button" className="btnpost" onClick={handleCancel}>Cancel Post</button>}
          </div>
        </div>
        
      </form>
      </div>
    </>
  );
};
export default Postform;
