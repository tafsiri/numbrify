# Numbrify

Numbrify is a small utility to convert _number-like strings_ in objects and arrays into actual numbers. If you've ever parsed a csv file and gotten a bunch of numbers-as-strings in your object, this can help with converting those back to numbers. It will leave things that don't look like numbers alone.

**NOTE:** Numbrify will also only do a shallow traversal of properties/elements in the collection. (though it should support deep traversal eventually).

# Usage

Include the script into your page. Possibly like so ```<script src="dist/numbrify.js" charset="utf-8"></script>```. ```src``` should point to wherever you downloaded the dist/numbrify.js file to.

Then call ```Numbrify``` with your collection. Here are some quick examples

```javascript
var data;
var result;

// Numbrify an array
data = ["123", "456", "789.2342", "foo"];
result = Numbrify(data);
// Result should equal: [123, 456, 789.2342, "foo"];

data = [
  {"name": "foo", "age": "42"},
  {"name": "bar", "age": "32"},
  {"name": "baz", "age": "22"}
]

// Numbrify an array of objects
// We use Array.map since numbrify wont deep traverse an
// array.
result = data.map(function(datum){
  return Numbrify(datum);
});
// Result should equal:
// [
//   {"name": "foo", "age": 42},
//   {"name": "foo", "age": 32},
//   {"name": "foo", "age": 22}
// ]

// The above could also be written as
result = data.map(Numbrify);
```

# Development

To build this locally, check out the repository, run ```npm install``` and then run ```npm build```. There is also an ```npm watch``` task that rebuilds on changes to the src file.

The source is written in ES6/ES2015 primarily to take advantage of ES6 modules and the convenient UMD build provided by babel.
