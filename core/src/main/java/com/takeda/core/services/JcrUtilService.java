/**
 * 
 */
package com.takeda.core.services;

import org.apache.sling.api.resource.ResourceResolver;

/**
 * The Interface JcrUtilService.
 *
 * @author ppalla
 */
public interface JcrUtilService {
	
	/**
	 * Gets the resource resolver.
	 *
	 * @return the resource resolver
	 */
	public ResourceResolver getResourceResolver();

}
