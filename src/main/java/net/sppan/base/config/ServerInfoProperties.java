package net.sppan.base.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

/**
 * Created by SteveChan on 2018/9/27.
 */
@Configuration
@ConfigurationProperties(prefix = "serverInfo", ignoreUnknownFields = false)
@PropertySource("classpath:config/serverInfo.properties")
@Data
@Component
public class ServerInfoProperties {
        private String uploadPhotoUrl;
        private String photoDetailUrl;

    public String getUploadPhotoUrl() {
        return uploadPhotoUrl;
    }

    public void setUploadPhotoUrl(String uploadPhotoUrl) {
        this.uploadPhotoUrl = uploadPhotoUrl;
    }

    public String getPhotoDetailUrl() {
        return photoDetailUrl;
    }

    public void setPhotoDetailUrl(String photoDetailUrl) {
        this.photoDetailUrl = photoDetailUrl;
    }
}
