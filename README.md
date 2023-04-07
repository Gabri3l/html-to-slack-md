# html-to-slack-md

Convert html to [slack markdown](https://slack.zendesk.com/hc/en-us/articles/202288908-Formatting-your-messages). This is the same as [slackify-html](https://github.com/mrq-cz/slackify-html) but uses `cheerio` instead of `htmlparser`.

Example usage:

```js
var htmlToSlackMD = require("html-to-slack-md");

var text = htmlToSlackMD('this <a href="http://github.com">link</a> is <b>important</b>');
// text variable contains 'this <http://github.com|link> is *important*'
```
