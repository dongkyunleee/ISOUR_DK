import { useState, useEffect } from 'react';
import TeamAPI from '../api/TeamAPI'
import styled from 'styled-components';
import { Link } from "react-router-dom";
import imgHome from '../images/home_button.png'


const MemberOut = () => {
    const [inputId, setInputId] = useState("");
    const [inputPwd, setInputPwd] = useState("");

    const MemberListBlock = styled.div`
        box-sizing: border-box;
        padding-bottom: 3em;
        width: 768px;
        margin: 0 auto;
        margin-top: 2rem;
        @media screen and (max-width: 768px) {
            witdh: 100%;
            padding-left: 1em;
            padding-right:1em;
        }
        p {
            color: white;
            font-size: 25px;
            margin: 0;
        }
    `;

    const MemberList = styled.table`
        border-collapse: collapse;
        width: 768px;
        margin: 0 auto;
        font-size: 1.125em;
        color: white;
        @media screen and (max-width: 768px) {
            witdh: 100%;
        }
        input {
            width: 300px;
            height: 40px;
            font-size: 20px;
            padding: 10px;
            margin: 10px;
        }
    `;

    const MemberTitle = styled.table`
        font-size: 2em;
        text-align: center;
        color: white;
    `;


const onClickCheck = async() => {
    try {
        const res = await TeamAPI.MemberOut(inputId, inputPwd);
        console.log("이거 뭐냐고!!! : " + res.data.result);
       
        if(res.data.result === "OK") {
            window.localStorage.setItem("userId", inputId);
            window.localStorage.setItem("userId", inputPwd);
            alert('탈퇴 완');
            // if (onclick) {
            // window.location.replace("/home");
            // }
            console.log("탈퇴 완..");
        }
    } catch (e) {
        console.log("탈퇴 에러..");
        alert('개미지옥');
    }
}


const onChangId = (e) => {
    setInputId(e.target.value);
  }

  const onChangePw = (e) => {
    setInputPwd(e.target.value);
  }



    // useEffect(() => {
        
    //     const memberData = async () => {
    //         setLoading(true);
    //         try {
    //             const response = await KhApi.memberInfo();
    //             setMemberInfo(response.data);
    //             console.log(response.data)
    //         } catch (e) {
    //             console.log(e);
    //         }
    //         setLoading(false);
    //     };
    //     memberData();
    // }, []);

    // if(loading) {
    //     return <MemberListBlock>대기 중...</MemberListBlock>
    // }

    return(
        <MemberListBlock>
            <MemberList>
                <MemberTitle>회원 탈퇴 하기</MemberTitle>
                <div className="item2">
                <input type="text" placeholder="Enter ID" value={inputId} onChange={onChangId} required />
                </div>
                <div className="item2">
                <input type="password" placeholder="Enter Password" value ={inputPwd} onChange={onChangePw} required />
                </div>
                 <button onClick={onClickCheck}>확인</button>
                 <Link to="/home" className="link-box"><button>취소</button></Link>
            </MemberList>
        </MemberListBlock>
    );
}
export default MemberOut;