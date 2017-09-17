 
	/* var myData = {
		"user_list_response" : {
			"total_results" : "4",
			"user_items" : {
				"user_item" : [ {
					"cid" : "2",
					"department" : "1",
					"account" : "test",
					"password" : "81DC9BDB52D04DC20036DBD8313ED055",
					"truename" : "test",
					"ctype" : "local",
					"email" : "",
					"faxextension" : "",
					"telbiz" : "",
					"mobile" : "",
					"locked" : "0",
					"createtime" : "1489154612",
					"updatetime" : "1489154626"
				}, {
					"cid" : "3",
					"department" : "2",
					"account" : "aaa",
					"password" : "81DC9BDB52D04DC20036DBD8313ED055",
					"truename" : "aaa",
					"ctype" : "local",
					"email" : "",
					"faxextension" : "",
					"telbiz" : "",
					"mobile" : "",
					"locked" : "0",
					"createtime" : "1489154700",
					"updatetime" : "1489154701"
				}, {
					"cid" : "4",
					"department" : "2",
					"account" : "bbb",
					"password" : "81DC9BDB52D04DC20036DBD8313ED055",
					"truename" : "bbb",
					"ctype" : "local",
					"email" : "",
					"faxextension" : "",
					"telbiz" : "",
					"mobile" : "",
					"locked" : "0",
					"createtime" : "1489154718",
					"updatetime" : "1489154719"
				}, {
					"cid" : "5",
					"department" : "2",
					"account" : "ccc",
					"password" : "81DC9BDB52D04DC20036DBD8313ED055",
					"truename" : "ccc",
					"ctype" : "local",
					"email" : "",
					"faxextension" : "",
					"telbiz" : "",
					"mobile" : "",
					"locked" : "0",
					"createtime" : "1489154732",
					"updatetime" : "1489154733"
				} ]
			}
		}
	}; */


		

Ext.onReady(function(){	
    function successFn(val){
        console.log(val);
    }
    function failureFn(val){
        console.log("world");
    }

	Ext.Ajax.request({
		   url: CTX+'user/mgnt/list.do?u_querUserReturnMap',
		   success: successFn,
		   failure: failureFn
		});

	 
		 var store = new Ext.data.JsonStore({  
		     url : CTX+'user/mgnt/list.do?r_queryUserList',
		     root : 'rows',
		     totalProperty:'total', 
		     fields : [
						{name : "cid"},
						{name : "department"},
						{name : "account"},
						{name : "password" },
						{name : "truename" },
					    {name : "ctype" },
						{name : "email"},
						{name : "faxextension" },
						{name : "telbiz" },
						{name : "mobile" },
						{name : "locked"},
						{name : "createtime" },
						{name : "updatetime"}
		              ],  
		     autoLoad : true  
		 }) 
		 //store.setDefaultSort('cid', 'desc');
		 var cm = new Ext.grid.ColumnModel({  
		        columns:[ {
					id : 'cid',
					header : "ID",
					sortable : true,
					dataIndex : 'cid'
				}, {
					header : "Department",
					sortable : true,
					dataIndex : 'department',
				}, {
					header : "Account",
					sortable : true,
					dataIndex : 'account',
				},{
					header : "Password",
					sortable : true,
					dataIndex : 'password',
				},{
					header : "TrueName",
					sortable : true,
					dataIndex : 'truename',
				},{
					header : "ctype",
					sortable : true,
					dataIndex : 'ctype',
				},{
					header : "email",
					sortable : true,
					dataIndex : 'email',
				},{
					header : "faxextension",
					sortable : true,
					dataIndex : 'faxextension',
				},{
					header : "telbiz",
					sortable : true,
					dataIndex : 'telbiz',
				},{
					header : "mobile",
					sortable : true,
					dataIndex : 'mobile',
				},{
					header : "locked",
					sortable : true,
					dataIndex : 'locked',
				},{
					header : "createtime",
					sortable : true,
					dataIndex : 'createtime',
				},{
					header : "updatetime",
					sortable : true,
					dataIndex : 'updatetime',
				}
				]
		    });  
	 
	        //store.load();
			var grid = new Ext.grid.GridPanel({
				id: 'gridPanel',
				store : store,
				cm :cm,
				autoHeight:true
			});
	
	
    
	
	/*var store = new Ext.data.Store({  
		 proxy:new Ext.data.HttpProxy({url:CTX+'user/mgnt/list.do?u_querUserReturnMap',}),  
		 reader:new Ext.data.JsonReader({  
		   totalProperty:'result',  
		   root:'rows'  
		  },  
		  [  
		   {name:'id'},           
		   {name:'firstname'},    
		   {name:'occupation'} 
		  ]  
		 ),  
		 softInfo:{field:'id',direction:'DESC'}//排序  
		});  */
	
	/*var grid = new Ext.grid.GridPanel({  
		 autoWidth:true,  
		 height:300,  
		 columns:[ {
				id : 'id',
				header : "ID",
				sortable : true,
				dataIndex : 'id'
			}, {
				header : "Author",
				sortable : true,
				dataIndex : 'firstname'
			}, {
				header : "Occupation",
				sortable : true,
				dataIndex : 'occupation'
			} ],
		 loadMask:{msg:'正在加载中,请稍后..'},
		 store:store  
		});  */
	
	//---------------------------------------------------------------
	  /*
	  var store = new Ext.data.JsonStore({  
		    //url: CTX+'resources/test.json',  
		    url:CTX+'user/mgnt/list.do?u_querUserReturnMap', 
		    root: 'rows',  
		    autoLoad: true,  
		    fields:  [
						{name : 'id',mapping:'id'},
						{name : 'firstname',mapping:'firstname'},
						{name : 'occupation',mapping:'occupation'}  
		              ] 
		    });  
		  
		    var columns = new Ext.grid.ColumnModel({  
		        columns:[ {
					id : 'id',
					header : "ID",
					width : 160,
					sortable : true,
					dataIndex : 'id'
				}, {
					header : "Author",
					width : 120,
					dataIndex : 'firstname',
					sortable : true
				}, {
					header : "Occupation",
					width : 180,
					dataIndex : 'occupation',
					sortable : true
				}
	
				]
		    });  
		      
		    var grid = new Ext.grid.GridPanel({  
		        id: 'gridPanel',  
		        title     : 'Person Info Panel',  
		        width     : 250,  
		        height    : 250,  
		        store     : store,  
		        colModel  : columns           
		    });      
		  */
		  //---------------------------------------------------------------
	
		grid.render('grid-example');
	});