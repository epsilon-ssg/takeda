/**
 * 
 */
package com.takeda.core.services;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.AttributeType;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;
import org.osgi.service.metatype.annotations.Option;

/**
 * The Interface UserConfigurationService.
 *
 * @author ppalla
 */
@ObjectClassDefinition(name = "Sample User Account Configuration", description = "Configure the user Details")
public @interface UserConfigurationService {

	
	/**
	 * Gets the user name.
	 *
	 * @return the user name
	 */
	@AttributeDefinition(name = "user.name", description = "User Name")
	String getUserName() default "";

	/**
	 * Gets the password.
	 *
	 * @return the password
	 */
	@AttributeDefinition(name = "userpassword", description = "Password of the user account", type = AttributeType.PASSWORD)
	String getPassword() default "";
	
	/**
	 * Checks if is admin user.
	 *
	 * @return true, if is admin user
	 */
	@AttributeDefinition(name = "user.isAdminUser", description = "is it admin user or not?")
	boolean isAdminUser() default false;

	/**
	 * Gets the environments.
	 *
	 * @return the environments
	 */
	@AttributeDefinition(name = "user.environments", description = "Define the all environment where this user will be available")
	String[] getEnvironments() default {};	

	/**
	 * Gets the validity.
	 *
	 * @return the validity
	 */
	@AttributeDefinition(name = "user.validity", description ="Validity of user account", defaultValue = "10", required = true, type = AttributeType.INTEGER, min = "10")
	int getValidity() default 10;

	/**
	 * Gets the member of.
	 *
	 * @return the member of
	 */
	@AttributeDefinition(name = "memberof.name", description = "Member of the group", options = {
			@Option(label = "Approval", value = "approve"),
			@Option(label = "Editor", value = "editor"),
			@Option(label = "Workflow Editor", value = "workflow.editor"),
			@Option(label = "Administrator", value = "admin")})
	String getMemberOf() default "";
	
}
