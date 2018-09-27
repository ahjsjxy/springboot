package net.sppan.base.controller.function;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import net.sppan.base.common.utils.MD5Utils;
import net.sppan.base.common.utils.UZipFile;
import net.sppan.base.config.ServerInfoProperties;
import net.sppan.base.controller.BaseController;
import net.sppan.base.entity.Photo;
import net.sppan.base.entity.User;
import net.sppan.base.service.IPhotoService;
import net.sppan.base.service.specification.SimpleSpecificationBuilder;
import net.sppan.base.service.specification.SpecificationOperator;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by yx on 2018/9/20.
 */
@Controller
@RequestMapping(value={"/admin/photo"})
public class PhotoController extends BaseController {

    @Autowired
    private IPhotoService photoService;
    @Autowired
    private ServerInfoProperties sInfo;
    /**
     * 返回文件上传视图
     * @author yxu
     * @return
     */
    @RequestMapping(value={"/","/index"},method= RequestMethod.GET)
    public String photo(Model model){
        String detailUrl = sInfo.getPhotoDetailUrl();
        model.addAttribute("detailUrl",detailUrl);
        return "admin/photo/photo";
    }

    /**
     * @author yxu
     * 填充bootstrap表格内容，可添加查询条件
     * @return
     */

    @RequestMapping(value = { "/list" })
    @ResponseBody
    public Page<Photo> list() {
        SimpleSpecificationBuilder<Photo> builder = new SimpleSpecificationBuilder<Photo>();
        String searchText = request.getParameter("searchText");
        if(StringUtils.isNotBlank(searchText)){
            builder.add("originName", SpecificationOperator.Operator.likeAll.name(), searchText);
        }
        Page<Photo> page = photoService.findAll(builder.generateSpecification(), getPageRequest());
        return page;
    }

    /**
     * 将上传的文件存储在服务器上并解压处理
     * @author yxu
     * @param file
     * @param request
     * @param response
     * @param session
     * @param size
     * @throws IOException
     */
    @RequestMapping(value={"/upload"},method=RequestMethod.POST)
    @ResponseBody
    public void uploadPhoto(@RequestParam("file") MultipartFile file, HttpServletRequest request,
                              HttpServletResponse response, HttpSession session, String size) throws IOException {
        String resMsg = "";
        response.setCharacterEncoding("UTF-8");
        try {
            long startTime = System.currentTimeMillis();
            String leftPath =  System.getProperty("catalina.home") + "/webapps/photoFiles/";
            String l_size = size;
            String originName = file.getOriginalFilename();
            String fileExtentionName = file.getOriginalFilename().substring(originName.lastIndexOf("."),originName.length());
            String allName = MD5Utils.md5(new Date().getTime() + "-" + file.getOriginalFilename()) + fileExtentionName;
            String path = leftPath + allName;
            File newFile = new File(path);
            if (!newFile.getParentFile().exists()) {
                newFile.getParentFile().mkdirs();
            }
            file.transferTo(newFile);
            long endTime = System.currentTimeMillis();
            System.out.println("运行时间：" + String.valueOf(endTime - startTime) + "ms");
            // 写入session
            String name = file.getOriginalFilename();
            System.out.println(name);
            UZipFile uzip = new UZipFile();
            uzip.run();
            Map map = new HashMap<String,String>();
            map.put("realName",allName);
            map.put("originName",originName);
            JSONObject jsonObject = JSONObject.parseObject(JSON.toJSONString(map));
            JSONArray jsonArray = new JSONArray();
            jsonArray.add(jsonObject);
            response.getWriter().write(jsonArray.toString());
        } catch (IllegalStateException e) {
            e.printStackTrace();
        }
    }

    /**
     * 将上传文件的描述信息存储进数据库中
     * @author yxu
     * @param l_size
     * @param originName
     * @param realName
     * @param description
     * @param response
     * @param request
     * @throws IOException
     */

    @RequestMapping(value={"/savephotoinfo"},method= RequestMethod.POST)
    @ResponseBody
    public void savePhotoInfo(@RequestParam("l_size") String l_size,
                              @RequestParam("originName") String originName,
                              @RequestParam("realName") String realName,
                              @RequestParam(value="description",required = false) String description,
                              HttpServletResponse response, HttpServletRequest request)
            throws IOException {
        response.setCharacterEncoding("UTF-8");
        JSONObject jsonObject = new JSONObject();
        JSONArray jsonArray = new JSONArray();
        try {
            Subject subject = SecurityUtils.getSubject();
            Photo photo = new Photo();
            photo.setOriginName(originName);
            photo.setFileSize(l_size);
            photo.setRealName(realName);
            photo.setUploadTime(new Date());
            photo.setDelFlag("0");
            if (description != null) {
                photo.setDescription(description);
            }else{
                photo.setDescription("");
            }
            User user = (User) subject.getPrincipal();
            photo.setUploadMan(user.getUserName());
            photoService.saveOrUpdate(photo);
        } catch (Exception e) {
            e.printStackTrace();
            jsonObject.put("message","上传失败");
            jsonArray.add(jsonObject);
            response.getWriter().print(jsonArray.toString());
        }
        jsonObject.put("message","上传成功");
        jsonArray.add(jsonObject);
        response.getWriter().print(jsonArray.toString());

    }
    
    /**
     * 文件上传点击详情进行全景展示
     * @author yxu
     * @param request
     * @param response
     * @param model
     * @return
     */
    @RequestMapping(value={"/detail"},method = RequestMethod.GET)
    public String detail(HttpServletRequest request,HttpServletResponse response,Model model){
        response.setCharacterEncoding("UTF-8");
        String idL = request.getParameter("id");
        String id = "";
        try{
            Photo photo = photoService.find(Integer.parseInt(idL));
            String realName = photo.getRealName();
            id = realName.substring(0,realName.indexOf("."));
            String hostStr = sInfo.getUploadPhotoUrl();
            model.addAttribute("ids",id);
            model.addAttribute("hostStr",hostStr);
        }catch (Exception e){
            e.printStackTrace();
        }
        return "admin/photo/unity3d_index";
    }

    /**
     * 播放视频接口
     * @author yxu
     * @param request
     * @param response
     * @param model
     * @return
     */
    @RequestMapping(value={"/video"})
    public String toVideo(HttpServletRequest request,HttpServletResponse response,Model model)
    {
        String _id = request.getParameter("id");
        model.addAttribute("id",_id);
        return "admin/photo/Video";

    }

    /**
     * 播放音频接口
     * @author yxu
     * @param request
     * @param response
     * @param model
     * @return
     */
    @RequestMapping(value={"/audio"})
    public String toAudio(HttpServletRequest request,HttpServletResponse response,Model model){
        String _id = request.getParameter("id");
        model.addAttribute("id",_id);
        return "admin/photo/Audio";
    }





}
