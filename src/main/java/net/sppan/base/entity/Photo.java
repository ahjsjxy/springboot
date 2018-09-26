package net.sppan.base.entity;

import com.alibaba.fastjson.annotation.JSONField;
import net.sppan.base.entity.support.BaseEntity;

import javax.persistence.*;
import java.util.Date;

/**
 * <p>
 * 角色表
 * </p>
 *
 * @author yXu
 * @since 2018-09-25
 */
@Entity
@Table(name = "tb_photo")
public class Photo extends BaseEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * 图片id
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", nullable = false)
	private Integer id;

	/**
	 * 上传人
	 */
	private String uploadMan;

	/**
	 * 上传时候的文件名（如20180816）
	 */
	private String originName;

	/**
	 * 在服务器上存放的名字
	 */
	private String realName;

	/**
	 * 上传时间
	 */
	@JSONField(format = "yyyy-MM-dd HH:mm:ss")
	private Date uploadTime;

	/**
	 * 文件大小
	 */
	private String fileSize;

	/**
	 * 文件描述
	 */
	private String description;
	/**
	 * 删除标记
	 */
	private String delFlag;

	public String getDelFlag() {
		return delFlag;
	}

	public void setDelFlag(String delFlag) {
		this.delFlag = delFlag;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getUploadMan() {
		return uploadMan;
	}

	public void setUploadMan(String uploadMan) {
		this.uploadMan = uploadMan;
	}

	public String getOriginName() {
		return originName;
	}

	public void setOriginName(String originName) {
		this.originName = originName;
	}

	public String getRealName() {
		return realName;
	}

	public void setRealName(String realName) {
		this.realName = realName;
	}

	public Date getUploadTime() {
		return uploadTime;
	}

	public void setUploadTime(Date uploadTime) {
		this.uploadTime = uploadTime;
	}

	public String getFileSize() {
		return fileSize;
	}

	public void setFileSize(String fileSize) {
		this.fileSize = fileSize;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
}
