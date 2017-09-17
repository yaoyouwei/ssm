package com.forwave.service.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Service;

import com.forwave.common.utils.HttpClientUtils;
import com.forwave.dao.IUserDao;
import com.forwave.pojo.User;
import com.forwave.service.IUserService;

@Service("userService")
public class UserServiceImpl implements IUserService {
	private static Log logger = LogFactory.getLog(UserServiceImpl.class);

    @Resource
    private IUserDao userDao;
    
   

    @Override
    public User getUser(String id) {
        
        return userDao.getUserById(id);
    }
    @Override
    public List<User> getUserList(User user) {
        return userDao.getUserList(user);
    }
    @Override
    public void saveUser(User user) {
        userDao.saveUser(user);
    }
    
    @Override
    public void deleteUser(User user) {
        userDao.deleteUser(user);
    }
    @Override
    public void updateUser(User user) {
        userDao.updateUser(user);
    }
    
	@Override
	public List<User> getUserListFromRemote() {
		String getMethodUrl = "http://localhost/api/EastFaxWebAPI.php";
		String getSignUrl = "http://localhost/api/demo/sign.php";
		//设置参数
		Map <String,String> paramMap = new HashMap<String,String>();
		paramMap.put("sign", "");
		paramMap.put("format", "json");
		paramMap.put("app_secret", "33B2D903C6D8A2A23D2064C9391344B1");
		paramMap.put("departid", "");
		paramMap.put("method", "eastfax.user.listNoLogin");
		paramMap.put("serverid", "");
		paramMap.put("app_key", "demo");
		JSONObject json = HttpClientUtils.getJSONDataFromEastFax(getSignUrl,getMethodUrl,paramMap);
		
        if(json.containsKey("error_response")){
        	  return Collections.emptyList();
        }
        
		JSONArray userList = json.getJSONObject("user_list_response")
				.getJSONObject("user_items").getJSONArray("user_item");
		List<User> users = new ArrayList<User>();
		for(int i=0 ;i<userList.size();i++){
			JSONObject user = userList.getJSONObject(i);
			User u = new User();
			u.setAccount(user.getString("account"));
			u.setCid(user.getString("cid"));
			u.setCtype(user.getString("ctype"));
			u.setDepartment(user.getString("department"));
			u.setEmail(user.getString("email"));
			u.setFaxExtension(user.getString("faxextension"));
			u.setLocked(user.getString("locked"));
			u.setMobile(user.getString("mobile"));
			u.setPassword(user.getString("password"));
			u.setTelbiz(user.getString("telbiz"));
			u.setTrueName(user.getString("truename"));
			users.add(u);
			
		}
		return users;
	}
	@Override
	public List<Map<String,Object>> getUserMapList(User user) {
		
		return userDao.getUserMapList(user);
	}
	@Override
	public void saveCreationUser(User user) {
		userDao.saveCreationUser(user);
	}
	
	@Override
	public List<User> getUserList(User user, int pageIndex, int pageSize) {
		Map<String,Object> parameters = new HashMap<String,Object>();
		parameters.put("account", user.getAccount());
		parameters.put("pageIndex", pageIndex);
		parameters.put("pageSize", pageSize);
		return userDao.getPagedUserList(parameters);
		
	}
	
	@Override
	public void syncUserList(){
		List<User> rmtUserList = getUserListFromRemote();
		for(User user:rmtUserList){
			if(userDao.isExist(user.getCid())==0){
				saveUser(user);
			}else{
				logger.info(user.getAccount());
			}
		}
	}
	
	@Override
	public int getUserTotal(User user) {
		return userDao.getUserTotal(user);
	}
	
	
	@Override
	public void batchDeleteUser(String [] userIds) {
		userDao.batchDeleteUser(userIds);
		
	}
}
