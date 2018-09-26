package net.sppan.base.dao;

import net.sppan.base.dao.support.IBaseDao;
import net.sppan.base.entity.Photo;
import org.springframework.stereotype.Repository;

@Repository
public interface IPhotoDao extends IBaseDao<Photo, Integer> {

}
