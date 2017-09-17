package com.forwave.dao;

import java.util.List;
import java.util.Map;

import com.forwave.pojo.User;

public interface IUserDao {
        User getUserById(String cid);

        List<User> getUserList(User user);

        void saveUser(User user);

        void deleteUser(User user);

        void updateUser(User user);
    
        List<Map<String,Object>> getUserMapList(User user);

	    void saveCreationUser(User user);

	    List<User> getPagedUserList(Map<String, Object> parameters);

	    int getUserTotal(User user);

	    void batchDeleteUser(String[] userIds);

	    int isExist(String id);

}