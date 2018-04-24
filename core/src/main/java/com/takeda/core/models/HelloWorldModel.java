/**
 * 
 */
package com.takeda.core.models;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.inject.Named;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Model;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.takeda.core.services.SimpleService;
 
/**
 * The Class HelloWorldModel.
 * 
 * @author ppalla
 */
@Model(adaptables=Resource.class)
public class HelloWorldModel { 
     
    /** The logger. */
    protected final Logger LOGGER = LoggerFactory.getLogger(this.getClass());
 
    /** The resource type. */
    @Inject @Named("sling:resourceType") @Default(values="No resourceType")
    protected String resourceType;
     
    /** The simple service. */
    @Inject 
    SimpleService simpleService;
    
    
    /** The first name. */
    @Inject
    private String firstName;
    
    /** The last name. */
    @Inject
    private String lastName;
    
    /** The technology. */
    @Inject
    private String technology;
       
    /** The message. */
    private String message;
 
    /**
     * Inits the.
     */
    @PostConstruct
    protected void init() {
        LOGGER.info("Inititiated post construct execution") ; 
         
        message = "\tHello World!\n";
        message += "\tResource type is: " + resourceType + "\n";
        message += "\tVALUE IS " + simpleService.getSimpleValue()+ "\n";
    }
 
    /**
     * Gets the message.
     *
     * @return the message
     */
    public String getMessage() {
        return message;
    }
    
    /**
     * Gets the first name.
     *
     * @return the first name
     */
    public String getFirstName() {
        return firstName;
    }
    
    /**
     * Gets the last name.
     *
     * @return the last name
     */
    public String getLastName() {
        return lastName;
    }
    
    /**
     * Gets the technology.
     *
     * @return the technology
     */
    public String getTechnology() {
        return technology;
    }
}