import nowGo from '../images/short_cut.png'

const Home = () => {

    const localId = window.localStorage.getItem("userId");
    const localPw = window.localStorage.getItem("userPw");

    const onClickMember = () => {
        console.log("회원정보로 이동");
        window.location.replace("/MemberInfo");
    }

    return(
        <div>
            <div className="container">
                <div className="mainhead">
                    <div className="EFT" onClick={onClickMember}>
                        <img src={nowGo} className="imgEFT" alt="GoEFT" />
                        <span className="EFTtypo">회원정보 조회</span>
                    </div>
                </div>
                <div className="history" >
                   <p>회원 아이디 : {localId}</p>
                   <p>회원 패스워드 : {localPw}</p>
                </div>
            </div>
        </div>
    );

}

export default Home;