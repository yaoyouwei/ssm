package com.forwave.pojo;

import java.util.Date;

public class User {
	private String cid;

	private String department;

	private String account;

	private String password;

	private String trueName;

	private String ctype;

	private String email;

	private String faxExtension;

	private String telbiz;

	private String mobile;

	private String locked;

	private Date createTime;

	private Date updateTime;

	public String getCid() {
		return cid;
	}

	public void setCid(String cid) {
		this.cid = cid;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public String getAccount() {
		return account;
	}

	public void setAccount(String account) {
		this.account = account;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getTrueName() {
		return trueName;
	}

	public void setTrueName(String trueName) {
		this.trueName = trueName;
	}

	public String getCtype() {
		return ctype;
	}

	public void setCtype(String ctype) {
		this.ctype = ctype;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getFaxExtension() {
		return faxExtension;
	}

	public void setFaxExtension(String faxExtension) {
		this.faxExtension = faxExtension;
	}

	public String getTelbiz() {
		return telbiz;
	}

	public void setTelbiz(String telbiz) {
		this.telbiz = telbiz;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getLocked() {
		return locked;
	}

	public void setLocked(String locked) {
		this.locked = locked;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Date getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}
 
}
