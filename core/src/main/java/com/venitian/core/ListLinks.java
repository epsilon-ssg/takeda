package com.venitian.core;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.cq.sightly.WCMUsePojo;
import com.venitian.core.utils.LinksPojo;

public class ListLinks extends WCMUsePojo{
	/** The items. */
	private String[] items;

	private JSONObject linksObj;
	/** The Constant logger. */
	private static final Logger LOGGER = LoggerFactory.getLogger(ListLinks.class);

	/** The footer properties list. */
	List<LinksPojo> LinksList = new ArrayList<LinksPojo>();

	/** The link target. */
	String linkTarget;

	/*
	 * 
	 * 
	 * @see com.adobe.cq.sightly.WCMUsePojo#activate()
	 */
	@Override
	public void activate() throws Exception {
		try {
			createJsonObjectFromFooter();
		} catch (Exception e) {
			LOGGER.error("Exception in JSON method");
		}

	}

	private void createJsonObjectFromFooter() throws JSONException {
		items = getProperties().get("items", String[].class);
		//Gson gson = new Gson();	
		if(items!=null){
				for(String item: items){
					linksObj = new JSONObject(item);
					LinksPojo linksppts = new LinksPojo();
					linksppts.setText(linksObj.getString("ctaText"));
					linksppts.setUrl(linksObj.getString("ctaUrl"));
					LinksList.add(linksppts);
				}
			}
		}

	public List<LinksPojo> getLinkPropertiesList() {
		return LinksList;
	}
	}

