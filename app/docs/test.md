# Local Markdown Document

Syntax Highlighting:

``` css
/* Single declarations on one line */
.span1 { width: 60px; }
.span2 { width: 140px; }
.span3 { width: 220px; }

/* Multiple declarations, one per line */
.sprite {
  display: inline-block;
  width: 16px;
  height: 15px;
  background-image: url(../img/sprite.png);
}
.icon           { background-position: 0 0; }
.icon-home      { background-position: 0 -20px; }
.icon-account   { background-position: 0 -40px; }
```

``` javascript
/**
 * File fetcher function.
 *
 * Fetches a given `url` via AJAX.
 * See [Runner#run()] for a description of fetcher functions.
 */

Flatdoc.file = function(url) {
	return function(callback) {
		$.get(url)
			.fail(function(e) { callback(e, null); })
			.done(function(data) {  callback(null, data); });
	};
};
```

``` html
<div role="flatdoc">
	<div role="flatdoc-menu" class="menubar"></div>
	<div class="content-wrapper">
		<div class="row">
			<div role="flatdoc-content" class="content"></div>
		</div>
	</div>
</div>
```

``` php
<?php 
	if ( have_posts() ) {
		while ( have_posts() ) {
			the_post(); 
			//
			// Post Content here
			//
		} // end while
	} // end if
?>
```


[Source](https://raw.github.com/isobar-idev/code-standards/master/sections/en/css.html "Permalink to ")

![{}][1]

The second component of a web page is the presentation information contained in the Cascading Style Sheet (CSS.) Web browsers successful implementation of CSS has given a whole generation of web authors site-wide control over the look and feel of their web sites.

Just as the information on a web page is semantically described in the [HTML Markup][2], CSS describes all presentation aspects of the page via a description of its visual properties. CSS is powerful in that these properties are mixed and matched via identifiers to control the page's layout and visual characteristics through the layering of style rules (the "cascade").

### General Coding Principles

  * Add CSS through external files, minimizing the # of files, if possible. It should always be in the HEAD of the document.
  * Use the LINK tag to include, [never the @import.][3] Including a stylesheetDon't use inline styling

This is poor form, I say

  * Don't include styles inline in the document, either in a style tag or on the elements. It's harder to track down style rules.
  * Use [normalize.css][4] to make rendering more consistent across browsers.
  * Use a font-normalization file like [YUI fonts.css][5]
  * Elements that occur only once inside a document should use IDs, otherwise, use classes.
  * Understand [cascading and selector specificity][6] so you can write very terse and effective code.
  * Write selectors that are optimized for speed. Where possible, avoid expensive CSS selectors. For example, avoid the * wildcard selector and don't qualify ID selectors (e.g. `div#myid`) or class selectors (e.g. `table.results`.) This is especially important with web applications where speed is paramount and there can be thousands or even tens of thousands of DOM elements. More on [writing efficient CSS on the MDC][7].

### CSS Box Model

Intimate knowledge and understanding of the CSS and browser-based box model is necessary for conquering the fundamentals of CSS layouts.

### CSS Validation

We typically don't use the [W3C validator][8].

### CSS Formatting

At minimum, format CSS with selectors on one line and each property on its own line. The declarations are indented.

As an enhancement to that style, related or child styles and additional 2 or 4 spaces. That allows for hierarchical scanning and organization and makes (for some people) an easier-to-read style sheet.

Also, if you specify multiple selectors, it's a good idea to start each on new line. This prevents lines from growing long and improves readability as well as version control workflow.

.post-list li a{ color:#A8A8A8; } .post-list li a:hover{ color:#000; text-decoration:none; } .post-list li .author a, .post-list li .author a:hover{ color:#F30; text-transform:uppercase; }

For multiple author environments, single line CSS should be avoided because it can cause issues with version control.

#### Alphabetize

If you're performance obsessed [alphabetizing CSS properties increases the odds of larger repeatable patterns being present to aid in GZIP compression][9].

### Classes vs. IDs

You should only give elements an ID attribute if they are unique. They should be applied to that element only and nothing else. Classes can be applied to multiple elements that share the same style properties. Things that should look and work in the same way can have the same class name.

  * Category 1
  * Category 2
  * Category 3

### Naming Conventions for Selectors

It is always preferable to name something, be it an ID or a class, by the nature of **what it is** rather than by **what it looks like**. For instance, a class name of `bigBlueText` for a special note on a page is quite meaningless if it has been changed to have a small red text color. Using a more intelligent convention such as `noteText` is better because when the visual style changes it still makes sense.

### Selectors

The [CSS Selectors Level 3][10] specification introduces a whole new set of [CSS Selectors][11] that are extremely useful for better selection of elements.

#### Pseudo-classes

[Pseudo-classes][12] enable you to dynamically style content. Some pseudo-classes have existed since CSS1 (`:visited, :hover`, etc.) and CSS2 (`:first-child, :lang`). As of CSS3, 16 new pseudo-classes have been added to the list and are especially useful for styling dynamic content. [Learn how to use pseudo-classes in-depth][13].

#### Combinators &amp; Attribute Selectors

[Combinators][14] provide shortcuts for selecting elements that are a descendant element, a child element, or an element's sibling.

[Attribute Selectors][15] are great for finding elements that have a specific attribute and/or specific value. Knowledge of regular expressions helps with attribute selectors.

#### Specificity

Browsers [calculate a selector's specificity][10] to determine which CSS rule should apply. If two selectors apply to the same element, the one with the **higher specificity wins**.

IDs have a higher specificity than attribute selectors do, and class selectors have higher specificity than any number of element selectors. Always try to use IDs to increase the specificity. There are times when we may try to apply a CSS rule to an element and it does not work no matter what we try. This is likely because the specificity of the selector used is lower than another one and the properties of the higher one are taking precedence over those you want to apply. This is more common in working with larger more complex stylesheets. It isn't a big issue with smaller projects usually.

##### Calculating specificity

When working with a large and complex stylesheet it helps to know how to calculate the value of a selector's specificity, to save you time and to make your selectors more efficient.

Specificity is calculated by counting various components of your CSS and expressing them in a form (a,b,c,d).

  * Element, Pseudo Element: d = 1 – (0,0,0,1)
  * Class, Pseudo class, Attribute: c = 1 – (0,0,1,0)
  * Id: b = 1 – (0,1,0,0)
  * Inline Style: a = 1 – (1,0,0,0)

However, it may be better to use a specificity calculator.

Using `!important` overrides all specificity no matter how high it is. We like to avoid using it for this reason. Most of the time it is not necessary. Even if you need to override a selector in a stylesheet you don't have access to, there are usually ways to override it without using !important. Avoid using it if possible.

### Pixels vs. Ems

We use the `px` unit of measurement to define `font size`, because it offers absolute control over text. We realize that using the `em` unit for font sizing used to be popular, to accommodate for Internet Explorer 6 not resizing pixel based text. However, all major browsers (including IE7 and IE8) now support text resizing of pixel units and/or full-page zooming. Since IE6 is largely considered deprecated, pixels sizing is preferred. Additionally, unit-less `line-height` is preferred because it does not inherit a percentage value of its parent element, but instead is based on a multiplier of the `font-size`.

Correct #selector { font-size: 13px; line-height: 1.5; /* 13 * 1.5 = 19.5 ~ Rounds to 20px. */ } Incorrect /* Equivalent to 13px font-size and 20px line-height, but only if the browser default text size is 16px. */ #selector { font-size: 0.813em; line-height: 1.25em; }

### Internet Explorer Bugs

Inevitably, when all other browsers appear to be working correctly, any and all versions of Internet Explorer will introduce a few nonsensical bugs, delaying time to deployment. While we encourage troubleshooting and building code that will work in all browsers without special modifications, sometimes it is necessary to use conditional `if IE` comments for CSS hooks we can use in our stylesheets. [Read more on paulirish.com][16]

Fixing IE .box { float: left; margin-left: 20px; } .ie6 .box { margin-left: 10px; }

If you're using HTML5 (and the [HTML5 Boilerplate][17]) we encourage the use of the [Modernizer][18] JavaScript library and this pattern:

### Shorthand

In general, CSS shorthand is preferred because of its terseness, and the ability to later go back and add in values that are already present, such as the case with margin and padding. Developers should be aware of the TRBL acronym, denoting the order in which the sides of an element are defined, in a clock-wise manner: Top, Right, Bottom, Left. If _bottom_ is undefined, it inherits its value from _top_. Likewise, if _left_ is undefined, it inherits its value from _right_. If only the _top_ value is defined, all sides inherit from that one declaration.

For more on reducing stylesheet code redundancy, and using CSS shorthand in general:

### Images

  * For repeating images, use [something larger than 1x1 pixels][19]
  * You should never be using spacer images.
  * Use [CSS sprites generously][20]. They make hover states easy, improve page load time, and reduce carbon dioxide emissions.
  * Typically, all images should be sliced with a transparent background (PNG8). All should be cropped tightly to the image boundaries.
	* However, the logo should always have a background matte and have padding before the crop. (so other people can hotlink to the file)

### Color Management

  * Verify that all members on your team have consistent color management settings.
	* Any given two monitors most likely display the colors differently, but sRGB color profile must be your default.
	* When you open files in Photoshop, pay attention to Color Profile warnings and notify team members when Photoshop is suggesting to convert an image to a different profile.
  * Never embed a color profile in your images.
	* When you Save for Web and Devices from Photoshop, be sure to uncheck "Embed Color Profile."

* * *

### General Text and Font Styling

#### Headings

  * Define default styling for `h1-h6` headings including headings as links. It's helpful to declare these at the top of your CSS document, and modify them with as necessary for consistency across the site.
  * Headings should show a hierarchy indicating different levels of importance from the top down starting with h1 having the largest font size.
  * SEO: To get a rough idea of how your page hierarchy is organized and read, use your Developer Toolbar to disable CSS. You'll end up with a text-based view of all your `h1-h6` tags, `strong`, `em`, etc.

#### Links

  * Default styles for links should be declared and different from the main text styling, and with differing styles for hover state.
  * When styling links with underlines use `border-bottom` and some padding with `text-decoration: none;`. This just looks better.

## Web Typography

The use of custom fonts and typefaces on the web has been growing more popular the past few years. with native browser support on the rise and several supporting services and APIs now available there is real momentum in this space. Each of these approaches have their own pros and cons. Before a project kicks off it's best to do research into technology and licensing limitations to choose the proper approach for the specific project.

All of these approaches have drawbacks in code overhead, development time and performance (clock and perceived). Familiarizing yourself with these issues and communicating them to the other members of the team and to the client will save significant problems later on in the project.

Listed here are some popular methods of embed custom fonts, list in the order of our preference for implementation.

### @font-face

The [@font-face at-rule][21] allows you to define custom fonts. It was first defined in the CSS2 specification, but was removed from CSS2.1. Currently, it's a draft recommendation for CSS3.

Our first and most preferred choice for customizing fonts on the web is @font-face, simply because it is part of the CSS Fonts Module working draft which means it will continue to grow in popularity as browser support grows, and ease of use for it improves as it becomes more stable.

For now, when using `@font-face` it's recommended to declare the source for each font format. This is important if you want it to work in the most number of browsers, though it is not a requirement for use.

The font formats included in the specification are:

  * **woff**: WOFF (Web Open Font Format)
  * **ttf**: TrueType
  * **ttf**, **otf**: OpenType
  * **eot**: Embedded OpenType
  * **svg**, **svgz**: SVG Font

#### Bulletproof @font-face

For full cross-browser compatibility use Fontsprings' new [bulletproof @font-face syntax][22] (_latest version as of 2/21/11_).

@font-face { font-family: 'MyFontFamily'; src: url('myfont-webfont.eot'); /* IE9 Compat Modes */ src: url('myfont-webfont.eot?iefix') format('eot'), /* IE6-IE8 */ &nbsp;&nbsp; url('myfont-webfont.woff') format('woff'), /* Modern Browsers */ &nbsp;&nbsp; url('myfont-webfont.ttf') format('truetype'), /* Safari, Android, iOS */ &nbsp;&nbsp; url('myfont-webfont.svg#svgFontName') format('svg'); /* Legacy iOS */ font-weight: ; font-style: ; // etc. }

Here's a [working demo][23] using this version of implementation.

#### Cross-Browser Compatibility

Safari, IE 6-9, IE 9 Compatibility Modes, Firefox, Chrome, iOS, Android, Opera

#### Prevent Compatibility Mode

Sometimes IE can have a mind of its own and will switch to compatibility mode without you knowing. Include the following in the site `` to prevent your site from defaulting to compatibility mode:

* * *

#### Tips for @font-face

  * IE 6–8 will only accept a TrueType font packaged as an EOT.
  * font-weight and font-style have different meanings within `@font-face`. Declarations where `font-weight:bold;` means this is the bold version of this typeface, rather than apply bold to this text
  * [@font-face gotchas][24]
**Pros**

  * Easy to implement
  * Large variety of APIs
  * Customizable
  * Easy to add to elements
  * Nothing required besides CSS
  * Is currently part of the working draft of CSS Fonts Module 3
**Cons**

  * Limited browser support if used improperly
  * Some older versions of modern browsers (Chrome, Opera) don't always render well. Text can have rough edges. _**I have not been able to confirm whether this is still an issue now or not._

* * *

### Google WebFonts API &amp; Font Loader

There are two options available with [Google Webfonts][25]. Both options have their downsides of course but they can be just as good to use as `@font-face`, it all depends on a projects needs.

#### Webfonts API

[Google's Webfonts API][26] essentially does the same thing as `@font-face`, it just does all the hard work for you, providing wider browser support.The major drawback to this method is the very small font library it uses. To make it work all you need to do is include the stylesheet %2B the font name.

Then define a style for the selector you want to apply the font to:

CSS selector { font-family: 'Font Name', serif; }

### Webfont Loader

Another option Google offers is the [Webfont Loader][27] which is a JavaScript library that allows for more control than the font API does. You can also use multiple webfont providers like Typekit. To use it include the script in your page:

Including the webfont.js file this way is faster if not already using the Ajax APIs. Otherwise you should use this:

By using the Webfont Loader you have more ability to customize things including the use of more fonts, not just those in the Google Webfont library which is not large. However, it then requires you to load JavaScript, sacrificing one thing for another.

**Pros**

  * Very easy to implement
  * Wide browser support
  * Can be combined with Typekit
  * Customizable when using the font loader
  * API does the same thing as `@font-face`
**Cons**

  * Very small font library if using the font API
  * Using the Webfont Loader requires the use of JavaScript to work
  * Most browsers will load the rest of the page first, leaving a blank space where the text would be, or otherwise show the fallback option if one exists, until the page fully loads.
  * Some fonts in the webfont library render poorly on Windows

* * *

### Cufon

If you choose to use Cufon, it is highly recommended you use the [Cufon compressed version][28]. You will need to convert your font using the [generator][29].

We recommend using Cufon sparingly since it can cause a lot of overhead if applied to a large amount of text. For more info visit the [Cufon Wiki][30].

**Pros**

  * Wide browser support
  * Renders well in supported browsers
  * Customizable
  * Easy to implement
**Cons**

  * Requires use of JS to work
  * Text can't be selected that uses it
  * Not all characters can be used
  * Customization can be a pain
  * Not always easy to apply to multiple elements, especially when adding effects like hovers

* * *

### Typekit

Using [Typekit][31] has its advantages and shouldn't be completely disregarded when choosing which method to use for adding custom fonts to a web site. It has strong platform integration and is a scalable and popular service. It can be used with Google Webfonts and is easily added to WordPress, Posterous, Typepad, and other similar CMS powered sites.

However, full use of [Typekit doesn't come without a cost][32]. If you need to use it on more than 2 sites or on a site that gets a high amount of pageviews you will need to pay an annual cost of $49.99, and for sites with a million%2B pageviews it costs twice as much. Though, you probably have the money to cover the cost if you're getting over a million pageviews. If not then you may want to rethink your business model.

**Pros**

  * Large font library, including Adobe fonts
  * Easy implementation
  * Google Webfont API and blogging platform integration
  * Free plan has limits but doesn't expire
**Cons**

  * Requires JavaScript to use
  * Limited font library access without paying
  * Free and cheapest plans only allow use on 1-2 web sites and 2-5 fonts per site
  * You have to pay to use it on more than 1 site

* * *

### Scalable Inman Flash Replacement (sIFR)

We do not recommend that you use this method but because of how widely used it is we felt it was necessary to include so you could make a properly informed decision when choosing which method to go with for customized webfonts.

Despite its wide popularity among web designers, and its decent support in most browsers, the drawbacks to its use outweigh its convenience. The biggest and most obvious reason to not use sIFR is the fact that it uses Flash. Plus, in order for the Flash to even work, it requires JavaScript and the scripts must be loaded before the text you use it on is visible on the page. Not to mention that it increases page load time, and can cause a slow site to be even slower.

We'll let you do the math here.

**Pros**

  * Text can be selected
  * Support on most browsers
  * Renders okay on supported browsers
**Cons**

  * It uses Flash
  * Requires JavaScript for the Flash to work
  * It's Flash!
  * Text doesn't appear until the scripts load
  * ...and it's Flash...

* * *

### Font Licensing

Even though you can transform just about any font into a web font file, you should still make sure it is legally okay for you to do so. Many foundries have updated their conditions to specify how their fonts can be used on the web. View [Font Licensing and Protection Details][33] for more information.

* * *

### Specifications &amp; Font File Formats

### Use CSS3

You can do a lot of new things with the added features in the CSS3 spec, many of which are not yet fully supported by all the major browsers. That doesn't mean they can't be used today. For the things that aren't supported there are fallback libraries or other 'polyfills' which you can use to fill in the holes where browsers may be lacking some support of a new feature.

There are also browser specific properties or prefixes that can be used to style things too. We recommend using [Prefixr.com][34] to make sure you include all the different prefixed browser properties for the sake of cross-browser support.

   [1]: https://raw.github.com/img/layout/icon-curly.png
   [2]: https://raw.github.com#markup
   [3]: http://blog.amodernfable.com/2008/01/21/thoughts-on-linking-to-stylesheets/
   [4]: http://necolas.github.com/normalize.css/
   [5]: http://developer.yahoo.com/yui/fonts/
   [6]: http://www.stuffandnonsense.co.uk/archives/css_specificity_wars.html
   [7]: https://developer.mozilla.org/en/Writing_Efficient_CSS
   [8]: http://jigsaw.w3.org/css-validator/
   [9]: http://www.barryvan.com.au/2009/08/css-minifier-and-alphabetiser/
   [10]: http://www.w3.org/TR/2009/PR-css3-selectors-20091215/
   [11]: http://www.w3.org/TR/css3-selectors/#selectors
   [12]: http://www.w3.org/TR/css3-selectors/#pseudo-classes
   [13]: http://www.smashingmagazine.com/2011/03/30/how-to-use-css3-pseudo-classes/
   [14]: http://www.w3.org/TR/css3-selectors/#combinators
   [15]: http://www.w3.org/TR/css3-selectors/#attribute-selectors
   [16]: http://paulirish.com/2008/conditional-stylesheets-vs-css-hacks-answer-neither/
   [17]: https://raw.github.com#h5bp
   [18]: http://www.modernizr.com/
   [19]: http://www.iandevlin.com/blog/2010/03/webdev/fading-issue-with-repeating-background-transparent-image-in-internet-explorer
   [20]: https://raw.github.com#_leverage_css_sprites
   [21]: http://www.w3.org/TR/2011/WD-css3-fonts-20110324/#font-face-rule
   [22]: http://www.fontspring.com/blog/further-hardening-of-the-bulletproof-syntax
   [23]: http://www.thecssninja.com/demo/css_fontface/
   [24]: http://paulirish.com/2010/font-face-gotchas/
   [25]: https://code.google.com/apis/webfonts/
   [26]: https://code.google.com/apis/webfonts/docs/getting_started.html
   [27]: https://code.google.com/apis/webfonts/docs/webfont_loader.html
   [28]: http://cufon.shoqolate.com/js/cufon-yui.js
   [29]: http://cufon.shoqolate.com/generate/
   [30]: https://github.com/sorccu/cufon/wiki/
   [31]: https://typekit.com
   [32]: https://typekit.com/plans
   [33]: http://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&amp;item_id=UNESCO_Font_Lic
   [34]: http://prefixr.com

  *[IE8]: Internet Explorer 8
  *[IE 6-9]: Internet Explorer version 6-9
  *[IE7]: Internet Explorer 7
  *[IE6]: Internet Explorer 6
  *[TRBL]: Top Right Bottom Left
  *[IE 9 Compatibility Modes]: Internet Explorer Compatibility Modes
  *[IE]: Internet Explorer
  *[CSS]: Cascading Style Sheets  
