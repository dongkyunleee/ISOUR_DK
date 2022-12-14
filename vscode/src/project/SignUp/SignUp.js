import { useState, useCallback } from 'react';
import styled from 'styled-components';
import TeamAPI from '../api/TeamAPI';
// import App2 from './Addr2';
import hangjungdong from "../hangjungdong";

// 정규식 조건
const regexId = /^\w{8,20}$/;
const regexPw = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;


const Msg = styled.div`
  color: red;
  font-size: .8em;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const memberObj = {
  isId: "",
  isPassword: "",
  isName: "",
  isGender: "",
  isBirth: "",
  isRegion1: "",
  isRegion2: ""
};


function SignUp() {


    function InputName() {
      const [name, setName] = useState('');
      const [showReqName, setShowReqName] = useState(false);
      const onChangeName = e => { setName(e.target.value); };
      const req_name = "이름을 정확히 입력하세요."

      const input_Check_Name = () => {
        if(name === '') {
          setShowReqName(true); // 이름을 정확히 입력하세요.
        } else {
          setShowReqName(false);	// 이름을 정확히 입력하세요.
        }
      }

      memberObj.isName = name;

      return (
        <div className='field-wrap'>
          <div className='input-field'>
            <span style={{display: 'inline-block', width: 150}}>이름</span>
            <input type="text" value={name} onChange={onChangeName} onBlur={input_Check_Name} required/><br />
          </div>
          <Msg>
            {showReqName && req_name}
          </Msg>
        </div>
      );
    }

    function InputId() {
      const [id, setId] = useState('');
      const [showReqId, setShowReqId] = useState(false);
      const [showGuideId, setShowGuideId] = useState(false);
      const [CheckID, setCheckId] = useState("");
      const req_id = "아이디를 입력하세요."
      const guide_id = "아이디를 올바르게 입력해주세요."
      const onChangeId = e => { setId(e.target.value); };
        
      const input_Check_Id = () => {
        if(id === '') {
          setShowReqId(true); // 아이디를 입력하세요.
        } else if (!regexId.test(id)) {
          setShowGuideId(true); // 아이디를 올바르게 입력해주세요.
          setShowReqId(false); // 아이디를 입력하세요.
        }
        else {
          setShowGuideId(false); // 아이디를 올바르게 입력해주세요.
          setShowReqId(false); // 아이디를 입력하세요.
        }
      };

      memberObj.isId = id;

      
    const IDCHECK = async() => {
      console.log("Click 회원가입");
      // 가입 여부 우선 확인
      const memberCheck = await TeamAPI.memberRegCheck(id);
      // console.log(memberCheck);
      console.log("가입가능여부 확인 : ", memberCheck.data.result);
      // 가입 여부 확인 후 가입 절차 진행

      if (memberCheck.data.result === "OK") {
        setCheckId("가입된 아이디가 없습니다. 다음 단계 진행 합니다.");

      } else {
        setCheckId("이미 가입된 회원 입니다.");
      } 
    }

      return(
        <div className='field-wrap'>
          <div className='input-field'>
            <span style={{display: 'inline-block', width: 150}}>아이디</span>
            <input type="text" value={id} onChange={onChangeId} onBlur={input_Check_Id}/>
            <button className='IdCheckBtn' onClick={IDCHECK}>중복확인</button>
          </div>
          <Msg>
            {CheckID}
            {showReqId && req_id}
            {showGuideId && guide_id}
          </Msg>
          
        </div>
      );
    }



    function InputPassword() {
      const [password, setPassword] = useState('');
      const [showGuidePassword, setShowGuidePassword] = useState(false);
      const [showAcceptPassword, setShowAcceptPassword] = useState(false);
      const guide_password = "영문/숫자/특수문자 2가지 이상 조합 (8~20자)(ex:Apple123*)"
      const accept_password = "사용 가능한 비밀번호입니다."

      let [password_check, setPassword_check] = useState('');
      const [showErrorPasswordCheck, setShowErrorPasswordCheck] = useState(false);
      const [showAcceptPasswordCheck, setShowAcceptPasswordCheck] = useState(false);
      const error_password_check = "비밀번호가 일치하지 않습니다."
      const accept_password_check = "비밀번호가 일치합니다."

      const onChangePassword = e => {
        setPassword(e.target.value);
        let temp_password = e.target.value;

        // if(regexPw.test(temp_password)) {
        //   setShowAcceptPassword(true); // 사용 가능한 비밀번호입니다.
        //   setShowGuidePassword(false); // 영문/숫자/특수문자 2가지 이상 조합 (8~20자)
        // } else {
        //   setShowAcceptPassword(false); // 사용 가능한 비밀번호입니다.
        //   setShowGuidePassword(true); // 영문/숫자/특수문자 2가지 이상 조합 (8~20자)
        // }

        if (password_check == '') console.log(password_check);
        else if(password_check !== '' && (temp_password !== '' && temp_password === password_check)) {
          setShowAcceptPasswordCheck(true); // 비밀번호가 일치합니다.
          setShowErrorPasswordCheck(false); // 비밀번호가 일치하지 않습니다.
        } else {
          setShowErrorPasswordCheck(true); // 비밀번호가 일치하지 않습니다.
          setShowAcceptPasswordCheck(false); // 비밀번호가 일치합니다.
        }
      };

      const onClickPassword = () => {
        if (regexPw.test(password)) {
          setShowAcceptPassword(true); // 사용 가능한 비밀번호입니다.
          setShowGuidePassword(false); // 영문/숫자/특수문자 2가지 이상 조합 (8~20자)
        } else {
          setShowGuidePassword(true); // 영문/숫자/특수문자 2가지 이상 조합 (8~20자)
          setShowAcceptPassword(false); // 사용 가능한 비밀번호입니다.
        }
      };

      const onBlurpassword = () => {
        if(password === '') alert('비밀번호를 입력하세요');
      };

      const onChangePassword_check = e => {
        setPassword_check(e.target.value);
        const temp_password_check = e.target.value;

        if(password == '') {
          alert('비밀번호를 먼저 입력하세요.');
          setPassword_check('');
          showErrorPasswordCheck(false);
        }

        // if(password !== '' && !regexPw.test(password)) {
        //   alert('비밀번호를 확인하세요.');
        // } else 
        if (password === temp_password_check) {
          setShowAcceptPasswordCheck(true); // 비밀번호가 일치합니다.
          setShowErrorPasswordCheck(false); // 비밀번호가 일치하지 않습니다.
        } else {
          setShowErrorPasswordCheck(true); // 비밀번호가 일치하지 않습니다.
          setShowAcceptPasswordCheck(false); // 비밀번호가 일치합니다.
        }
      };

      const onClickPassword_check = () => {
        if(password == '') alert('비밀번호를 먼저 입력하세요.');
        else if (!regexPw.test(password)) alert('비밀번호를 확인하세요.');
      };

      const onBlurPassword_check = () => {
        if(regexPw.test(password) && password_check === '') {
          alert('비밀번호 확인에 입력하세요.');
          setShowErrorPasswordCheck(true); // 비밀번호가 일치하지 않습니다.
        }
      };

      memberObj.isPassword = password;
      // memberObj.isPasswordCheck = password_check;

      return(
        <div className='field-wrap'>
          <div className='input-field'>
            <span style={{display: 'inline-block', width: 150}}>비밀번호</span>
            <input type="password" value={password} onChange={onChangePassword} onClick={onClickPassword} onBlur={onBlurpassword} />
          </div>
          <Msg>
            {showGuidePassword && guide_password}
            {showAcceptPassword && accept_password}
          </Msg>

            <span style={{display: 'inline-block', width: 150}}>비밀번호 확인</span>
            <input type="password" value={password_check} onChange={onChangePassword_check} onClick={onClickPassword_check} onBlur={onBlurPassword_check}/>
          <Msg>
            {showErrorPasswordCheck && error_password_check}
            {showAcceptPasswordCheck && accept_password_check}
          </Msg>

        </div>
      );
    }

    function InputBirth() {
      const [birth, setBirth] = useState('');

      const onChangeBirth = e => { setBirth(e.target.value); };
      
      memberObj.isBirth = birth;

      

      
      return(
        <div className='field-wrap'>
          <div className='input-field'>
            <span style={{display: 'inline-block', width: 150}}>생년월일</span>
            <input type="date" value={birth} onChange={onChangeBirth} />
          </div>
          
        </div>
      );
    }



    function InputGender() {
      const [x, setX] = useState([]);
      // const [errorRadio, setErrorRadio] = useState('');
      const onChangeRadioButton = useCallback(e => {
        const xCurrent = e.target.value;
        setX(xCurrent);
      });

      memberObj.isGender = x;

      return(
        <div>
          <label className="label1">
            <input

              className="radio2"
              type="radio"
              value="남"
              checked={x === "남"}
              onChange={onChangeRadioButton}

            />
            남자
          </label>
          <label className="label2">
            <input
              className="radio3"
              type="radio"
              value="여"
              checked={x === "여"}
              onChange={onChangeRadioButton}
            />
            여자
          </label>
        </div>
      );
    }
    const InputAddr = () => {
      const [value, setValue] = useState("");
      const [value2, setValue2] = useState("");
    

      //변수값 변경을 위해 타겟밸류 설정
      const onChangeValue = (e) => {
        setValue(e.target.value);
        console.log(e.target.value);
      }


      const onChangeValue2 = (e) => {
        setValue2(e.target.value);
        console.log(e.target.value);
        isSubmit();
      }

      const { sido, sigugun } = hangjungdong;
      
      memberObj.isRegion1 = value;
      memberObj.isRegion2 = value2;

      return (
        <div>
          <select onChange={onChangeValue}>
            <option value="">선택</option>
            {/* map을 사용하여 한정동에 있는 키값을 받아옴 */}
            {sido.map((el) => (
              <option key={el.sido} value={el.sido}>
                {el.codeNm}
              </option>
            ))}
          </select>
          <select onChange={onChangeValue2}>
            <option value="">선택</option>
            {sigugun
            // 필터함수를 사용하여 배열을 필터링하여 군/구를 불러옴
              .filter((el) => el.sido === value)
              .map((el) => (
                <option key={el.sigugun} value={el.sigugun}>
                  {el.codeNm}
                </option>
              ))}
          </select>
        </div>
      );
    }


  const [submit, setSubmit] = useState(false); // 서버로 전송할 수 있는 조건 체크
  const [resData, setResData] = useState('');


  const isSubmit = () => {
    if(memberObj.isId && memberObj.isPassword && memberObj.isName) setSubmit(true);
  }

    const onClickButton =  async () => {
      try {
        // 서버에 대한 요청을 비동기로 처리 함
        const res =  await TeamAPI.memberReg(memberObj.isId, memberObj.isPassword, memberObj.isName, memberObj.isGender, memberObj.isBirth, memberObj.isRegion1,  memberObj.isRegion2);
        setResData(res.data);

    } catch (e) {
        console.log(e);
    }
      console.log(memberObj.isId);
      console.log(memberObj.isPassword);
      console.log(memberObj.isName);
      console.log(memberObj.isGender);
      console.log(memberObj.isBirth);
      console.log(memberObj.isRegion1);
      console.log(memberObj.isRegion2);
      console.log("가입 완!!");
      // window.location.replace("/Login");

      
  // } else alert('입력된 값을 확인하세요.');
  }


  return (
    <div>
      <InputName></InputName>
      <InputId></InputId>
      <InputPassword></InputPassword>
      <InputBirth></InputBirth>
      <InputGender></InputGender>
      <InputAddr></InputAddr>

      <br />
            {/* {submit &&  */}
            <button type="submit" onClick={onClickButton}>회원가입</button>
            {/* } */}
            {/* {resData &&  resData.map(list =>(
                <>
                <p key={list.index}>이름 : {list.name}</p> 
                <p key={list.index}>이메일 : {list.email}</p>
                </>
            ))} */}
    </div>
  );
}

export default SignUp;