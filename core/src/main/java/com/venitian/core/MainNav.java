package com.venitian.core;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.cq.sightly.WCMUsePojo;
import com.day.cq.wcm.api.Page;
import com.venitian.core.utils.LinksPojo;

public class MainNav extends WCMUsePojo {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(MainNav.class);

	private Page page;

	String pageName;
	String url;
	List<LinksPojo> mainnavList = new ArrayList<LinksPojo>();

	
	@Override
	public void activate() throws Exception {
		// TODO Auto-generated method stub
		 page = getCurrentPage(); 
		Page rootpage= page.getAbsoluteParent(2);
		 Iterator<Page> it = rootpage.listChildren();
		 navList(it,mainnavList);
	}

	private void navList(Iterator<Page> it, List<LinksPojo> nvaList) {
		while(it.hasNext()){
			 Page child = it.next();			 
			// Iterator<Page> childpageit=child.listChildren();
			 LOGGER.info("-------- " + child.getTitle());
			 pageName = child.getTitle();
			 url = child.getPath();
			 LinksPojo lp = new LinksPojo();
			 lp.setText(pageName);
			 lp.setUrl(url);
			 nvaList.add(lp);
			 subnavList(child,lp);
		 }
	}
	
 private void subnavList(Page child, LinksPojo lp) {
	 Iterator<Page> childpageit=child.listChildren();
		List<LinksPojo> mainnavListchild = new ArrayList<LinksPojo>();
	 navList(childpageit,mainnavListchild);
		lp.setChildren(mainnavListchild);
	}

public Page getPage(){
	 return page;
 }
 public List<LinksPojo> getNavList(){
	 return mainnavList;
 }

}
