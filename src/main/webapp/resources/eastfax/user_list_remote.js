Ext.BLANK_IMAGE_URL = CTX+'resources/libraries/ext_v2.2.1/resources/images/default/s.gif';
Ext.onReady(function() {
	Ext.QuickTips.init();// 浮动信息提示
	
	//------------------------------------------------------------------------------
	/*
	var proxy = new Ext.data.HttpProxy({
		url : CTX+'user/mgnt/list.do?r_queryUserList'
	});// 获取Jason格式数据，后面已给出完整代码
	var reader= new Ext.data.JsonReader({
		totalProperty : 'total',
		root : 'rows',
		id:'cid'
	}, [
	    {name : "cid"},
		{name : "department"},
		{name : "account"},
		{name : "password" },
		{name : "trueName"},
	    {name : "ctype" },
		{name : "email"}
	]);
	// 定义数据源，构造store
	var store = new Ext.data.Store({
		//proxy : scriptTagProxy,
		proxy : proxy,
		reader : reader
	});
	//store.setDefaultSort("account", "ASC"); //设置默认的排序列和方向
	// 加载数据
	var pageSize = 20;
    store.load({
		params : {
			start : 0,
			limit : pageSize
		}
	});
	*/
	//---------------------------------------------------------------------------
    //获取sign
	// http://localhost/api/demo/sign.php?app_key=demo&app_secret=33B2D903C6D8A2A23D2064C9391344B1&method=eastfax.user.listNoLogin&format=json&sign=&departid=&serverid=
	// app_key,app_secret,method,format,sign,departid,serverid
	//
	//获取数据
	// http://localhost/api/EastFaxWebAPI.php?app_key=demo&method=eastfax.user.listNoLogin&format=json&sign=8AAE36999CD5A19FDD87820319CAA677&departid=&serverid=
	//var params = ['app_key','app_secret','method','format','sign','departid','serverid','callback'];
	//----获取sign--------------------------------------------------------------------
	Parameter = function(name,value){
	    this.name=name;
	    this.value=value;
	};
	
	function getParamsUrl(params){
		console.log("排序前");
		console.log(params);
		params.sort(compareParameter);
		console.log("排序后");
		console.log(params);
		
		var paramsStr = "";
		for (var i=0;i<params.length;i++) {
			if(i==params.length-1){
				paramsStr =paramsStr+params[i].name+"="+params[i].value;
			}else{
				paramsStr =paramsStr+params[i].name+"="+params[i].value+"&";
			}
		}
		return paramsStr;
		
	}
	
	function compareParameter(p1,p2){
	    if(p1.name===p2.name){
	    	return 0;
	    }else if(p1.name > p2.name){
	    	return 1;
	    }else if(p1.name < p2.name){
	    	return -1;
	    }
	}
	//--------------------------------------------------------------------------------------------------
	
	
	
	
	var  SIGN_URL = "http://localhost/api/demo/sign.php?";
	var  params =[new Parameter('app_key',''),
	                  new Parameter('app_secret','33B2D903C6D8A2A23D2064C9391344B1'),
	                  new Parameter('method','eastfax.user.listNoLogin'),
	                  new Parameter('format','json'),
	                  new Parameter('sign',''),
	                  new Parameter('departid',''),
	                  //new Parameter('callback',''),
	                  new Parameter('serverid','')];

	var requestUrl = SIGN_URL + getParamsUrl(params);
	
	console.log(requestUrl);
	alert("kuyuqngqiu")
	var ss = new Ext.data.ScriptTagProxy({
		    url: requestUrl,
		    callbackParam: "_callback",
		    //headers: { 'Authorization': 'Basic YWRtaW46YWRtaW4xMjM=' }
		});
	
	
	Ext.Ajax.request({
		url : requestUrl,
		method : 'GET',
		//scriptTag: true,
		cors: true,
		success : function(response, parameter) {
			alert(response.responseText);
		},
		failure : function(response, parameter) {
			Ext.MessageBox.hide();
			Ext.MessageBox.show({
				title : '错误',
				msg : '获取sign失败！',
			});
		}
	});
	alert("执行后");

	
	var proxy = new Ext.data.ScriptTagProxy({
		url : 'http://localhost/api/EastFaxWebAPI.php?app_key=demo&method=eastfax.user.listNoLogin&format=json&sign=8AAE36999CD5A19FDD87820319CAA677&departid=&serverid='
     });
	// 定义reader
	var reader = new Ext.data.JsonReader({
		totalProperty : 'total_results',
		root : 'user_item',
		id:'cid'
	}, [
	    {name : "cid"},
		{name : "department"},
		{name : "account"},
		{name : "password" },
		{name : "trueName"},
	    {name : "ctype" },
		{name : "email"}
	]);
	// 定义数据源，构造store
	var store = new Ext.data.Store({
		proxy : proxy,
		reader : reader
	});
	// 加载数据
	var pageSize = 20;
	store.load();
	
	
	
	
	
	//----------------------------------------------------------------------------------------------------------------------------------
	//----------------------------------------------------------------------------------------------------------------------------------
	// 定义复选框
	var sm = new Ext.grid.CheckboxSelectionModel({
		singleSelect : false // 设置复选框只能单选/多选
	}); 
	// 定义一个表格面板
	var grid = new Ext.grid.GridPanel({
		id : 'usergrid',// 设置标示ID，方便以后引用
		title : '用户信息管理',
		renderTo : "UserGrid", // 显示表格的地方，与div要一致
		store : store,// 数据源
		height : 550,
		width : 1000,
		sm : sm,// 复选框
		columns : [ sm, new Ext.grid.RowNumberer({
			header : "序号",
			width : 30,
			align : 'center'
		}),// 添加一个编号
		{
			header : "cid",
			width : 100,
			dataIndex : 'cid',
			sortable : true,
			align : 'center',
			hidden : false
		}, {
			header : "account",
			//hidden : true,
			dataIndex : 'account',
			sortable : true,
			align : 'center'
		},  {
			header : "department",
			dataIndex : 'department',
			sortable : true,
			align : 'center'
		},{
			header : "password",
			dataIndex : 'password',
			sortable : true,
			align : 'center'
		}, {
			header : "truename",
			dataIndex : 'trueName',
			sortable : true,
			align : 'center'
		}, {
			header : "ctype",
			dataIndex : 'ctype',
			sortable : true,
			align : 'center'
		}, {
			header : "email",
			//hidden : true,
			dataIndex : 'email',
			sortable : true,
			align : 'center'
		}],
		stripeRows : true,// 加上行条纹
		loadMask : true,// 加载数据时遮蔽表格
		border : true,// 加上边框
		frame : true,// 显示天蓝色圆角框
		autoScroll : true,// 显示滚动条
		// 定制用户界面(UI视图配置)
		viewConfig : {
			forceFit : true// 强制适应分布宽度
		},
		// 表格顶部的动作或按钮工具栏
		tbar : new Ext.Toolbar({
			items : [ {
				id : 'btnAdd',
				text : '新增数据',
				tooltip : '新增一条数据',
				//icon : "../images/add.gif",
				cls : "x-btn-text-icon",
				handler : onbtnAdd
			}, '-', {
				id : 'btnEdit',
				text : '编辑数据',
				tooltip : '编辑一条数据',
				//icon : "../images/edit.gif",
				cls : "x-btn-text-icon",
				handler : onbtnEdit
			}, '-', {
				id : 'btnCancel',
				text : '删除数据',
				tooltip : '删除一条数据',
				//icon : "../images/delete.gif",
				cls : "x-btn-text-icon",
				handler : onbtnDelete
			}, '-',// new Ext.Toolbar.Fill(),'-',//充满组件把之后的顶到最右边
			'帐号：', {
				fieldLabel : '搜索',
				xtype : 'textfield',
				id : 'search',
				name : 'search',
				// blankText:'搜索内容不能为空...',
				width : 200
			}, {
				id : 'btnSearch',
				text : '搜索',
				tooltip : '搜索数据',
				//icon : "../images/search.png",
				cls : "x-btn-text-icon",
				handler : onbtnSearch
			}, {
				id : 'btnGetData',
				text : '获取',
				tooltip : '获取数据',
				//icon : "../images/search.png",
				cls : "x-btn-text-icon",
				handler : onBtnGetData
			}]
		}),
		// 表格底部的分页工具栏,暂未实现分页
		bbar : new Ext.PagingToolbar({
			pageSize : pageSize,
			store : store,
			displayInfo : true,
			displayMsg : '当前:{0}-{1}条，共{2}条数据',
			emptyMsg : "没有记录"
		}),
	});
	

	//获取用户表单
	function getUserForm(){
		// 用户信息表单
		var userForm = new Ext.FormPanel({
			layout : 'form',
			labelWidth : 150,
			frame : true,
			width : 350,
			height : 300,
			bodyStyle : 'margin:5px 5px 5px 5px',
			//这个对象将被添加到所有加入这个容器的组件中，通过 items 注册，或者通过 add 方法，或者 insert 方法
			defaults : {
				xtype : 'textfield',
				width : 150
			},
			items : [new Ext.form.Hidden({//隐藏项  
                name:'cid',  
                fieldLabel:'cid'  
            }), {
				fieldLabel : 'Account<font color=red>*</font>',
				name : 'account',
				allowBlank : false // 不允许为空
			},{
				fieldLabel : 'Department<font color=red>*</font>',
				name : 'department',
				allowBlank : false // 不允许为空
			}, {
				fieldLabel : 'Password<font color=red>*</font>',
				name : 'password',
				allowBlank : false, // 不允许为空
				inputType : 'password'
			}, {
				fieldLabel : 'TrueName<font color=red>*</font>',
				name : 'trueName',
				allowBlank : false // 不允许为空
			}, {
				xtype : 'combo',
				fieldLabel : 'ctype<font color=red>*</font>',
				store : [ 'user', 'admin' ],
				name : 'ctype',
				allowBlank : false, // 不允许为空
				mode : 'local',
				readOnly : false,
				forceSelection : true,
				triggerAction : 'all',
				editable : false
			}, {
				fieldLabel : 'Email<font color=red>*</font>',
				name : 'email',
				allowBlank : false// 不允许为空
			   } ]
		});
		return userForm;
	}
	
	// 添加用户数据
	function onbtnAdd() {
		var userForm = getUserForm();
		var addwin = new Ext.Window({
			title : '添加用户',
			width : 400,
			height : 300,
			// minimizable:true,
			// maximizable:true
			layout : 'form',
			frame : true,
			buttonAlign : 'center',
			modal : true,// 模式窗口，弹出窗口后屏蔽掉其他组件
			plain : true,
			closeAction : 'close',// window的关闭方式
			// resizable:false,//是否可以调整窗口大小，默认true
			items : userForm,
			buttons : [ {
				text : '保存',
				handler : function() {
					if (userForm.form.isValid()) {
						Ext.MessageBox.show({
							msg : '保存数据，请稍等...',
							progressText : '保存',
							width : 300,
							wait : true,
							waitConfig : {
								interval : 200
							},
						});
						// 使用BasicForm的submit方式进行ajax的异步提交
						userForm.getForm().submit({
							url : CTX+'user/mgnt/list.do?c_saveUser', // 新增记录
							method : 'POST',
							success : function(form, action) {
								console.log(action);
								Ext.MessageBox.hide();
								Ext.MessageBox.alert('成功', '保存成功!');
								addwin.hide();
								store.reload({params : { start : 0, limit : pageSize}});
								//store.load();
							},
							failure : function(form, action) {
								console.log(action);
								Ext.MessageBox.hide();
								Ext.MessageBox.show({
									title : '错误',
									msg : action.result.error_info,
									buttons : Ext.Msg.OK
								});

							}
						});
					} else {
						Ext.Msg.alert('系统提示', '请检查输入是否正确！')
					}
				}
			}, {
				 text:'重置',
				 handler:function(){userForm.getForm().reset();}
				 },{
				text : '取消',
				handler : function() {
					addwin.hide();
				}
			} ]
		});
		addwin.show();
		userForm.getForm().reset();// 需重复使用window，应先重置
		userForm.getForm().findField('cid').getEl().dom.readOnly = true;
	}


	// 编辑用户数据
	function onbtnEdit() {
		var userForm = getUserForm();
		var selectedRecord = grid.getSelectionModel().getSelected();
		if (selectedRecord == null || selectedRecord == undefined) {
			Ext.MessageBox.alert('提示', '请选择一条记录！');
		} else {
			var editwin = new Ext.Window({
				title : '编辑用户信息',
				frame : true,
				plain : true,
				modal : true,
				buttonAlign : 'center',
				bodyStyle : 'padding:4px',
				width : 400,
				height : 300,
				layout : 'form',
				labelwidth : 45,
				closeAction : 'hide',// window的关闭方式
				items : userForm,
				buttons : [ {
					text : '保存',
					id : 'btnSave',
					// 保存事件
					handler : function() {
						if (userForm.form.isValid()) {
							Ext.MessageBox.show({
								msg : '保存数据，请稍等...',
								progressText : '保存',
								width : 300,
								wait : true,
								waitConfig : {
									interval : 200
								},
							// icon:
							});
							// 使用BasicForm的submit方式进行ajax的异步提交
							userForm.getForm().submit({
								url : CTX+'user/mgnt/list.do?u_updateUser', 
								method : 'POST',
								//form : Ext.form.BasicForm  The form that requested the action
								//action : Ext.form.Action  The result property of this object may be examined to perform custom postprocessing.
								success : function(form, action) {
									console.log(action.result);
									Ext.MessageBox.hide();
									Ext.MessageBox.alert('成功', '修改成功!');
									store.reload();
									editwin.hide();
								},
								failure : function(form, action) {
									console.log(action.result);
									Ext.MessageBox.hide();
									Ext.MessageBox.show({
										title : '错误',
										msg : action.result.error_info,
										buttons : Ext.Msg.OK
									});
								}
							});
						} else {
							Ext.Msg.alert('系统提示', '请检查输入是否正确！')
						}
					}// ////
				}, {
					text : '取消',
					handler : function() {
						editwin.hide();
					}
				} ]
			});
			editwin.show();
			userForm.getForm().loadRecord(selectedRecord);
			userForm.getForm().findField('cid').getEl().dom.readOnly = true;
		}
	}
	// 删除用户数据
	function onbtnDelete() {
		//var selectedRecord = grid.getSelectionModel().getSelected();//获取单选selectedRecord.data.cid
		//var selectedRecords = grid.getSelectionModel().getSelections();//getSelections();//获取多选
		var userIds = grid.selModel.selections.keys;//获取多选的记录的ID集合,此Id在reader中可以设置
		
		console.log(userIds);
		if (userIds.length==0 || userIds == null || userIds == undefined) {
			Ext.MessageBox.alert('提示', '请选择一条记录！');
		} else {
			Ext.MessageBox.confirm('提示', '确定删除这条记录吗?', function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
						url : CTX+'user/mgnt/list.do?d_batchDeleteUser',
						method : 'POST',
						params : {
							userIds : userIds
						},
						success : function(response , parameter) {
							console.log(response);//服务器返回的结果
							var result = Ext.util.JSON.decode(response.responseText);
							console.log(result);
							if(result.success){
								//Ext.example.msg('成功', '删除成功!');
								Ext.MessageBox.show({ title : '成功', msg : "删除成功!" });
								store.reload();
							}else{
								//Ext.example.msg('错误', '删除失败!');
								Ext.MessageBox.show({ title : '错误', msg : "删除失败!" });
							}
							
						},
						failure : function() {
							//Ext.example.msg('错误', '删除中有错误发生!');
							Ext.MessageBox.show({ title : '错误', msg : '删除中有错误发生！', });
						}
					});
				}
			});
		}
	}

	// 搜索用户
	function onbtnSearch() {
		searchValue = Ext.getCmp('search').getValue().trim();// 获取搜索框里输入的值
		Ext.MessageBox.show({
			msg : '正在查询用户信息，请稍等...',
			progressText : '查询',
			width : 300,
			wait : true,
			waitConfig : {
				interval : 200
			},
		});
		
		Ext.Ajax.request({
			url : CTX+'user/mgnt/list.do?r_queryUserList',
			method : 'POST',
			params : {
				account : searchValue
			},
			success : function(response, parameter) {
				console.log(response);
				Ext.MessageBox.hide();//信息提示隐藏
				var result = Ext.util.JSON.decode(response.responseText);
				if (result.success) {
					store.filter('account', searchValue);
					//Ext.MessageBox.alert('提示', '没有符合条件的用户！');
				} else {
					console.log(result.error_info)
				}
			},
			failure : function(response, parameter) {
				Ext.MessageBox.hide();
				Ext.MessageBox.show({
					title : '错误',
					msg : '搜索请求失败！',
				});
			}
		});
		
	}
	
	function onBtnGetData(){
		Ext.MessageBox.show({
			msg : '正在获取用户信息，请稍等...',
			progressText : '获取',
			width : 300,
			wait : true,
			waitConfig : {
				interval : 200
			},
		});
		//获取sign
		// http://localhost/api/demo/sign.php?app_key=demo&app_secret=33B2D903C6D8A2A23D2064C9391344B1&method=eastfax.user.listNoLogin&format=json&sign=&departid=&serverid=
		//获取数据
		// http://localhost/api/EastFaxWebAPI.php?app_key=demo&method=eastfax.user.listNoLogin&format=json&sign=8AAE36999CD5A19FDD87820319CAA677&departid=&serverid=
		
		Ext.Ajax.request({
			url : CTX+'user/mgnt/list.do?r_queryUserList',
			method : 'POST',
			params : {
				account : searchValue
			},
			success : function(response, parameter) {
				console.log(response);
				Ext.MessageBox.hide();//信息提示隐藏
				var result = Ext.util.JSON.decode(response.responseText);
				if (result.success) {
					store.filter('account', searchValue);
					//Ext.MessageBox.alert('提示', '没有符合条件的用户！');
				} else {
					console.log(result.error_info)
				}
			},
			failure : function(response, parameter) {
				Ext.MessageBox.hide();
				Ext.MessageBox.show({
					title : '错误',
					msg : '搜索请求失败！',
				});
			}
		});
	}
});