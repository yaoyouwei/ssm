package com.forwave.service.test;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.junit.Test;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractTransactionalJUnit4SpringContextTests;

import com.forwave.pojo.User;
import com.forwave.service.IUserService;

@ContextConfiguration(locations = {"classpath:spring-mybatis.xml"})
public class UserMapperTest extends AbstractTransactionalJUnit4SpringContextTests {
    @Resource
    IUserService userService;

    
    @Rollback(false) //控制回滚
    public void testSaveUser() throws Exception {
        
        List<User> users = userService.getUserListFromRemote();
        for(User user:users){
        	userService.saveUser(user);//更新
        }
        
    }
    
    @Rollback(false) //控制回滚
    public void getUserMapList() throws Exception {
        
    	List<Map<String,Object>> listMap = userService.getUserMapList(new User());
    	System.out.println(listMap);
        
    }
    
    @Rollback(false) //控制回滚
    public void saveUser() throws Exception {
        
    	User user = new User();
    	user.setAccount("Alan");
    	user.setDepartment("开发部");
        user.setEmail("yaoyouwei@forwave.com");
        user.setPassword("password");
        user.setTrueName("yaoyouwei");
        user.setCtype("user");
        userService.saveCreationUser(user);
        
    }
    
    @Rollback(false) //控制回滚
    public void updateUser() throws Exception {
    	
    	User user = new User();
    	user.setCid("dab80b70-0895-11e7-bf9b-e9dd996736da");
    	user.setAccount("Alan");
    	user.setDepartment("开发部");
    	user.setEmail("yaoyouwei@forwave.com");
    	user.setPassword("password");
    	user.setTrueName("yaoyouwei");
    	user.setCtype("user");
    	userService.saveCreationUser(user);
    	
    }
    
    @Rollback(false) //控制回滚
    public void getUserList() throws Exception {
    	
    	User user = new User();
    	user.setAccount("Alan");
    	List<User> userList = userService.getUserList(user);
    	for(User u:userList){
    		System.out.println(u.getCid());
    		System.out.println(u.getAccount());
    	}
    	
    	
    }
    
    @Test
    @Rollback(false) //控制回滚
    public void batchDeleteUser() throws Exception {
    	
    	String [] userIds = {"5ae47ab0-0951-11e7-9081-2bb301ea9428","4b16c62a-09ea-11e7-909c-2bf44889d594"};
    	userService.batchDeleteUser(userIds);
    	
    	
    }
    
}
