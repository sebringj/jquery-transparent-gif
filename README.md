#jquery-transparent-gif


Specify dimensions for a transparent GIF and replace selected element OR just get the dataUri.


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
