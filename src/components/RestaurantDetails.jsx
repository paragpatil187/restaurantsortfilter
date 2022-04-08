import React, { useEffect, useState } from 'react'
import axios from "axios"
import "./res.css"
export default function RestaurantDetails() {
    const [data,setData]=useState([])
    const [show,setShow]=useState([])
    const[page,setPage]=useState(1);
    const[loading,setLoading]=useState(false);
    const[error,setError]=useState(false);
    const[limit,setLimit]=useState(6)



    // const url="http://localhost:3000/get-restaurants"
    // useEffect(()=>{
    //     axios.get(url).then((res)=>{
    //         setData(res.data)
    //         setShow(res.data)
    //     })
    // },[])
    const fetchData= async (page,limit)=>{
        setLoading(true);
        setError(false);
        return axios({
            url:"http://localhost:3000/get-restaurants",
            method:"GET",
            params:{
                _page:page,
                _limit:limit
            }

        }).then((res)=>{
            setLoading(false)
            setShow(res.data)
        })
        .catch((err)=>{
            setLoading(false);
            setError(true)
        })
    }
    useEffect(()=>{
        fetchData(page,limit)
    },[page,limit])
    
 

 //handle rating
 const handleRating=(val)=>{
     let item=show.filter((e)=>{
         if(e.rating >= +val){
             return e;
         }
     });
     setShow(item)
 }
 //payment filter

 const handlePayment=(paymethod)=>{
     //if(paymethod=="cash"){
         let item=show.filter((e)=>{
             if(e.payment_method[paymethod]){
                 return e;

             }
         });
         setShow(item);
     }
    
    
    // array is there with object so if want acesee payment we can acess it 
    //by dot operator and value by squarebrackets
 //

 //cost for two people sort
 const handleCost =(cost)=>{
    let item=[...show]
     if(cost=="ltoh"){
         
         item.sort((a,b)=>a.cost_for_one - b.cost_for_one);
         setShow(item)
     }
     else{
     item.sort((a, b) => b.cost_for_one - a.cost_for_one);
     setShow(item)
     }



 }
 return (
    <div className='maindiv'>
    <div>
    <button
    onClick={() => {
      handleRating(4);
    }}
  >
    4 and Above
  </button>
  <button
    onClick={() => {
      handleRating(3);
    }}
  >
    3 and Above
  </button>
  <button
    onClick={() => {
      handleRating(2);
    }}
  >
    2 and Above
  </button>
  <button
    onClick={() => {
      handleRating(1);
    }}
  >
    1 and Above
  </button>

    </div>
    <div>
    <button
    onClick={() => {
      handlePayment("cash");
    }}
  >
    Cash
  </button>
  <button
    onClick={() => {
      handlePayment("card");
    }}
  >
    Card
  </button>
  <button
    onClick={() => {
      handlePayment("upi");
    }}
  >
    upi
  </button>
    </div>
    <div>
    <button
            onClick={() => {
              handleCost("ltoh");
            }}
          >
            Cost-Low to High
          </button>
          <button
            onClick={() => {
              handleCost("htol");
            }}
          >
            Cost-High to Low
          </button>
    </div>
    <div className='flexbox'>
    {show.map((e) => {
    return (
   
    <div style={{backgroundColor:"blueviolet", marginBottom:"20px"}}>
            <div>
              <img src={e.img} alt="" />
            </div>
            <div>
              <h1>{e.name}</h1>
              <p>Category : {e.category}</p>
              <p>Cost for one : {e.cost_for_one}</p>
              
              
            </div>
            <div>
           payment option {`cash:${e.payment_method.cash} card:${e.payment_method.card}`}
              <p>Rating : {e.rating}</p>
              <p>Reviews : {e.reviews}</p>
              <p>Votes : {e.votes}</p>
            </div>
            </div>
            
            
          
        );
      })}
      </div>
      
        <div>
        <button onClick={()=>setPage((p)=>p-1)} disabled={loading || page===1}>prev</button>
        <button onClick={()=>setPage((p)=>p+1)} disabled={loading || page===10}>next</button>
        </div>
      
    

    </div>
  );
}