import axios from 'axios'
import moment from 'moment/moment'
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { json, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export const AddUser = () => {
    
  const {id} =useParams("")


  const [userdata, setuserData ]= useState([]) 
  const [file,setFile]=useState("")
  const [filename,setFileName]=useState("")
  const [checkState, setCheckstate]=useState([])


  const Navigation= useNavigate("")

  

const fetchUser= async()=>{
  const result=await axios.get(`http://localhost:1000/user/${id}`)
  setuserData(result.data)

  // console.log("----formdata.hobbies"+(result.data.hobbies))
  // let z = (result.data.hobbies).split(" ,")
  // console.log("----z---->"+z);
    
}

  useEffect(()=>{
    fetchUser();
  },[])

  

  const checkHandler=(e)=>{
  // let data= checkState
  // data.push(e.target.value)
  // setCheckstate(data)
  const {value, checked} = e.target
  if(checked){
    setCheckstate([...checkState,value])
    console.log(`${value} is ${checked}`)

  }
  else{
    setCheckstate(checkState.filter((e)=>e !== value))
    console.log(`${value} is ${checked}`)

  }
  }

  const valueHandler=(e)=>{
    setuserData({...userdata,[e.target.name]:e.target.value})
     
    // if(e.target.name ==='gender1'){
    
    //   setFormData({gender:'male'})
      
    // }
    // if(e.target.name === 'gender2'){
      
    //   setFormData({gender:'female'})
    //   // setFormData({...formdata,['gender2']:'female'})

    // }
    // if(e.target.name === 'gender3'){
      
    //   setFormData({gender:'other'})
    //   // setFormData({...formdata,['gender3']:'other'})
    // }

    // if(e.target.name==='hobbies1'){
    // console.log("cricket");
    //  setFormData({hobbies:'Cricket'})
    // }
    // if(e.target.name==='hobbies1'){
     
    //   setFormData({hobbies:"Football"})
    //  }

    //  if(e.target.name==='hobbies1'){
      
    //   setFormData({hobbies:"Hockey"})
    //  }
     
    //  if(e.target.name==='hobbies1'){
      
    //   setFormData({hobbies:"Table Tannis"})
    //  }
  }
// console.log("----formdata0"+JSON.stringify(formdata))
  const submitHandler=async(e)=>{
    e.preventDefault();
    // console.log(userdata)
    
     
     if(id === ":id"){
       
      console.log("-------"+file)
      console.log("-%%%%%%%%%"+filename)
      console.log(checkState)

      const formdata= new FormData();
      formdata.append("name",userdata.name)
      formdata.append("dob",userdata.dob)
      formdata.append("city",userdata.city)
      formdata.append("gender",userdata.gender)
      formdata.append("email",userdata.email)
      formdata.append("desc",userdata.desc)
      formdata.append("mobile",userdata.mobile)
      formdata.append("hobbies",checkState)
      formdata.append("userimage", file)
      formdata.append("filename",filename)
     
      console.log(formdata)
      

      const data= await axios.post('http://localhost:1000/user',formdata)
      console.log(data.status)
      if(data.status===200){
        
       Navigation('/')
      }
      else{
        alert("not added user")
      }
     }
    
           if(id){
            const update= await axios.put(`http://localhost:1000/user/${id}`,userdata)
          
            if(update.status===200){
              Navigation('/')
             }
             else{
               alert("not Updated user")
             }

           }
       
  }
  // // console.log(userdata)
  //  const data= userdata.hobbies
  //  console.log(data[0])

  //  console.log("==========================================================================")
  // // // console.log(userdata.hobbies.indexOf('Cricket') !== -1)
  
  return (
    <>
     <h1 className=' my-3 py-3 bg-success text-white text-center'>Add user</h1>
     <Container>
      <Row className="justify-content-center">
        <Col lg={4}>
        <Form className='mt-3' onSubmit={submitHandler}>
      <Form.Group className="mb-3" >
        <Form.Label>Name:</Form.Label>
        <Form.Control type="text" placeholder="Enter name" name="name" value={userdata.name} onChange={valueHandler} />
     
      </Form.Group>
      
      <Form.Group className="mb-3" >
        <Form.Label>Email:</Form.Label>
        <Form.Control type="email" placeholder="Enter Your Email"  value={userdata.email} name="email" onChange={valueHandler} />
     
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Mobile:</Form.Label>
        <Form.Control type="text" placeholder="Enter Your  Mobile No."  value={userdata.mobile} name="mobile" onChange={valueHandler} />
     
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Date of Birth:</Form.Label>
        <Form.Control type="date" name="dob"  onChange={valueHandler} value={moment(userdata.dob).format('YYYY-MM-DD')} />
        {/* value={moment(userdata.dob).format('YYYY-MM-DD')} */}
     
      </Form.Group>

      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Upload your profile picture</Form.Label>
        <Form.Control type="file" onChange={(e)=>{
           setFile(e.target.files[0] )
           setFileName(e.target.files[0].name)
           console.log("jjkljljljlk-------"+e.target.files[0].name)
           }} name="userimage" />
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>City:</Form.Label>
        <Form.Select aria-label="Default select example" name="city" value={userdata.city} onChange={valueHandler}>
      <option>Select your city</option>
      <option value="indore">Indore</option>
      <option value="gwalior">Gwalior</option>
      <option value="bhopal">Bhopal</option>
      <option value="shivpuri">Shivpuri</option>
    </Form.Select>
       
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Descriptions </Form.Label>
        <Form.Control as="textarea" rows={3} name="desc" value={userdata.desc} onChange={valueHandler} />
      </Form.Group>
      <Form.Label>Gender: </Form.Label>
        <div  className="mb-3">
          <Form.Check
            inline
            label="Male"
            name="gender"
            value={'male'}
            checked={userdata.gender==='male'? true:false}
            onChange={valueHandler}
            type={'radio'}
          />
          <Form.Check
            inline
            label="Female"
            value={'female'}
            onChange={valueHandler}
            checked={userdata.gender==='female'? true:false}
            name="gender"
            type={'radio'}
          />
          <Form.Check
            inline
            label="Other"
            value={'other'}
            onChange={valueHandler}
            checked={userdata.gender==='other'? true:false}
            name="gender"
            type={'radio'}
          />
        
        </div>
  { userdata.hobbies}
  <Form.Label>Hobbies: </Form.Label>
        <div key={`inline-checkbox`} className="mb-3">
          <Form.Check
            inline
            label="Cricket"
            value={'Cricket'}
            checked={(userdata.hobbies) ? (userdata.hobbies).includes('Cricket') ? true : false : false}
            onChange={checkHandler}

            // {(userdata.hobbies).map((item)=>{
            //   return(<>
            //     <input type={'checkbox'} value={item}/>
            //   </>)
            // })}
            name="hobbies"
            type="checkbox"
            // id={`inline-${type}-1`}
          />
          <Form.Check
            inline
            label="Football"
            name="hobbies"
            value={'Football'}
            checked={(userdata.hobbies) ? (userdata.hobbies).includes('Football') ? true : false : false}
            onChange={checkHandler}

            // checked={userdata.hobbies==='Football' ? true : false}
            type="checkbox"
            // id={`inline-${type}-2`}
          />
          <Form.Check
            inline
            label="Hockey"
            name="hobbies"
            value={'Hockey'}
            checked={(userdata.hobbies) ? (userdata.hobbies).includes('Hockey') ? true : false : false}
            onChange={checkHandler}


            // checked={userdata.hobbies==='Hockey'? true : false}
            type="checkbox"
            // id={`inline-${type}-2`}
          />
          <Form.Check
            inline
            label="Table Tannis"
            value={'Table Tannis'}
            checked={(userdata.hobbies) ? (userdata.hobbies).includes('Table Tannis') ? true : false : false}
            onChange={checkHandler}


            // checked={userdata.hobbies==='Table Tannis'? true : false}
            name="hobbies"
            type="checkbox"
            // id={`inline-${type}-2`}
          />
       
        
        </div>
{/* 
        {console.log(formdata.hobbies)
          (formdata.hobbies).map((item)=>{
            return(<>
            <input type={'checkbox'} value={item}/>
            </>)
          })
        }
   */}
      
      {/* {console.log((formdata.hobbies).split(", ")) 
      
      } */}
       
      <Button variant="primary" type="submit">
        Add Users
      </Button>
    </Form>
        </Col>
      </Row>
       
     </Container>
    </>
  )
}
