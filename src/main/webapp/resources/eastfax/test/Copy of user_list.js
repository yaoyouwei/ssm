
        //设置每页显示的行数默认为10

        var QUERY_PAGE_SIZE = 10;

        /**
        * SearchQueryForm():绘制查询表单
        */
        function searchQueryForm()
        {
         //form 使用的时候建议设为局部变量，可以通过Ext.getCmp(“”)去获取form

         var queryForm = null;
            queryForm = new Ext.FormPanel({
                id:'queryForm', //指定queryForm的Id
                renderTo:'searchPanel', //指向form所在的div层
                labelWidth:70, //label标签的width占页面的百分比
                region:'north',
                border:false, //以显示面板的body元素的边界，虚假隐藏起来（默认为true）
                badyBorder:false, //显示面板的body元素，假以隐藏它（默认为true的内部边界）
                labelAlign:'right', //label标签的对齐方式
                frame:true, //自定义面板的圆形边界，边界宽度1px。默认为false
                title:'用户信息查询', //form的标题
                
                /**
                *buttons:在FormPanel中按钮的集合
                */
                buttons:[{handler:addForm,text:'新增'},
                        {handler:submitForm,text:'查询'},
                        {handler:resetForm,text:'重置'}],
             /**
             * items: 在FormPanel中不可缺少的部分
             */
             items:[{
             /**
              * layout:extJs容器组件，可以设置它的显示风格
              * 它的有效值有absolute,accordion,anchor,border,card,fit,form and table 共9种
              */
                 layout:'column',
                 items:[
                     {
                         columnWidth:.5,
                         layout:'form',
                         items:{
                             name:'userId',
                             hiddenName:'userId',
                             xtype:'textfield',
                             fieldLabel:'用户编码',
                             maxLength:'50',
                             vtype:'specialChar',
                             anchor:'80%'
                         }
                     },{
                         columnWidth:.5,
                         layout:'form',
                         items:{
                             name:'userName',
                             hiddenName:'userName',
                             xtype:'textfield',
                             fieldLabel:'用户名称',
                             maxLength:'100',
                             vtype:'specialChar',
                             anchor:'80%'
                         }
                     }
                 ]
             }]
            });
        }
        /**
        * showUserForm():绘制添加表单
        */
        function showUserForm()
        {
         //将变量定义成局部变量，避免每次都生成一个新对象

            var userForm = null;
            userForm = new Ext.FormPanel({
                id:'conditionForm',
                labelWidth:'80',
                labelAlign:'right',
                border:false,
                bodyBorder:false,
             frame:true,
             items:{
                 layout:'column',
                 items:[
                 {
                     columnWidth:'.8',
                     items:{
                         name:'userInfo.userId',
                         hiddenName:'userInfo.userId', //hiddenName动态的绑定数据库中对应的字段
                         xtype:'textField', //xtype可以分为三类,textField为表单域的控件
                         fieldLabel:'用户编码<font color=red>*</font>',//控件前的文本说明
                         labelSeparator:'',
                         blankText : '填写用户编码', //为空的文本框提示信息
                         allowBlank:false,      //不允许为空
                         maxLength:'50',      //文本框允许输入的最大的长度,最小的minLength
                         vtype:'specialChar',
                         anchor:'80%'
                     }
                 },{
                     columnWidth:'.8',
                     items:{
                         name:'userInfo.userName',
                         hiddenName:'userInfo.userName',
                         xtype:'textField',
                         fieldLabel:'用户姓名<font color=red>*</font>',
                         labelSeparator:'',
                         blankText:'填写用户姓名',
                         allowBlank:false,
                         maxLength:'100',
                         vtype:'specialChar',
                         anchor:'100%'
                     }
                 },{
                     columnWidth:'.8',
                     items:{
                         name:'userInfo.pwd',
                         hiddenName:'userInfo.pwd',
                         xtype:'textField',
                         inputType:'password',
                         fieldLabel:'用户密码<font color=red>*</font>',
                         labelSeparator:'',
                         blankText:'填写用户密码',
                         allowBlank:false,
                         maxLength:'12',
                         minLength:'6',
                         value:'123456', //用户默认的秘密
                         anchor:'100%'
                     }
                 },{
                     columnWidth:'.8',
                     items:{
                         name:'rPwd',
                         hiddenName:'rPwd',
                         xtype:'textField',
                         inputType:'password',
                         fieldLabel:'确认密码<font color=red>*</font>',
                         labelSeparator:'',
                         blankText:'二次输入的秘密要相同',
                         allowBlank:false,
                         vtype:'pwdRange',
                         pwdRange:{begin:'userInfo.pwd',end:'rPwd'},
                         maxLength:'12',
                         anchor:'100%'
                     }
                 }]
             }
            });
        }
        /**
        * editUserForm():绘制修改表单
        */
        function editUserForm(){
            //将变量定义成局部变量，避免每次都生成一个新对象

            var userForm = null;
            userForm = new Ext.FormPanel({
                id:'editForm',
                labelWidth:'80',
                labelAlign:'right',
                border:false,
                bodyBorder:false,
             frame:true,
             items:{
                 layout:'column',
                 items:[
                 {
                     columnWidth:'.8',
                     items:{
                         name:'userInfo.userId',
                         hiddenName:'userInfo.userId', //hiddenName动态的绑定数据库中对应的字段
                         xtype:'textField', //xtype可以分为三类,textField为表单域的控件
                         fieldLabel:'用户编码', //控件前的文本说明
                         labelSeparator:':',
                         readOnly:true, //文本框只读
                 disabled:true, //文本框灰色,区别与其他的文本框颜色
                         blankText : '填写用户编码', //为空的文本框提示信息
                         allowBlank:false,      //不允许为空
                         maxLength:'50',      //文本框允许输入的最大的长度,最小的minLength
                         //字母开头，且只能存在字母与数字长度为2到12位

                         regex : /^[a-zA-Z]{1}([a-zA-Z0-9]|[_]){1,11}$/,
                 regexText : '用户编码必须以字母开头,长度2-12位!',
                         anchor:'90%'
                     }
                 },{
                     columnWidth:'.8',
                     items:{
                         name:'userInfo.userName',
                         hiddenName:'userInfo.userName',
                         xtype:'textField',
                         fieldLabel:'用户姓名',
                         labelSeparator:':',
                         blankText:'填写用户姓名',
                         allowBlank:false,
                         maxLength:'100',
                         //只含有汉字、数字、字母、下划线不能以下划线开头和结尾
                         regex : /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/,
                         regexText : '只含有汉字、数字、字母、下划线不能以下划线开头和结尾!',
                         anchor:'90%'
                     }
                 },{
		             columnWidth:'.2',
			         items:{
			         hiddenName:"infoFill",
			         name:"infoFill",
			         xtype:'label',
			         html:'<font color=red>*</font>',
			         labelSeparator:'',
			         anchor:'100%'
		         }
	             },{
		             columnWidth:'.8',
		             items:{
		                 name:'userInfo.pwd',
		                 hiddenName:'userInfo.pwd',
		                 xtype:'textField',
		                 inputType:'password',
		                 fieldLabel:'用户密码<font color=red>*</font>',
		                 labelSeparator:':',
		                 blankText:'填写用户密码',
		                 allowBlank:false,
		                 maxLength:'12',
		                 minLength:'6',
		                 anchor:'90%'
	             }
                 },{
                  columnWidth:'.2',
			         items:{
			     hiddenName:"infoFill",
			         name:"infoFill",
			         xtype:'label',
			         html:'<font color=red>*</font>',
			         labelSeparator:'',
			         anchor:'100%'
			         }
                 },{
                     columnWidth:'.8',
                     items:{
                         name:'rPwd',
                         hiddenName:'rPwd',
                         xtype:'textField',
                         inputType:'password',
                         fieldLabel:'确认密码<font color=red>*</font>',
                         labelSeparator:':',
                         blankText:'二次输入的秘密要相同',
                         allowBlank:false,
                         //在extCommon.js文件中定义二次输入的密码相同验证pwdRange

                         // vtype为验证的方法，如果是通用的验证，请在方法中定义，如果是特例，可以使用regex
                         vtype:'pwdRange',
                         pwdRange:{begin:'userInfo.pwd',end:'rPwd'},
                         maxLength:'12',
                         anchor:'90%'
                     }
                 },{
                  columnWidth:'.2',
         items:{
     hiddenName:"infoFill",
         name:"infoFill",
         xtype:'label',
         html:'<font color=red>*</font>',
         labelSeparator:'',
         anchor:'100%'
         }
                 }]
             }
            });
        }
        /**
        * onReady:该文件准备好(在onload和图像加载之前)
        */
        Ext.onReady(function(){

            searchQueryForm();
            //获取查询form

            var queryForm = Ext.getCmp("queryForm").getForm();
         /**
         * layout设置为border表示页面将划分为东南西北中五个部分
         * 这里表示centerPanel放在中间
         */
            var layout = new Ext.Viewport({
                layout:'border',
                defaluts:{border:false,bodyBorder:false,activeTab:0},
          items:[queryForm,{id:'centerPanel',region:'center',height:document.body.clientHeight,contentEl:'mainDiv'}]
            });
            //页面加载的时候，默认数据查询页面显示用户信息列表

            submitForm();
        });

        //查询信息
        var store = new Ext.data.Store({
            url:'../user/doGetPageList.action', //action的路径
            reader:new Ext.data.JsonReader({
                root:'userList', //从struts2.0里面传递过来的参数:用户的集合
                totalProperty:'rowTotal', //从struts2.0里面传递过来的参数:总共的信息的行数
                id:'userId',
                successPropery:'success'},
                ['userId','userName','pwd']
            )
        });

        /**
        * callback:调用的函数
        */
        function getMsg()
        {

        }
        /**
        * 模糊查询
        */
        function submitForm()
        {
         //初始化grid
            var grid = null;
            //复选框
            var sm = new Ext.grid.CheckboxSelectionModel({
                dataIndex:'id',
                width:'20'
            });
            /**
         *  sortabel:（可选）如果真要排序允许在此列
         *  renderer:（可选）用于生成给定数据值单元格的HTML标记的功能。如果没有指定，默认渲染器使用的原始数据值。
         * 在renderer:function createButton(参数)这里的参数可以没有或多个
         *  鼠标移动图片上变成"手"是:style="cursor:hand"
         */
            var colM = new Ext.grid.ColumnModel(
                [sm,{header:'用户账号',dataIndex:'userId',align:'center',sortable:true},
                {header:'用户姓名',dataIndex:'userName',align:'center',sortabel:true},
                {header:'删除',dataIndex:'id',align:'center',renderer:function createButton(){
                    return '<img alt="删除" style="cursor:hand" style="cursor:hand" src="../images/hh_framework/ico_delete.gif" src="images/hh_framework/ico_delete.gif" />';}},
                {header:'编辑',dataIndex:'userId',align:'center',renderer:function createButton(userId, metadata, record){
                    return '<a style="cursor:hand" style="cursor:hand" onclick=updateForm('+userId+') >'+record.get('userName')+'的信息修改'+'</a>';}}]
            );

         //获取查询表单

            var form = Ext.getCmp("queryForm").getForm();

            //判断是否通过验证，如果没有请直接关闭
            if(!form.isValid())
            {
                Ext.Msg.alert("系统提示","查询数据不正确，请确认输入!");
                return ;
            }
            //差选queryform中查询的数据参数

            store.baseParams = form.getValues();
            /**
            * getLimitCount():获取分页每页行数,如果不传值，则会取默认值
            * Start表示读取数据的起始位置、limit表示每次读取多少条数据
            * callback:getMsg 表示回调时，执行函数 getMsg。可省略
            */

            store.load({params:{start:0,limit:getLimitCount()}, callback:getMsg});
            if(grid == null)
            {
                grid = new Ext.grid.EditorGridPanel({
                    renderTo:"mainDiv", //grid查询结果指向显示的div层
                    title:"用户查询结果", //grid标题
                    width:document.body.clientWidth, //设置grid的width的值
                    hight:document.doby.clientHight-100,//设置hight的值
                    viewConfig:{forceFit:true}, //设置列数的充满窗口
                    loadMask:true,                //在加载数据时的遮罩效果
                    stripeRows:true, //隔行换色
                    region:'center', //这个是设置在ViewPort中显示的位置
                    cm:colM, //定义的列
                    ds:store, //定义的数据源
                    border:false,
                    bodyBorder:false,
                    sm:sm, //定义的复选框

                    //listeners:包含一个或多个事件处理程序被添加到这个对象初始化过程中

                    listeners:{cellclick:renderPage},
                    /**
                 * bbar: new Ext.PagingToolbar部分是定义分页工具栏，
                 * 这里的分页控件栏还用到了1个自己定义的插件，就是可以选择每页显示多少条的
                    * plugins : [new Ext.ux.PageSizePlugin()],参考Ext的API
                 * 要实现分页，后台必须有total属性，表示共多少条数据
                 */

                    bbar:new Ext.PagingToolbar({
                        items:[{
                            xtype:'button',
                            text:'删除所选',
                            handler:delUserAll, //自定义执行动
                            pressed:true
                        }],
                        id:'pageToolBar',
                        pageSize:QUERY_PAGE_SIZE, //每页的行数默认为：QUERY_PAGE_SIZE
                        store:store,
                        displayInfo:true,
                        displayMsg:'显示第{0}条到{1}条记录，共{2}条记录',
                        emptMsg:'没有记录',
                        plugins:[new Ext.ux.PageSizePlugin()]
                    })
                });
            }
            grid.render();
        }
        /**
        * 增加用户信息
        */
        function addForm()
        {
            showUserForm();
            //获取绘制用户窗口的form

            var userForm = Ext.getCmp("conditionForm").getForm();
            //初始化用户添加的窗口的Id

            var addUserWin = Ext.getCmp("addWin");
            if(addUserWin == null)
            {
                addUserWin = new Ext.Window({
                    width:500, //初始窗口的width的值
                    x:100, //窗口的初始化x方向的位置
                    y:100, //窗口的初始化y方向的位置
                    plain:true,
                    modal:true, //模式窗口,默认为false
                    closeAction:"hide", //默认窗口隐藏
                    resizable:false, //窗口的大小不允许拖动,默认为true
                    id:"addWin", //指定用户添加窗口的Id
                    items:[userForm],
                    buttons:[
                 {text:'保存',handler:function(){
                     if(userForm.form.isValid()){
                      userForm.form.doAction('submit',{
                             url:'../user/addUser.action',
                             params:{roleId:userForm.form.findField('userId').getValue()},
                             method:'post', //数据提交的方式：有两种get,post
                             waitTitle:'提示信息', //数据提交等待的滚动条
                             waitMsg:'保存数据,请稍候...', //滚动条提示的内容
                          success:function(form,action){
                          var message = action.result.message;
                              if(message == null){
                              Ext.Msg.alert("提示信息","用户信息添加成功!");
                              store.reload();
                              addUserWin.hide();
                              }else{
                              Ext.Msg.alert("提示信息",message);
                              }
                          },
             failure:function(form,action){
             Ext.Msg.alert('提示信息',"新用户添加失败！");
             return;
             }
             });
                 }else {
                     Ext.Msg.alert("提示信息","表单有错误,请正确填写!");
                 }
                 }},
                 {handler:function(){userForm.form.reset();},text:'重置'},
                 {handler:function(){addUserWin.hide();},text:'关闭'}]
                });
            }
            addUserWin.show();
        }
        /**
        * 删除用户信息
        */
        function delForm(userId)
        {
            Ext.Msg.confirm('提示信息','你确定要执行删除操作吗?',function(btn){
                if(btn == 'yes')
                {
                     /**
                 * 数据提交的一种方式：Ext.Ajax.request({});
                 */
                    Ext.Ajax.request({
                        url:'../user/delUser.action',
                        params:{userId:userId},
                        method:'post',
                        success:function(o)
                        {
                            var info = Ext.decode(o.responseText);
                            Ext.Msg.alert("提示信息",info.message);
                            store.reload();
                            return ;
                        },
                        failure:function(form,action)
                        {
                            Ext.Msg.alert("提示信息","用户信息删除失败!");
                            return ;
                        }
                    });
                }
            });
        }
        /**
        * 批量删除事件
        */
        function delUserAll()
        {
         //grid中复选框被选中的项

             var rows = grid.getSelectionModel().getSelections();
             //user_id：所有选中的用户Id的集合使用','隔开，初始化为空

             var user_id = '';
         for(var i = 0;i<rows.length;i++)
         {
             if(i>0)
             {
                 user_id = user_id+','+rows[i].get('userId');
             }else{
                 user_id = user_id+rows[i].get('userId');
             }
         }
         //没有选择要执行操作的对象

             if(user_id == "")
             {
                 Ext.Msg.alert("提示信息","请选择要删除的对象");
                 return ;
             }else{
                 Ext.Msg.confirm("提示信息","请确定要执行删除操作吗?",function (btn){
                     if(btn == 'yes')
                     {
                         Ext.Ajax.request({
                             url:"../user/delAllUser.action",
                             params:{id:user_id},
                             method:'post',
                             success:function(o){
                                 var info = Ext.decode(o.responseText);
                                 Ext.Msg.alert("提示信息",info.message);
                                 store.reload();
                                 return ;
                             },
                             failure:function(form,action){
                                 Ext.Msg.alert("提示信息","用户信息删除失败!");
                             }
                         });    
                     }
                 });
             }
        }
        /**
        * 修改用户信息
        * 参数userId:修改对象的Id
        */
        function updateForm(userId)
        {
            editUserForm();

            var userForm = Ext.getCmp("editForm").getForm();
            Ext.Ajax.request({
                url:'../user/doGetOne.action',
                params:{userId:userId},
                method:'post',
                //从struts2.0里返回的参数

                success:function(o)
                {
                 //读取action传递过来的对象参数
                 //docode:解码（解析）一个JSON字符串对象

                    var user = Ext.decode(o.responseText);

                    //用户编辑窗口的打开

                    editUser(user);

                    //将对象信息显示在对应的form文本框中

                    userForm.form.findFiled('userInfo.userId').setValue(user.userInfo.userId);
                    userForm.form.findFiled('userInfo.userName').setValue(user.userInfo.userName);
                    userForm.form.findFiled('userInfo.pwd').setValue(user.userInfo.pwd);
                    userForm.form.findFiled('rPwd').setValue(user.userInfo.pwd);
                }
            });
        }
        /**
        * 用户信息编辑窗口
        */
        function editUser(user){
            var userForm = Ext.getCmp("editForm").getForm();
            //得到用户编辑的窗口的对象
            var editUserWin = Ext.getCmp("editWin");
            //当为空的时候将进行实例化

            if(editUserWin == null)
            {
                editUserWin = new Ext.Window({
             id:'editWin',
                width:500,
                x:100,
                y:100,
                modal:true,
                resizable:false,
                closeAction:"hide",
                title:'用户信息修改',
                items:[userForm],
                buttons:[
                    {text:'保存',handler:function(){
                        if(userForm.form.isValid())
                        {
                         /**
                         * 数据提交的第二种方式：form.doAction('submit',{});
                         */
                            userForm.form.doAction('submit',{
                                url:'../user/updUser.action',
                                params:{userId:userForm.form.findField('userInfo.userId').getValue()},
                                method:'post',
                                waitTitle:'提示信息',
                                waitMsg:'数据处理中，请稍后....',
                                //从struts2.0里不需要返回的参数

                                success:function(form,action)
                                {
                                    Ext.Msg.alert("提示信息","用户信息修改成功!");
                                    //查询的数据集合store刷新，实现页面自动刷新的效果

                                    store.reload();
                                    //将窗口关闭时候，window. hide()方法是隐藏，因此并不会真正销毁窗口对象

                                    editUserWin.hide();
                                    return ;
                                },
                                failure:function(form,action)
                                {
                                    Ext.Msg.alert("提示信息","用户信息修改失败");
                                    return ;
                                }
                            });
                        }else
                        {
                            Ext.Msg.alert("提示信息","表单有错误，请重新填写!");
                        }
                    }},
                    {text:'关闭',handler:function(){editUserWin.hide();}}]
             });
            }
            editUserWin.show();
        }
        /**
        * 重置页面查询表单
        */
        function resetForm()
        {
            Ext.getCmp("queryForm").getForm().reset();
        }

        /**
        * 每行单元格点击事件
        */
        function renderPage(grid,rowIndex,columnIndex,e)
        {
         //触发事件的对象的Id
            var id = grid.getStore().getAt(rowIndex).data['userId'];
            switch(columuIndex)
            {
                case 3:delForm(id);
                     break;
             /**
                *case 4:updateForm(id);
                *     break;
                */
             default:break;
            }
        }
