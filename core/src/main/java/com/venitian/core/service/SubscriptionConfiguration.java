package com.venitian.core.service;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.AttributeType;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;


@ObjectClassDefinition(name="Subscription Configuration", description="Configuration interface for Subscription Servlet")
public @interface SubscriptionConfiguration {

	@AttributeDefinition(name = "Sample property",description = "Sample property",type = AttributeType.STRING)

	public String sampleProperty() default "sample test";
	}