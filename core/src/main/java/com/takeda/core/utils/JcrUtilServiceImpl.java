/**
 * 
 */
package com.takeda.core.utils;

import java.util.HashMap;
import java.util.Map;

import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.takeda.core.services.JcrUtilService;

/**
 * The Class JcrUtilServiceImpl.
 *
 * @author ppalla
 */
@Component(service = JcrUtilService.class, immediate = true,  name ="jcr utility service")
public class JcrUtilServiceImpl implements JcrUtilService{

	/** The Constant LOGGER. */
	final private static Logger LOGGER = LoggerFactory.getLogger(JcrUtilServiceImpl.class);

	
	/** The resource resolver factory. */
	@Reference
	private ResourceResolverFactory resourceResolverFactory;

	/** The resource resolver. */
	private static ResourceResolver resourceResolver;

	/**
	 * Gets the resource resolver.
	 *
	 * @return the resource resolver
	 */
	@Override
	public ResourceResolver getResourceResolver() {
		if (null != resourceResolver) {
			return resourceResolver;
		} else {
			if (null != resourceResolverFactory) {
				try {
					Map<String, Object> param = new HashMap<String, Object>();
					param.put(ResourceResolverFactory.SUBSERVICE, "dataread");
					resourceResolver = resourceResolverFactory.getServiceResourceResolver(param);
				} catch (LoginException loginException) {
					LOGGER.debug("Exception in getResourceResolver method of JcrUtilServiceImpl" + loginException);
				}
			}
			return resourceResolver;
		}
	}

}