/**
 * 
 */
package com.takeda.core.servlets;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.Servlet;
import javax.servlet.ServletException;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.takeda.core.services.JcrUtilService;
import com.takeda.core.utils.JcrUtilServiceImpl;

/**
 * @author ppalla
 *
 */
@Component(
	    service = Servlet.class,
	    property = {
	        "sling.servlet.extensions=html",
	        "sling.servlet.selectors=foo",
	        "sling.servlet.paths=/bin/sample1",
	        "sling.servlet.paths=/bin/sample2",
	        "sling.servlet.methods=get",
	      /*  "sling.servlet.resourceTypes=nt:file",
	        "sling.servlet.resourceTypes=takeda/components/helloworld"*/
	    }
	)
public class SampleServlet extends SlingAllMethodsServlet{


    private static final long serialVersionUID = 1L;
    
	/** The Constant LOGGER. */
	final private static Logger LOGGER = LoggerFactory.getLogger(JcrUtilServiceImpl.class);
	
    ResourceResolver resourceResolver;
    
    @Reference
    JcrUtilService jcrUtilService;
     
     
    /* (non-Javadoc)
     * @see org.apache.sling.api.servlets.SlingSafeMethodsServlet#doGet(org.apache.sling.api.SlingHttpServletRequest, org.apache.sling.api.SlingHttpServletResponse)
     */
    public void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response)throws ServletException,IOException{
    	LOGGER.info("inside sling model test servlet");
        response.setContentType("text/html");
       
        resourceResolver = jcrUtilService.getResourceResolver();
        try {
              response.getWriter().write("Output from the servlet:" +resourceResolver);
        } catch (Exception e) {
        	LOGGER.error(e.getMessage());
        }
        finally{
            /** It is mandatory to close resourceresolver or any session object, after its use */
            if(resourceResolver.isLive())
               resourceResolver.close();
        }
    }
}
