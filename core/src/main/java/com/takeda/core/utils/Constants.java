/**
 * 
 */
package com.takeda.core.utils;

/**
 * The Interface Constants.
 *
 * @author ppalla
 */
public interface Constants {
	
	/**
	 * The Interface CommonConstants.
	 */
	public interface CommonConstants {
		
		/** The Constant DOT_HTML_APPENDER. */
		public static final String DOT_HTML_APPENDER =".html";
		
		/** The Constant VALID_CONTENT_PATH. */
		public static final String VALID_CONTENT_PATH ="/content/takeda/";

		/** The Constant HTTP. */
		public static final String HTTP ="http://";

		/** The Constant TRUE. */
		public static final boolean TRUE = true;
		
		/** The Constant FALSE. */
		public static final boolean FALSE = false;
		
		/** The underscore. */
		public final String UNDERSCORE = "_";

		/** The hyphen. */
		public final String HYPHEN = "-";
		
		/** Page Title. */
		public final String PAGE_TITLE = "jcr:title";
		
		/** The template type. */
		public final String TEMPLATE_TYPE = "cq:template";
		
	}

    /**
     * The Interface HelloWorldComponent.
     */
    public interface HelloWorldComponent {
    	
	    /** The test const. */
	    public final String TEST_CONST = "Test Val";
	}
}
