package com.app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.DTO.ImageDTO;
import com.app.entities.ImagePath;
import com.app.repository.ImageRepository;

@Service
@Transactional
public class ImageServiceImpl implements ImageService {
	
	@Autowired
	public ImageRepository umgrepo;

	public String saveImagePath(ImageDTO imagePath) {
		ImagePath path = new ImagePath();
        path.setImagePath(imagePath.getImagePath());
        ImagePath savedPath = umgrepo.save(path);
        return savedPath.getImagePath();
	}

}
