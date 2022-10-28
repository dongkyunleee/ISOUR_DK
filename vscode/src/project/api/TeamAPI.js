import axios from "axios";
const HEADER = 'application/json';
const TEAM_DOMAIN = "http://localhost:8090/ISOUR/";



const TeamAPI = {
      // 로그인 기능
      userLogin: async function(id, pw) {
        const loginObj = {
            id: id,
            pwd: pw
        }
        return await axios.post(TEAM_DOMAIN + "LoginServlet", loginObj, HEADER); // LoginServlet이거가 백앤드랑 이름이 동일해야댐
    },
    // 회원 정보 조회
    MemberInfo: async function() {
        const regCmd = {
            cmd : "MemberInfo"
        }
        return await axios.post(TEAM_DOMAIN + "MemberServlet", regCmd, HEADER);
    },
    // 회원 가입
    memberReg: async function(id, pwd, name, gender, birth, region) {
        const memberObj = {
            id: id,
            pwd: pwd,
            name: name,
            gender: gender,
            birth: birth,
            region: region
        };
        return await axios.post(TEAM_DOMAIN + "memberReg", memberObj, HEADER);
    },
    // 회원 가입 여부 확인
    memberRegCheck: async function(id) {
        const regCheck = {
            id: id,
        }
        return await axios.post(TEAM_DOMAIN + "MemberCheck", regCheck, HEADER);
    },

        // 회원 탈퇴
        MemberOut: async function(id, pwd) {
        const regCmd = {
            id: id,
            pwd: pwd
            // name: name,
            // mail: mail
        }
        return await axios.post(TEAM_DOMAIN + "MemberOut", regCmd, HEADER);
    }
}

export default TeamAPI;