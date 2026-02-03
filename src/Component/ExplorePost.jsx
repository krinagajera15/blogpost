import { FiSearch } from 'react-icons/fi';
import './ExplorePost.css';
import { useContext, useEffect, useState } from 'react';
import Card from './Card';
import { PageNation } from './PageiNation';
import { ConformModel } from './ConfirmationModal';
import Loder from './Loder';
import Modecontext from '../Context/ModeContext';

export const ExplorePost=()=>{

    const ctx=useContext(Modecontext);
    console.log(ctx,"Explore Post Context Value");

    const[posts,setPosts]=useState([]);
    const[loding,setLoding]=useState(true);
    const[search,setSearch]=useState("");
    const[filteredPost,setFilteredPost]=useState([]);
    const[postId,setPostId]=useState();
    const[currentPage,setCurrentPage]=useState(1);
    const [postPerPage, setPostPerPage] = useState(10);
    // const postPerPage=6;

    const [explorePostForm, setExplorePostForm] = useState({
        title: "",
        body: "",
        image: "",
    });
    const [errors, setError] = useState({});

    const [showForm,setShowForm]=useState(false);

    const [showModal, setShowModal] = useState(false);

    const handleShowModel=(index)=>{
        setPostId(index);
        setShowModal(true);
    }

    const[loading,setLoading]=useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);
    
        return () => clearTimeout(timer);
    }, []);
    const deletePostById=async()=>{
        try{
            
            const reasponse=await fetch(`https://696b4ad2624d7ddccaa0b91e.mockapi.io/createPost/${postId}`,{
                method:"DELETE"
            }
        );
        if(!reasponse.ok)
        {
            alert("something went wrong!!!");
        } 
        await reasponse.json();
        alert("Post Delete Successfully");
        setPostId(null);
        setShowModal(false);
        fetchData();
        }catch( error){
            console.error("Delete Api Error",error.message);
        
        }finally{
            //
        }
    }
             
    

    const handleClose=()=>{
        setShowForm(false);
    }
    const handleShow=()=>{
        setShowForm(true);
    }

    const postDataGetById=async(id)=>{

        try{
            setPostId(id);
            const reasponse=await fetch(`https://696b4ad2624d7ddccaa0b91e.mockapi.io/createPost/${id}`,{
                method:"GET"
            })
            console.log({reasponse});
            if(!reasponse.ok)
            {
                throw new Error("something went wrong!!!");
            }
            const data=await reasponse.json();
            setExplorePostForm({
                title:data.title||"",
                body:data.body||"",
                image:data.image||"",

            });
            setShowForm(true);
        }catch(error){

            console.error("Get By Id Api Error:",error.message);
            
        }finally{

        }

    }

    const handelChange = (feild, value) => {//feild = je feilad nu name aapu hoy te
        setError((e) => ({ ...e, [feild]: "" })); //error msge ne remove karva ate,'...e'=spread opretor
        setExplorePostForm({ ...explorePostForm, [feild]: value }); //usestate ma valu store karva mate
        console.log(explorePostForm);

    }


    const fetchData= async()=>{

        // const reasponse=await fetch("https://jsonplaceholder.typicode.com/posts",{
        const reasponse=await fetch("https://696b4ad2624d7ddccaa0b91e.mockapi.io/createPost",{
            method:"GET"
        })
        console.log({reasponse});
        if(!reasponse.ok)
        {
            alert("something went wrong!!!");
            return
        }
        const data=await reasponse.json();
        const reversData=[...data].reverse();
        console.log(data);
        setPosts(reversData);   
        setLoding(false);
        setFilteredPost(reversData);
    }

    const handlePostPerPage = (limit) => {
        setPostPerPage(limit); 
        setCurrentPage(1); 
    };
    useEffect(()=>{

        console.log("useeffect running");
        fetchData();
    },[])

    const handleSearch=(e)=>{

        const value=e.target.value;
        setSearch(value);
        setCurrentPage(1);
        const result=posts.filter(
            (item)=>

            item.title.toLowerCase().includes(value.toLowerCase())||
            item.body.toLowerCase().includes(value.toLowerCase())
        );
        console.log(result);

        setFilteredPost(result);//post mathi data filter thay ne ahiya store thay
        
    }

    const startIndex=(currentPage-1)*postPerPage;
    const totalPages=Math.ceil(filteredPost.length/postPerPage);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newError = {};
        if (!explorePostForm.title.trim()) newError.title = "Tital Requird.....";
        if (!explorePostForm.body.trim()) newError.body = "Body Requird.....";

        setError(newError);
        if (Object.keys(newError).length > 0) return;

        try {
            const reasponse=await fetch(postId?`https://696b4ad2624d7ddccaa0b91e.mockapi.io/createPost/${postId}`:`https://696b4ad2624d7ddccaa0b91e.mockapi.io/createPost`,{
                    method:postId?"PUT":"POST",
                    headers:{
                                "Content-type":"application/json",
                            },
                body: JSON.stringify({
                    title: explorePostForm.title,
                    body: explorePostForm.body,
                    image:postId?explorePostForm.image:`https://picsum.photos/id/${Date.now()}/800/800`, 
                }),
            }); 
        
            if (!reasponse.ok) {
                alert("something went wrong!!!");
            }
        
            const data = await reasponse.json();
            console.log("post Add:", data);
            postId?alert("Post Edit Successfully"):alert("Post Add Successfully");
            fetchData();
            setExplorePostForm({ 
                title: "", 
                body: "", 
                image: "" });
        
        } catch (error) {
            console.error("Error:", error.message);
        } finally {
           
        }
    };

    return(
        <>
        <div className={`exp-main-class ${ctx.mode}`}>
        {loading&&<Loder/>}
        <h1 className='tital'>Explore Posts</h1>
        <div className="header-row-class">
            <button type='button' className='btn-creat-class' onClick={handleShow} >CreateForm</button>
                        
                <div className="search-main-class">
                    <FiSearch className="search-icon-class" />
                    <input 
                        className="search-input-class" 
                        type="text" 
                        value={search} 
                        placeholder="Search your information" 
                        onChange={handleSearch} 
                    />
                </div>
        </div>
            {showForm &&(
            <form className='form-exp-class'>
                <div className='exp-form-class'>
                <h1 className='exp-heding-class'>{postId?"Edit Explore Post":"Add Explore Post"}</h1>
                    <div className='filde-exp-class'>
                        <input type='text' 
                            placeholder='Enter title'
                            name='title'
                            value={explorePostForm.title}
                            onChange={(e) => handelChange("title", e.target.value)}
                        />
                        {errors.title && <p className="error-class">{errors.title}</p>}
                    </div>
                    <div className='filde-exp-class'>
                        <textarea 
                            placeholder='Enter body'
                            name='body'
                            value={explorePostForm.body}
                            onChange={(e) => handelChange("body", e.target.value)}
                        />
                        {errors.body && <p className="error-class">{errors.body}</p>}
                    </div>
                    <div className='btn-class-exp'>
                        <button type='submit' className='sub-btn-class' onClick={handleSubmit}>{postId?"Updet Post":"Submit Post"}</button>
                        <button className='cls-btn-class' onClick={handleClose}>Cancel</button>
                    </div>
                    
                </div>
            </form>
            )}
            
           
            <div className="content">
            {filteredPost.length==0? <p className="error-data-class">No Data Found </p>:filteredPost .slice(startIndex,startIndex+postPerPage).map((item)=>{
                
                return <Card  key={item.id} title={item.title} desc={item.body} id={item.id}  onEdit={()=>postDataGetById(item.id)} onDelete={()=>handleShowModel(item?.id)} from={"explore"} />
            })}
        </div>
       
        <PageNation currentPage={currentPage}
        totalPages={totalPages}
        onPrev={()=>setCurrentPage((p)=>p-1)}
        onNext={()=>setCurrentPage((p)=>p+1)}
        numChange={handlePostPerPage}/>

        {showModal &&<ConformModel title={""} 
                                         desc={"Are you Want to Delete This Card..??"} 
                                         onClose={()=>{setShowModal(false); setPostId(null) }} 
                                         onConfirm={deletePostById} 
                                         ConfirmBtnText={"Delete"}/>}
        </div>
        </>
    );
}
