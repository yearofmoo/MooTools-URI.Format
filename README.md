# MooTools-URI.Format

URI.Format is a simple exntension for the MooTools-more URI class.

URI.Format allows for a URI instance to get/set its format (extension).

Example:

```javascript
u = new URI('http://www.yearofmoo.com/file.html?qs=123');
u.setFormat('php');
u.toString(); //http://www.yearofmoo.com/file.php?qs=123
```

You can also use it directly without having to instantiate a new URI object

```javascript
URI.setFormat('http://www.yearofmoo.com/file.html','php'); //returns http://www.yearofmoo.com/file.php
```

Same goes for

```javascript
URI.getFormat('http://www.yearofmoo.com/file.html'); //html
```

As well as a few other methods
```javascript
u = new URI(window.location); //http://localhost/page.html
u.clearFormat(); //no more .html
u.hasFormat('html'); //returns false
u.setFormat('js'); //page.js
u.toString(); //http://localhost/page.js
```
