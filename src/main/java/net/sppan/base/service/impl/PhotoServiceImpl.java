package net.sppan.base.service.impl;
import net.sppan.base.dao.IPhotoDao;
import net.sppan.base.dao.support.IBaseDao;
import net.sppan.base.entity.Photo;
import net.sppan.base.entity.Role;
import net.sppan.base.service.IPhotoService;
import net.sppan.base.service.support.impl.BaseServiceImpl;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

/**
 * <p>
 * 角色表  服务实现类
 * </p>
 *
 * @author yxu
 * @since 2018-09-21
 */
@Service
public class PhotoServiceImpl extends BaseServiceImpl<Photo, Integer> implements IPhotoService  {

	@Autowired
	private IPhotoDao photoDao;
	
	@Override
	public IBaseDao<Photo, Integer> getBaseDao() {
		return this.photoDao;
	}
	public void saveOrUpdate(Photo photo){
		if(photo.getId() != null){
			Photo dbPhoto = find(photo.getId());
			dbPhoto.setOriginName(photo.getOriginName());
			dbPhoto.setFileSize(photo.getFileSize());
			dbPhoto.setDescription(photo.getDescription());
			dbPhoto.setRealName(photo.getRealName());
			dbPhoto.setUploadMan(photo.getUploadMan());
			dbPhoto.setUploadTime(new Date());
			update(dbPhoto);
		}else{
			photo.setUploadTime(new Date());
			save(photo);
		}
	}








}
