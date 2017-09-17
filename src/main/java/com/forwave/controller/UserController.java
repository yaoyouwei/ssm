package com.forwave.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.forwave.common.utils.Constant;
import com.forwave.dto.UserDto;
import com.forwave.pojo.User;
import com.forwave.service.IUserService;

@Controller
@RequestMapping({ "user/mgnt" })
public class UserController{
	//private static Log logger = LogFactory.getLog(UserController.class);
    @Resource
    IUserService userService;

	@RequestMapping(value={ "list.do" }, params = { "r_showUserList" })
	public String listContact(ModelMap mm) {
		
		return "user_list";
	}
	
	@RequestMapping(value={ "list.do" }, params = { "r_showUserListRemote" })
	public String test1(ModelMap mm) {
		return "user_list_remote";
	}
	

	@ResponseBody
	@RequestMapping(value = { "list.do" }, params = { "c_saveUser" })
	public Map<String,Object> saveUser(User user,ModelMap mm) {
		Map<String,Object> result = new HashMap<String,Object>();
	    try {
			userService.saveCreationUser(user);
			result.put(Constant.SUCCESS, true);
		} catch (Exception e) {
			result.put(Constant.SUCCESS, false);
			result.put(Constant.ERROR_INFO, e.getMessage());
			e.printStackTrace();
		}
		return result;
	}
	
	@ResponseBody
	@RequestMapping(value = { "list.do" }, params = { "c_syncUserList" })
	public Map<String,Object> syncUserList(User user,ModelMap mm) {
		Map<String,Object> result = new HashMap<String,Object>();
	    try {
			userService.syncUserList();
			result.put(Constant.SUCCESS, true);
		} catch (Exception e) {
			result.put(Constant.SUCCESS, false);
			result.put(Constant.ERROR_INFO, e.getMessage());
			e.printStackTrace();
		}
		return result;
	}
	
	@ResponseBody
	@RequestMapping(value = { "list.do" }, params = { "u_updateUser" })
	public Map<String,Object> updateUser(User user,ModelMap mm) {
		Map<String,Object> result = new HashMap<String,Object>();
	    try {
			userService.updateUser(user);
			result.put(Constant.SUCCESS, true);
		} catch (Exception e) {
			result.put(Constant.SUCCESS, false);
			result.put(Constant.ERROR_INFO, e.getMessage());
			e.printStackTrace();
		}
		return result;
	}
	
	@ResponseBody
	@RequestMapping(value = { "list.do" }, params = { "d_deleteUser" })
	public Map<String,Object> deleteUser(User user,ModelMap mm) {
		Map<String,Object> result = new HashMap<String,Object>();
	    try {
			userService.deleteUser(user);
			result.put(Constant.SUCCESS, true);
		} catch (Exception e) {
			result.put(Constant.SUCCESS,false);
			result.put(Constant.ERROR_INFO, e.getMessage());
			e.printStackTrace();
		}
		return result;
	}
	
	@ResponseBody
	@RequestMapping(value = { "list.do" }, params = { "d_batchDeleteUser" })
	public Map<String,Object> batchDeleteUser(String [] userIds,ModelMap mm) {
		Map<String,Object> result = new HashMap<String,Object>();
	    try {
			userService.batchDeleteUser(userIds);
			result.put(Constant.SUCCESS, true);
		} catch (Exception e) {
			result.put(Constant.SUCCESS,false);
			result.put(Constant.ERROR_INFO, e.getMessage());
			e.printStackTrace();
		}
		return result;
	}
	
	@ResponseBody
	@RequestMapping(value = { "list.do" }, params = { "r_queryUserList"})
	public Map<String,Object> getUserMapList(UserDto user,ModelMap mm) {
		Map<String,Object> result = new HashMap<String,Object>();
	    try {
	    	List<User> userList = userService.getUserList(user,user.getStart(),user.getLimit());
	    	result.put("rows",userList );
	    	result.put("total", userService.getUserTotal(user));
	    	result.put(Constant.SUCCESS, true);
		} catch (Exception e) {
			result.put(Constant.SUCCESS, false);
			result.put(Constant.ERROR_INFO, e.getMessage());
			e.printStackTrace();
		}
		return result;
	}
	




	

}
