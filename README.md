# EnhancedVerticalRhythm
### A jQuery plugin that enables better typography by offering more control over your vertical rhythm

 - Copyright 2012: Ethan Resnick, ethanresnick.com
 - Licensed under the [Do What The Fuck You Want To Public License Version 2 license](http://en.wikipedia.org/wiki/WTFPL). 

The idea of using a [vertical rhythm](http://webtypography.net/Rhythm_and_Proportion/Vertical_Motion/2.2.2/) for better typography is now pretty well understood among web designers. But vertical rhythms don't work as well on the web as they do in print because of limits in CSS. This plugin aims to fix that.


What's the problem?
======

To see this issue with strict vertical rhythms in CSS, let's try to create one for the (fairly typical) scale of sizes below:

- 16px for body text (i.e. <code>&lt;p&gt;</code>)
- 20px for sub-heads (i.e. <code>&lt;h3&gt;</code>) and introductory paragraphs
- 25px for headings (i.e. <code>&lt;h2&gt;</code>)

Given 16px body text, we might choose a 22px baseline, which yields a comfortable <code>line-height</code> of 1.375em. But if we try to apply that baseline to our other sizes, things get messy.

For the subheads, 20px/22px is a little tight (it yields a <code>line-height</code> of 1.1em), but it's our only plausible option--going up to a 44px <code>line-height</code> would make the leading way too loose (<code>line-hieght</code> of 2.2em).

For the headings, 25px/44px is very loose (<code>line-height</code> of 1.76em), but, again, it's our only real option. If we went to tighter leading, we'd have to make it negative (i.e. 25px/24px).

As you can see, the problem is that fitting the headings to the baseline causes the leading to get too tight as the font-size approaches the baseline (the 21px heading) and then suddenly become very loose after the font-size gets bigger than the baseline (the 24px heading). Not only does this mess up the leading of each heading, it also means that different headings have leadings that look radically different.


What are the existing solutions?
======

I think there are three techniques, none of which are silver bullets, but which can be applied together to achieve pretty good results.

The first technique is to simply pick type sizes that are closer to the middle of two baselines so you get more reasonable leading values. This can work pretty well, but it can make it hard to maintain a pleasing relationship between the heading sizes, especially if your project needs more than a few sizes. Plus, it doesn't really tackle the problem head on.

Another technique is to use [incremental leading](http://www.markboulton.co.uk/journal/comments/incremental-leading). So instead of making every line of the headings fall on the baseline, we might have every other line do so. That would give us a line height of 33px for both of our headings, which is reasonable (creates <code>line-height</code>s of 1.571em and 1.375em). This approach still ultimately breaks the rhythm for the following text--it just breaks it more neatly--and sometimes it still doesn't produce ideal <code>line-height</code> values. But in some cases it's good enough, even for headings in the main flow of the text.

The last option is to set the leading of each heading size to a good value (either by eye or using an incremental leading size) and then add space around each heading to get the text that follows back on the baseline. This means the amount of space around each heading will vary depending on how many lines tall the heading is. For example, let's say we give our 21px heading a 26px line height (<code>line-height</code> of ~1.24em). That would require us to add 18px of space when the heading is only one line tall (so that its total height becomes 44px, or two baselines), 14px of space when the heading is two lines tall (so that its total height becomes 66px, or three baselines), etc. With headings that are somewhat independent of the rest of the text (like a title), this technique works great. But with headings near each other or embedded in the text, the difference in spacing can look conspicuous or crude.


So how does this plugin help again?
======
On the web, we don't have the option to use the last technique mentioned above because there's no way in CSS to determine how many lines tall a heading is, which is necessary in order to adjust its <code>margin</code>s or <code>padding</code> to fix the rhythm. This plugin fixes that by adding classes to your headings (or any other elements you want) based on how many lines tall they are. You can use then use these classes in your CSS to adjust the spacing.

All you have to do is select some elements and call countLines() on them, like this:

<code>$('h1, h2, h3').countLines();</code>

That will take your <code>h1</code>s, <code>h2</code>s, and <code>h3</code>s and add the class <code>lines-#</code> (where # is the element's number of lines) to each one.

So you could then write in your CSS:
<pre><code>/* Make a title at the top of the page and get the main text to always start "in rhythm" after it. */

/* When the title is an even number of lines it will naturally fall back on the baseline and we add an 
additional baseline of space below it. */
h1 {font-size:24px; line-height:33px; margin-bottom:22px; /* i.e. 1 baseline */ } 

/* When it's an odd number of lines we we need to add an extra half baseline to get back on rhythm. 
We do this and distribute most of the extra 11px to the top. */
h1.lines-1, h1.lines-3 { margin-top:8px; margin-bottom:25px; }
</code></pre>

The above CSS will work if the title is between 1 and 4 lines. But what if we have titles that can get much bigger than that? We could keep adding to the selector that handles odd line numbers (i.e. "h1.lines-5, h1.lines-7, h1.lines-9, etc"), but that's inelegant and could get long. So the plugin provides a simpler alternative if you're using incremental leading.

All you need to do is pass in the increments your using. Above, our increment would be two because it takes two lines for the heading to get back to the baseline. So you call:

<code>$('h1').countLines({'increments':[2]});</code>

By passing two as an increment, all the <code>&lt;h1&gt;</code>s would now end up with another class too: <code>lines-mod-2-#</code>, where # represents [the number of lines occupied by the heading] % 2. 

In other words, whenever the heading takes up an even number of lines, the class will be "lines-mod-2-0", and whenever it takes up an odd number of lines the class will be "lines-mod-2-1", making it easy to cover all possible heading line counts in your CSS.
