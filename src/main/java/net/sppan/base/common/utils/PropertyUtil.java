package net.sppan.base.common.utils;


import java.io.*;
import java.util.Properties;

/**
 * Desc:properties文件获取工具类
 * Created by Steven-chan 2018/09/19
 */
public class PropertyUtil {
    // private static final Logger logger = LoggerFactory.getLogger(PropertyUtil.class);
    private static Properties props;
    static{
        loadProps();
    }

    synchronized static private void loadProps(){
        props = new Properties();
        InputStream in = null;
        try {
//　　　　<!--第一种，通过类加载器进行获取properties文件流-->

            //      in = PropertyUtil.class.getClassLoader().getResourceAsStream("./jdbc.properties");
//  <!--第二种，通过类进行获取properties文件流-->
            in = PropertyUtil.class.getResourceAsStream("../serverInf.properties");
            props.load(in);
        } catch (FileNotFoundException e) {
            System.out.println("serverInfo.properties文件未找到");
        } catch (IOException e) {
            System.out.println("出现IOException");
        } finally {
            try {
                if(null != in) {
                    in.close();
                }
            } catch (IOException e) {
                System.out.println("serverInfo.properties文件流关闭出现异常");
            }
        }
    }

    public static String getProperty(String key){
        if(null == props) {
            loadProps();
        }
        return props.getProperty(key);
    }

    public static String getProperty(String key, String defaultValue) {
        if(null == props) {
            loadProps();
        }
        return props.getProperty(key, defaultValue);
    }
    public static void main(String[] args){
        System.out.println(PropertyUtil.getProperty("serverStr"));

    }
}