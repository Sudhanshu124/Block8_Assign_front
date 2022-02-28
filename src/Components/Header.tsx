import React,{useState} from 'react'
import styled from "styled-components";
import {Link,Navigate} from "react-router-dom";

function Header(props:{username?:string | undefined}){
    const [openMenu,setOpenMenu]=useState(false);
    const [redirect,setRedirect] = useState(false);
    const isAdmin:any=localStorage.getItem('isAdmin');

    const handleMenuOpen=()=>{
        setOpenMenu(!openMenu);
    }

    const handleLogout=()=>{
        localStorage.removeItem('token');
        setRedirect(true)
    }

  return (
    <Head>
        {redirect && <Navigate to="/"/>}
        <Logo>
            <img src="/logo.png" alt=""/>
        </Logo>
        <Menu onClick={handleMenuOpen}><img alt="svgImg" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNTAiIGhlaWdodD0iNTAiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIj48L3BhdGg+PGcgZmlsbD0iI2U2ZDk4NSI+PHBhdGggZD0iTTAsMjUuOHYxNy4yaDE3MnYtMTcuMnpNMCw3Ny40djE3LjJoMTcydi0xNy4yek0wLDEyOXYxNy4yaDE3MnYtMTcuMnoiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg=="/></Menu>
        <Options show={openMenu}>
           
            <Link to="/home">Home</Link>
            <Link to="/transactions">Transactions</Link>
            {isAdmin==="true" && <Link to="/admin">Admin Panel</Link>}
            {/* <p style={{color:"white",fontWeight:"bold"}}>{props.username}</p>
            <img src="https://img.icons8.com/office/40/000000/test-account.png" alt=""/> */}
            <img onClick={handleLogout} src="https://img.icons8.com/external-others-sbts2018/58/000000/external-logout-social-media-others-sbts2018.png" width="38px" alt=""/>
        </Options>
        
    </Head>
  )
}

export default Header

const Head=styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    background-color:#1BA94C;
    height:60px;
    padding:5px 20px;
    
`;
const Logo=styled.div`
    max-width:300px;
    &>img{
        width:60%;
    }
`;

const Menu=styled.div`
    display:flex;
    justify-content:end;
    align-items:center;
    display:none;
    cursor:pointer;
    img{
        width:20px;
    }

    @media only screen and (max-width:768px){
        display:block;
    }
`;
const Options=styled.div<{show: boolean}>`
    display:flex;
    justify-content:end;
    align-items:center;
    
    font-size: 18px;
    &>*{
        margin-left:20px;
        cursor:pointer;
        color:#e6d985;
        text-decoration:none;
    }

    &>a:hover{
        color:white;
    }

    @media only screen and (max-width: 768px) {
        flex-direction: column;
        background-color:rgba(0,0,0,0.8) ;
        position:absolute;
        display: ${props=>props.show? "flex":"none"};
        width:100%;
        height:100vh;
        padding-top:50px;
        top:60px;
        left:0;
        justify-content:start;
        align-items:start;
        
        &>*{
            margin-bottom:10px;
        }
    }
`;
