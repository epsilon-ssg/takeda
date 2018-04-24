package com.venitian.core.impl;

import org.apache.sling.settings.SlingSettingsService;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.ConfigurationPolicy;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.metatype.annotations.Designate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.venitian.core.SimpleTestService;
import com.venitian.core.service.UserConfiguration;

@Component(service = SimpleTestService.class,immediate = true, configurationPolicy = ConfigurationPolicy.REQUIRE)
@Designate(ocd = UserConfiguration.class,factory = true)
public class SimpleTestServiceImpl implements SimpleTestService{

	private static final Logger LOGGER = LoggerFactory.getLogger(SimpleTestServiceImpl.class);
 
	private UserConfiguration config1;
    
    private boolean author;
    
    @Reference
    private SlingSettingsService settings;
    
    @Activate
    public void activate(UserConfiguration config) {
    	LOGGER.info("+++++++++++++++ 1 " + config.getUserName());
        this.config1 = config;
    	LOGGER.info("+++++++++++++++ 2 " + this.config1.getUserName());

        author = settings.getRunModes().contains("author");
    }

    public String getSimpleValue() {
    	LOGGER.info("+++++++++++++++ 3 " + config1.getUserName());
    	return "hello " + config1.getUserName();
    	
    }

	
	public boolean isAuthor() {
		// TODO Auto-generated method stub
		 return author;
	}
}
