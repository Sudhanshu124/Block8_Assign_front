import React,{useState} from 'react'
import styled,{css} from "styled-components";
import loginApi from "../Api/login";
import Register from '../Api/register';
import Error from "../Components/Error";
import registerApi from "../Api/register";
import Loader from "../Components/Loader"
import {Navigate} from "react-router-dom";


function Login() {

  const [loginSelected,setLoginSelected]=useState(true);
  const [RegisterSelected,setRegisterSelected]=useState(false);

  const [error,setError]=useState("");
  const [registerValues, setRegisterValues]=useState({name: '',email: '',password: ''});
  const [loginValues,setLoginValues]=useState({email: '',password:''});

  const [registerSuccess,setRegisterSuccess]=useState(false);
  const [loader,setLoader]=useState(false);
  const [redirect,setRedirect]=useState(false);


  const handleLoginClick=()=>{
    setLoginSelected(true);
    setRegisterSelected(false);
    setRegisterSuccess(false);
  }

  const handleRegisterClick=()=>{
    setLoginSelected(false);
    setRegisterSelected(true);
  }


  const handleLoginSubmit=async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    e.preventDefault();
    if(!loginValues.email || !loginValues.password){
      setError("All fields are required");
      return;
    }
    setLoader(true);
    const res=await loginApi(loginValues);
    setLoader(false);
    if(res.result){
        //redirect
        localStorage.setItem("token",res.data.token);
        localStorage.setItem("id",res.data.id);
        localStorage.setItem("isAdmin",res.data.isAdmin);
        setRedirect(true);
    }else{
        setError(res.error);
    }
    
  }
  const handleSignupSubmit=async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    e.preventDefault();
    if(!registerValues.name || !registerValues.email || !registerValues.password){
      setError("All fields are required !");
      return;
    }
    setLoader(true);
    const res=await registerApi(registerValues);
    setLoader(false);
    if(res.result){
        setTimeout(()=>{
          handleLoginClick();
        },3000)
        setRegisterSuccess(true);
        
    }else{
        setError(res.error);
    }

  }

  function handleErrorClose(){
    setError("");
  }

  return (
    <Container>
    {localStorage.getItem("token") && <Navigate to="/home"/>}
    {redirect && <Navigate to="/home"/>}
    {loader && <Loader/>}
    {error && <Error handleClose={handleErrorClose} error={error}/>}
      <div>
        <img src="/logo.png" alt="logo"/>
        <Card>
            <Toggler>
              <Div onClick={handleLoginClick} selected={loginSelected}>Login</Div>
              <Div onClick={handleRegisterClick} selected={RegisterSelected}>Sign Up</Div>
            </Toggler>
              {
                loginSelected && 
                <LoginForm>
                    <label htmlFor="Email">Email</label>
                    <StyledInput onChange={(e)=>setLoginValues({...loginValues,email: e.target.value})} type="email" name="email" placeholder="Plese enter your email" value={loginValues.email}/>
                    <label htmlFor="Email">Password</label>
                    <StyledInput onChange={(e)=>setLoginValues({...loginValues,password: e.target.value})} type="password" name="password" placeholder="Plese enter your password" value={loginValues.password} />
                    <Button type="submit" onClick={(e)=>handleLoginSubmit(e)}>Login</Button>
                </LoginForm>
              }
              {
                RegisterSelected && 
                <RegisterForm>
                  <label htmlFor="name">Name</label>
                  <StyledInput onChange={(e)=>setRegisterValues({...registerValues,name:e.target.value})} type="text" name="name" placeholder="Plese enter your name" value={registerValues.name}/>
                  <label htmlFor="Email">Email</label>
                  <StyledInput onChange={(e)=>setRegisterValues({...registerValues,email:e.target.value})} type="email" name="email" placeholder="Plese enter your email" value ={registerValues.email}/>
                  <label htmlFor="Email">Password</label>
                  <StyledInput onChange={(e)=>setRegisterValues({...registerValues,password:e.target.value})}  type="password" name="password" placeholder="Plese enter your password" value={registerValues.password}/>
                  {registerSuccess && <p>You have been successfully Registered! Redirecting to Login in 3 Seconds</p>}
                  <Button type="submit" onClick={(e)=>handleSignupSubmit(e)}>Login</Button>
                </RegisterForm>
              }
        </Card>
      </div>
        
    </Container>
  )
}

export default Login

const Container=styled.div`
  display:flex;
  flex-direction: column;
  justify-content:center;
  align-items:center;
  height: 100vh;
  background-color:#f3f7f7;

  &>div{
    &>img{
      display:block;
      margin:0 auto 30px;
      width:70%;
    }
  }
`;

const Card=styled.div`
  max-width:400px;
  
  background-color:white;
  border-radius: 10px;
  box-shadow:0px 0px 20px 0px rgba(0,0,0,0.2);

  
  
`;

const Toggler=styled.div`
  display:flex;
  justify-content:center;
  font-weight: bold;

`;

const Div=styled.div<{selected: boolean}>`
    cursor: pointer;
    flex:1;
    padding:15px;
    text-align:center;
    background-color:${props=> props.selected ? "#f9fbfb":"transparent"};
    box-shadow:${props=> props.selected ? "10px 2px 26px -14px rgba(0,0,0,0.75);":"none"};

    &:first-child{
      border-radius: 10px 0 0 0;
    }
    &:last-child{
      border-radius: 0 10px 0 0;
    }
`;

const RegisterForm=styled.form`
  padding:20px 20px;

  &>p{
    color:green;
    margin:10px 0;
  }
  
`;
const LoginForm=styled.form`
  padding:20px 20px;
`;

// const SharedStyles =css`
//  background-color: #eee;
//  height:40px;
//  border-radius:5px;
//  border:1px solid #a6c1ee ;
//  margin:10px 0 20px;
//  padding:20px;
//  box-sizing: border-box;
// `;
const StyledInput = styled.input`
  width:100%;
  padding:12px;
  margin:10px 0;
  border-radius: 5px;
  border:0.5px solid grey;
  background-color:#f3f7f7;
  color:#7a99b5;
`;

const Button=styled.button`
  background-color:#1ba94c;
  outline:none;
  border:none;
  width:100%;
  padding:15px;
  color:white;
  font-weight: bold;
  font-size: 18px;
  border-radius:5px;
  margin:10px 0 0;
  cursor:pointer;

  &:hover{
    transform: Scale(1.02);
    transition-duration:0.5s;
  }

`;