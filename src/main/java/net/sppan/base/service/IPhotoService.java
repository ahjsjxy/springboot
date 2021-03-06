package net.sppan.base.service;

import net.sppan.base.entity.Photo;
import net.sppan.base.service.support.IBaseService;

/**
 * <p>
 * 角色服务类
 * </p>
 *
 * @author yxu
 * @since 2018-09-19
 */
public interface IPhotoService extends IBaseService<Photo,Integer> {

	/**
	 * 添加或者修改文件
	 * @param photo
	 */
	void saveOrUpdate(Photo photo);


	
}
