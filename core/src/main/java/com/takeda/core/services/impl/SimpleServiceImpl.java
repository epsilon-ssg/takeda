/**
 * 
 */
package com.takeda.core.services.impl;

import org.apache.sling.settings.SlingSettingsService;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.ConfigurationPolicy;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.metatype.annotations.Designate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.takeda.core.services.SimpleService;
import com.takeda.core.services.UserConfigurationService;

/**
 * The Class SimpleServiceImpl.
 *
 * @author ppalla
 */
@Component(service = SimpleService.class,immediate = true, configurationPolicy = ConfigurationPolicy.REQUIRE)
@Designate(ocd = UserConfigurationService.class,factory = true)
public class SimpleServiceImpl implements SimpleService {
	
	/** The Constant LOGGER. */ 
	private static final Logger LOGGER = LoggerFactory.getLogger(SimpleServiceImpl.class);
	 
	/** The config. */
	private UserConfigurationService config;
    
    /** The author. */
    private boolean author;
    
    /** The settings. */
    @Reference
    private SlingSettingsService settings;
    
    /**
     * Activate.
     *
     * @param config the config
     */
    @Activate
    public void activate(UserConfigurationService config) {
        this.config = config;
    	LOGGER.info("config Map"+ config);
        author = settings.getRunModes().contains("author");
    }

    /**
     * Gets the simple value.
     *
     * @return the simple value
     */
    @Override
    public String getSimpleValue() {
    	return "hello " + config.getUserName();
    }
	
	/**
	 * Checks if is author.
	 *
	 * @return true, if is author
	 */
    @Override
	public boolean isAuthor() {
		 return author;
	}
}
