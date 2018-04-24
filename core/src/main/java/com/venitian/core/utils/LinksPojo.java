package com.venitian.core.utils;

import java.util.List;

public class LinksPojo {
	private String text;
	
	private String url;
		
	private boolean newWindow;

	private List<LinksPojo> children;
	
	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}
		
	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public boolean isNewWindow() {
		return newWindow;
	}

	public void setNewWindow(boolean newWindow) {
		this.newWindow = newWindow;
	}

	public void setChildren(List<LinksPojo> children){
		this.children = children;
	}
	public List<LinksPojo> getChildren(){
		return children;
	}
}
