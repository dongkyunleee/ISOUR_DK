package com.kh.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;

import com.kh.Common.Common;
import com.kh.DAO.MemberDAO;


@WebServlet("/MemberCheck")
public class MemberCheck extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    
	protected void doOptions(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Common.corsResSet(response);
	}

	@SuppressWarnings("unchecked")
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		Common.corsResSet(response);
		StringBuffer sb = Common.reqStringBuff(request);
		JSONObject jsonObj = Common.getJsonObj(sb);
		
		String getId = (String)jsonObj.get("id");
		
		MemberDAO dao = new MemberDAO();
		boolean isNotReg = dao.regIdCheck(getId);  // isNotReg = true 가입되어있지 않다. 
		
		PrintWriter out = response.getWriter();
        JSONObject resJson = new JSONObject();
        System.out.println("여기까지 와라....Check");
        if(isNotReg) resJson.put("result", "OK");
        else resJson.put("result", "NOK");
        out.print(resJson);	
	}
}

























