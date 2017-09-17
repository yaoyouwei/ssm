<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<base href="<%=basePath%>">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="./library/ext-2.0.2/resources/css/ext-all.css" />
<script type="text/javascript" src="./library/ext-2.0.2/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="./library/ext-2.0.2/ext-all.js"></script>