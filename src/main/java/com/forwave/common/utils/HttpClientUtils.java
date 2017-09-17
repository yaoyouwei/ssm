package com.forwave.common.utils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.ParseException;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

import com.mysql.jdbc.Constants;

public class HttpClientUtils {

	public static void main(String[] args) throws Exception, UnsupportedEncodingException, IOException {
		//获取sign
		String getMethodUrl = "http://localhost/api/EastFaxWebAPI.php";
		String getSignUrl = "http://localhost/api/demo/sign.php";
		
		
		List<NameValuePair> params = new ArrayList<NameValuePair>();
		params.add(new BasicNameValuePair("serverid", ""));
		params.add(new BasicNameValuePair("app_key", "demo"));
		params.add(new BasicNameValuePair("app_secret", "33B2D903C6D8A2A23D2064C9391344B1"));
		params.add(new BasicNameValuePair("method", "eastfax.user.listNoLogin"));
		params.add(new BasicNameValuePair("departid", ""));
		params.add(new BasicNameValuePair("format", "json"));
		params.add(new BasicNameValuePair("sign", ""));
		
		
		String sign = get(getSignUrl,params);
		System.out.println("---------------返回结果:--------------------");
		System.out.println(sign);
		params.clear();
		params.add(new BasicNameValuePair("app_key", "demo"));
		params.add(new BasicNameValuePair("format", "json"));
		params.add(new BasicNameValuePair("method", "eastfax.user.listNoLogin"));
		params.add(new BasicNameValuePair("sign", sign));
		params.add(new BasicNameValuePair("serverid", ""));
		params.add(new BasicNameValuePair("departid", ""));
		
		String result = get(getMethodUrl,params);
		
		System.out.println("---------------paramList返回结果:--------------------");
		System.out.println(result);
		
		
		
		/*
		
		TreeMap <String,String> paramMap = new TreeMap<String,String>();
		paramMap.put("sign", "");
		paramMap.put("format", "json");
		paramMap.put("app_secret", "33B2D903C6D8A2A23D2064C9391344B1");
		paramMap.put("departid", "");
		paramMap.put("method", "eastfax.user.listNoLogin");
		paramMap.put("serverid", "");
		paramMap.put("app_key", "demo");
		String sign_test = get(getSignUrl,paramMap);
		
		paramMap.clear();
		paramMap.put("method","eastfax.user.listNoLogin");
		paramMap.put("app_key","demo");
		paramMap.put("departid","");
		paramMap.put("sign",sign_test);
		paramMap.put("format","json");
		paramMap.put("serverid","");
		
        result = get(getMethodUrl,paramMap);
		params.add(new BasicNameValuePair("format", "json"));
		params.add(new BasicNameValuePair("app_key", "demo"));
		params.add(new BasicNameValuePair("method", "eastfax.user.listNoLogin"));
		params.add(new BasicNameValuePair("departid", ""));
		params.add(new BasicNameValuePair("sign", sign_test));
		params.add(new BasicNameValuePair("serverid", ""));
		
		result = get(getMethodUrl,params);
		
		System.out.println("---------------paramMap返回结果:--------------------");
		System.out.println(result);
		
		
		
		
		
		
		JSONObject json = JSONObject.fromObject(result);
		JSONArray userList = json.getJSONObject("user_list_response").getJSONObject("user_items").getJSONArray("user_item");
		for(int i=0 ;i<userList.size();i++){
			JSONObject user = userList.getJSONObject(i);
			
		}*/
		//http://localhost/api/demo/sign.php?_=1488952592950&app_key=demo&app_secret=33B2D903C6D8A2A23D2064C9391344B1&method=eastfax.user.listNoLogin&format=json&sign=&departid=&serverid=
		//String sign = post(url,params);
		
		Map <String,String> paramMap = new HashMap<String,String>();
		paramMap.put("sign", "");
		paramMap.put("format", "json");
		paramMap.put("app_secret", "33B2D903C6D8A2A23D2064C9391344B1");
		paramMap.put("departid", "");
		paramMap.put("method", "eastfax.user.listNoLogin");
		paramMap.put("serverid", "");
		paramMap.put("app_key", "demo");
		String sign_test = get(getSignUrl,paramMap);
		
		paramMap.clear();
		paramMap.put("method","eastfax.user.listNoLogin");
		paramMap.put("app_key","demo");
		paramMap.put("departid","");
		paramMap.put("sign",sign_test);
		paramMap.put("format","json");
		paramMap.put("serverid","");
		
        result = get(getMethodUrl,paramMap);
		params.add(new BasicNameValuePair("format", "json"));
		params.add(new BasicNameValuePair("app_key", "demo"));
		params.add(new BasicNameValuePair("method", "eastfax.user.listNoLogin"));
		params.add(new BasicNameValuePair("departid", ""));
		params.add(new BasicNameValuePair("sign", sign_test));
		params.add(new BasicNameValuePair("serverid", ""));
		
		result = get(getMethodUrl,params);
		
		System.out.println("---------------paramMap返回结果:--------------------");
		System.out.println(result);
		
	}
	
	
	public static JSONObject getJSONDataFromEastFax(String signUrl,String methodUrl,Map<String,String> paramMap){
		//获取sign
		paramMap.put("sign", get(signUrl,paramMap));
		paramMap.remove("app_secret");
		String result = get(methodUrl,paramMap);
		JSONObject json = JSONObject.fromObject(result);
		return json;
	}
	
	
	
	/**
	 * post方式提交表单（模拟用户登录请求）
	 */
	public void postForm() {
		// 创建默认的httpClient实例.  
		CloseableHttpClient httpclient = HttpClients.createDefault();
		// 创建httppost  
		HttpPost httppost = new HttpPost("http://localhost:8080/myDemo/Ajax/serivceJ.action");
		// 创建参数队列  
		List<NameValuePair> formparams = new ArrayList<NameValuePair>();
		formparams.add(new BasicNameValuePair("username", "admin"));
		formparams.add(new BasicNameValuePair("password", "123456"));
		UrlEncodedFormEntity uefEntity;
		try {
			uefEntity = new UrlEncodedFormEntity(formparams, "UTF-8");
			httppost.setEntity(uefEntity);
			System.out.println("executing request " + httppost.getURI());
			CloseableHttpResponse response = httpclient.execute(httppost);
			try {
				HttpEntity entity = response.getEntity();
				if (entity != null) {
					System.out.println("--------------------------------------");
					System.out.println("Response content: " + EntityUtils.toString(entity, "UTF-8"));
					System.out.println("--------------------------------------");
				}
			} finally {
				response.close();
			}
		} catch (ClientProtocolException e) {
			e.printStackTrace();
		} catch (UnsupportedEncodingException e1) {
			e1.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			// 关闭连接,释放资源  
			try {
				httpclient.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	/**
	 * 发送 post请求访问本地应用并根据传递参数不同返回不同结果
	 */
	public void post() {
		// 创建默认的httpClient实例.  
		CloseableHttpClient httpclient = HttpClients.createDefault();
		// 创建httppost  
		HttpPost httppost = new HttpPost("http://localhost:8080/myDemo/Ajax/serivceJ.action");
		// 创建参数队列  
		List<NameValuePair> formparams = new ArrayList<NameValuePair>();
		formparams.add(new BasicNameValuePair("type", "house"));
		UrlEncodedFormEntity uefEntity;
		try {
			uefEntity = new UrlEncodedFormEntity(formparams, "UTF-8");
			httppost.setEntity(uefEntity);
			System.out.println("executing request " + httppost.getURI());
			CloseableHttpResponse response = httpclient.execute(httppost);
			try {
				HttpEntity entity = response.getEntity();
				if (entity != null) {
					System.out.println("--------------------------------------");
					System.out.println("Response content: " + EntityUtils.toString(entity, "UTF-8"));
					System.out.println("--------------------------------------");
				}
			} finally {
				response.close();
			}
		} catch (ClientProtocolException e) {
			e.printStackTrace();
		} catch (UnsupportedEncodingException e1) {
			e1.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			// 关闭连接,释放资源  
			try {
				httpclient.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
	
	


	
	
	//通用post请求
	/**
	 * 发送 post请求访问本地应用并根据传递参数不同返回不同结果
	 */
	public static String post(String url ,List<NameValuePair> params) {
		String result = "";//返回结果
		// 创建默认的httpClient实例.  
		CloseableHttpClient httpclient = HttpClients.createDefault();
		// 创建httppost  
		HttpPost httppost = new HttpPost(url);
		// 创建参数队列  
		//List<NameValuePair> formparams = new ArrayList<NameValuePair>();
		//formparams.add(new BasicNameValuePair("type", "house"));
		UrlEncodedFormEntity uefEntity;
		try {
			uefEntity = new UrlEncodedFormEntity(params, "UTF-8");
			httppost.setEntity(uefEntity);
			System.out.println("executing request " + httppost.getURI());
			CloseableHttpResponse response = httpclient.execute(httppost);
			try {
				HttpEntity entity = response.getEntity();
				if (entity != null) {
					if (entity != null) {
						//start 读取整个页面内容  
		                InputStream is = entity.getContent();  
		                BufferedReader in = new BufferedReader(new InputStreamReader(is));   
		                StringBuffer buffer = new StringBuffer();   
		                String line = "";  
		                while ((line = in.readLine()) != null) {  
		                    buffer.append(line);  
		                }  
		                //end 读取整个页面内容  
		                result = buffer.toString(); 
		                System.out.println(result);

					}
				}
				
			} finally {
				response.close();
			}
		} catch (ClientProtocolException e) {
			e.printStackTrace();
		} catch (UnsupportedEncodingException e1) {
			e1.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			// 关闭连接,释放资源  
			try {
				httpclient.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return result;
	}
	
	
	/*public static String get(String url,TreeMap<String,String> paramMap) {
		List<NameValuePair> paramList = new ArrayList<NameValuePair>();
		//排序
		Iterator<Map.Entry<String, String>> it = paramMap.entrySet().iterator();  
		while (it.hasNext()) {  
			Map.Entry<String, String> e =  it.next();  
			paramList.add(new BasicNameValuePair(e.getKey(), e.getValue()));
			System.out.print(e.getKey());
			System.out.println(e.getValue());
		} 
		return get(url,paramList);
		
	}*/
	
	public static String get(String url,Map<String,String> paramMap) {
		List<NameValuePair> paramList = new ArrayList<NameValuePair>();
		//排序
		Iterator<Map.Entry<String, String>> it = paramMap.entrySet().iterator();  
		while (it.hasNext()) {  
			Map.Entry<String, String> e =  it.next();  
			paramList.add(new BasicNameValuePair(e.getKey(), e.getValue()));
			System.out.print(e.getKey());
			System.out.println(e.getValue());
		} 
		return get(url,paramList);
		
	}
	
	/**
	 * 发送 get请求
	 */
	public static String get(String url,List<NameValuePair> params) {
		String result = "";
		CloseableHttpClient httpclient = HttpClients.createDefault();
		try {
			
			String paramsStr = EntityUtils.toString(new UrlEncodedFormEntity(params,"utf-8"));  
			// 创建httpget.  
			HttpGet httpget = new HttpGet(url+"?"+paramsStr);
			System.out.println("executing request " + httpget.getURI());
			// 执行get请求.  
			CloseableHttpResponse response = httpclient.execute(httpget);
			try {
				// 获取响应实体  
				HttpEntity entity = response.getEntity();
				// 打印响应状态  
				//System.out.println(response.getStatusLine());
				if (entity != null) {
					//start 读取整个页面内容  
	                InputStream is = entity.getContent();  
	                BufferedReader in = new BufferedReader(new InputStreamReader(is));   
	                StringBuffer buffer = new StringBuffer();   
	                String line = "";  
	                while ((line = in.readLine()) != null) {  
	                    buffer.append(line);  
	                }  
	                //end 读取整个页面内容  
	                result = buffer.toString(); 
	                System.out.println(result);

				}
			} finally {
				response.close();
			}
		} catch (ClientProtocolException e) {
			e.printStackTrace();
		} catch (ParseException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			// 关闭连接,释放资源  
			try {
				httpclient.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return result;
	}
	
	
	/**
	 * 发送 get请求,测试用
	 */
	public String  get(String url) {
		String result = "";
		CloseableHttpClient httpclient = HttpClients.createDefault();
		try {
			// 创建httpget.  
			HttpGet httpget = new HttpGet(url);
			System.out.println("executing request " + httpget.getURI());
			// 执行get请求.  
			CloseableHttpResponse response = httpclient.execute(httpget);
			try {
				// 获取响应实体  
				HttpEntity entity = response.getEntity();
				System.out.println("--------------------------------------");
				// 打印响应状态  
				System.out.println(response.getStatusLine());
				if (entity != null) {
					if (entity != null) {
						//start 读取整个页面内容  
		                InputStream is = entity.getContent();  
		                BufferedReader in = new BufferedReader(new InputStreamReader(is));   
		                StringBuffer buffer = new StringBuffer();   
		                String line = "";  
		                while ((line = in.readLine()) != null) {  
		                    buffer.append(line);  
		                }  
		                //end 读取整个页面内容  
		                result = buffer.toString(); 
		                System.out.println(result);

					}
				}
			} finally {
				response.close();
			}
		} catch (ClientProtocolException e) {
			e.printStackTrace();
		} catch (ParseException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			// 关闭连接,释放资源  
			try {
				httpclient.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return result;
	}
	
	
	
	
	
	
	
	
	
	
	
	


}
