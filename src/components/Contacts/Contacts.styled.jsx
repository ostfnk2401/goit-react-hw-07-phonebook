import styled from "@emotion/styled";

export const ContactsList = styled.ul`
padding-left: 0;
list-style: none;

`

export const ContactItem = styled.li`
display: flex;
align-items: center;
gap: 20px;`

export const Number = styled.p`
font-weight: 500;
color: #898AA6;
`

export const Name = styled.p`
font-weight: 500;`

export const DeleteBtn = styled.button`
max-height: 20px;
outline: none;
border: none;
border-radius: 5px;
background-color: #4D5AE5;
cursor: pointer;
color: #FFFFFF;
 
&:hover {
    box-shadow: 0px 0px 3px 0.3px rgba(0,0,0,0.2);
  }  

`

export const P = styled.p`
`