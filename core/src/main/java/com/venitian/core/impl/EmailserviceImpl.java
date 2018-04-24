package com.venitian.core.impl;

import org.osgi.service.component.annotations.Component;
import com.venitian.core.Emailservice;

@Component(service = Emailservice.class,immediate=true)
public class EmailserviceImpl implements Emailservice{

	public String sendEmail(String subject, String mailBody, String emailTo,
			String from) {
		// TODO Auto-generated method stub
		return "";
	}

}
