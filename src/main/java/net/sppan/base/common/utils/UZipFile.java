package net.sppan.base.common.utils;

import org.apache.log4j.Logger;

import java.io.*;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;


/**
 * Created by wzj on 2016/9/9.
 */
public class UZipFile {
	
	protected static Logger log =  Logger.getLogger(UZipFile. class );
	
	
	/**
	 * 解压到指定目录 zipPath 原文件目录 descDir 加压后文件目录
	 */
	public static void unZipFiles(String zipPath, String descDir) throws IOException {
		unZipFiles(new File(zipPath), descDir);
	}

	/**
	 * 解压文件到指定目录
	 */
	@SuppressWarnings("rawtypes")
	public static void unZipFiles(File zipFile, String descDir) throws IOException {
		File pathFile = new File(descDir);
		if (!pathFile.exists()) {
			pathFile.mkdirs();
		}
		// 解决zip文件中有中文目录或者中文文件
		ZipFile zip = new ZipFile(zipFile, Charset.forName("GBK"));
		for (Enumeration entries = zip.entries(); entries.hasMoreElements();) {
			ZipEntry entry = (ZipEntry) entries.nextElement();
			String zipEntryName = entry.getName();
			InputStream in = zip.getInputStream(entry);
			String outPath = (descDir + zipEntryName).replaceAll("\\*", "/");
			;
			// 判断路径是否存在,不存在则创建文件路径
			File file = new File(outPath.substring(0, outPath.lastIndexOf('/')));
			if (!file.exists()) {
				file.mkdirs();
			}
			// 判断文件全路径是否为文件夹,如果是上面已经上传,不需要解压
			if (new File(outPath).isDirectory()) {
				continue;
			}
			// 输出文件路径信息
			System.out.println(outPath);
			OutputStream out = new FileOutputStream(outPath);
			byte[] buf1 = new byte[1024];
			int len;
			while ((len = in.read(buf1)) > 0) {
				out.write(buf1, 0, len);
			}
			in.close();
			out.close();
		}
		System.out.println("******************解压完毕********************");
	}

	/**
	 * 获取解压路径by xy 2018/09/04
	 * @throws IOException
     */
	private static String getFilePath(){
		String filePath = null;
		String imgFloder = "uploadFiles/";
		//获取Tomcat服务器所在的路径
		String tomcat_path = System.getProperty( "user.dir" );
		//获取Tomcat服务器所在路径的最后一个文件目录
		String bin_path = tomcat_path.substring(tomcat_path.lastIndexOf("\\")+1,tomcat_path.length());
		//若最后一个文件目录为bin目录，则服务器为手动启动
		if(("bin").equals(bin_path)){
			//获取保存上传图片的文件路径
			filePath = tomcat_path.substring(0,System.getProperty( "user.dir" ).lastIndexOf("\\")) +"\\webapps"+"\\" + imgFloder;
		}else{//服务中自启动Tomcat时获取路径为：D:\Software\Tomcat-8.5
			filePath = tomcat_path+"\\webapps"+"\\" + imgFloder;
		}

		File file = new File(filePath);
		if (!file.exists()){
			file.mkdir();
		}

		return filePath;
	}
	public static void main(String[] args) throws IOException {
		// 到指定目录下寻找phtot压缩文件。
		String rootDir = "D:/apache-tomcat-7.0.62/webapps/hjcj-tool/photoFiles";
		System.out.println(rootDir);
		
		// photo 文件列表
		List<String> listPhoto = getPhotoFileName(rootDir, "Photo", false);
		// 文件列表
		List<String> listWens = getFileName(rootDir, false);
		for (int i = 0; i < listPhoto.size(); i++) {
			// 判断该文件是否被解压，解压后在同一目录下生成
			String fname = listPhoto.get(i).substring(0, listPhoto.get(i).length() - 6);
			if (!listWens.contains(fname)) {
				System.out.println(fname);
				String fromPath = rootDir + "/" + listPhoto.get(i);
				String toPath = rootDir + "/" + fname + "/";
				// 解压Photo文件
				try {
					unZipFiles(fromPath, toPath);
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
	}
	
	
	// 服务启动后，开始解压文件。
	public void run() {
		// 到指定目录下寻找phtot压缩文件。
		String rootDir =  System.getProperty("catalina.home") + "/webapps/photoFiles/";
		System.out.println(rootDir);
		// photo 文件列表
		List<String> listPhoto = getPhotoFileName(rootDir, "Photo", false);
		// 文件列表
		List<String> listWens = getFileName(rootDir, false);
		for (int i = 0; i < listPhoto.size(); i++) {
			// 判断该文件是否被解压，解压后在同一目录下生成
			String fname = listPhoto.get(i).substring(0, listPhoto.get(i).length() - 6);
			if (!listWens.contains(fname)) {
				System.out.println(fname);
				String fromPath = rootDir + "/" + listPhoto.get(i);
				String toPath = rootDir + "/" + fname + "/";
				// 解压Photo文件
				try {
					unZipFiles(fromPath, toPath);
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}

	}

	  /**
     * 得到文件夹下的所有 文件夹 列表
     * @param strFolderPath 文件夹路径
     * @param blIsAbsPath 是否采用绝对路径返回
     * @return
     */
    public static List<String> getFileName(String strFolderPath,  boolean blIsAbsPath) {
       List<String> lsFileName = new ArrayList<String>();
       //用于查找文件
       File getDocument;
       if (strFolderPath == null || strFolderPath.equals("")) {
           return null;
       } else {
           if (strFolderPath.substring(strFolderPath.length()-1).equals("/")) {
               strFolderPath = strFolderPath.substring(0, strFolderPath.length()-1);
           }
           getDocument = new File(strFolderPath);
       }
       //存储文件容器
       File[] files = getDocument.listFiles();
       
       if (files != null) {
           for (int i = 0; i < files.length; i++) {
               String fileName = files[i].getName();
               if (files[i].isDirectory()) { // 判断是文件还是文件夹
            	   String strFileName = "";
            	   if (blIsAbsPath) {
            		   strFileName = strFolderPath + File.separator + fileName;
                   }else{
                	   strFileName = fileName;
                   }
                   log.debug("have loaded file =" + strFileName);
                   lsFileName.add(strFileName);
               } 
           }

       }
       return lsFileName;
    }
	
	
	  /**
     * 得到文件夹下的所有指定后缀文件名列表
     * @param strFolderPath 文件夹路径
     * @param strSuffix 需要遍历的的文件后缀
     * @param blIsAbsPath 是否采用绝对路径返回
     * @return
     */
    public static List<String> getPhotoFileName(String strFolderPath, String strSuffix, boolean blIsAbsPath) {
       List<String> lsFileName = new ArrayList<String>();
       
       //用于查找文件
       File getDocument;
       if (strFolderPath == null || strFolderPath.equals("")) {
           return null;
       } else {
           if (strFolderPath.substring(strFolderPath.length()-1).equals("/")) {
               strFolderPath = strFolderPath.substring(0, strFolderPath.length()-1);
           }
           getDocument = new File(strFolderPath);
       }
       //存储文件容器
       String getFileName[];
       getFileName = getDocument.list();
       if (getFileName==null || getFileName.length<1) {
    	   log.error("no file in path:" + strFolderPath + "! please check!!!");
           return null;
       }
       
       //遍历整合
       for (int i = 0; i < getFileName.length; i++) {
           //文件名合法性检查
           String strFileNameTmp = getFileName[i];
           if (strFileNameTmp.length() <= strSuffix.length()) {
               continue;
           }
           if (!strFileNameTmp.substring(strFileNameTmp.length() - strSuffix.length()).equals(strSuffix)) {
               //文件后缀不符合的情况
               continue;
           }
           //文件路径加载
           String strFileName = "";
           if (blIsAbsPath) {
               strFileName = strFolderPath + File.separator + getFileName[i];
           }else{
               strFileName = getFileName[i];
           }
           log.debug("have loaded file =" + strFileName);
           lsFileName.add(strFileName);
       }
       return lsFileName;
    }
	
}



