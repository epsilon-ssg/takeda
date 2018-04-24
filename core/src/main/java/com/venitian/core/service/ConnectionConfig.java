package com.venitian.core.service;

import org.apache.sling.api.servlets.HttpConstants;
import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.AttributeType;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name = "Service Connection Factory Configuration", description = "Service Factory for the Connection related Properties")
public @interface ConnectionConfig {
	@AttributeDefinition(name = "service name", description = "Service Name", type = AttributeType.STRING)
	String service_name();

	@AttributeDefinition(name = "service url", description = "Service Url to check", type = AttributeType.STRING)
	String service_url();

	@AttributeDefinition(name = "service username", description = "service username", type = AttributeType.STRING)
	String service_username();

	@AttributeDefinition(name = "service password", description = "service password", type = AttributeType.PASSWORD)
	String service_password();

	@AttributeDefinition(name = "service timeout", description = "service connection timeout", type = AttributeType.STRING)
	String service_timeout();

	/*@AttributeDefinition(name = "service httpMethod", description = "Service Http Method", options = {
			@Option(value = HttpConstants.METHOD_GET, label = HttpConstants.METHOD_GET),
			@Option(value = HttpConstants.METHOD_POST, label = HttpConstants.METHOD_POST),
			@Option(value = HttpConstants.METHOD_PUT, label = HttpConstants.METHOD_PUT),
			@Option(value = HttpConstants.METHOD_DELETE, label = HttpConstants.METHOD_DELETE),
			@Option(value = HttpConstants.METHOD_HEAD, label = HttpConstants.METHOD_HEAD) })*/

	String servicename_httpMethod() default HttpConstants.METHOD_GET;
}
