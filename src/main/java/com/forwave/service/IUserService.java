package com.forwave.service;

import com.forwave.pojo.User;

import java.util.List;
import java.util.Map;

public interface IUserService {
        User getUser(String id);
    
        List<User> getUserList(User user);
    
        void saveUser(User user);
    
        void deleteUser(User user);
    
        void updateUser(User user);
    
        List<Map<String,Object>> getUserMapList(User user);
    
	    void saveCreationUser(User user);
	
	    List<User> getUserList(User user, int pageIndex, int pageSize);
	
	    int getUserTotal(User user);
	
	    void batchDeleteUser(String [] userIds);
	
	    List<User> getUserListFromRemote();

	    void syncUserList();

}