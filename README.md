#jquery transparent gif with native dataUri dimensions


Creates transparent GIF with specified dimensions and does replaceWith on selection with an img element. Uses dataUri technique. Image returned is set with actual dimensions within the dataUri according to spec. This allows you to use responsive sites with background images (cover or contain) that scale automatically to the proper proportions if width=100% height=auto styled on the image element. Performs well on large set of images as it uses memoization technique.


Replaces all span occurances with transparent image of given dimension

```
$('span').transparentGif({ width: 100, height: 200 });
```


Element can also have [data-img] specified like so for overriding dimensions on options

```
<span data-img="100,200" />
```

Can also grab the dataUri like so:

```
var datUri = $.fn.transparentGif.dataUri(100,200);
```
