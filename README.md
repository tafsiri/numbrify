# Numbrify

Numbrify is a small utility to convert _number-like strings_ in objects and arrays into actual numbers. For example If you've ever parsed a csv file and gotten a bunch of numbers-as-strings in your object, this can help with converting those back to numbers. It will leave things that don't look like numbers alone.

**NOTE:** By default, Numbrify will do a deep traversal of properties/elements in the collection, however non primitive values that are not Arrays or Objects (e.g. dates) are copied by reference. So if you want a completely separate result and have lots of non primitive values you should deep clone your object first.

# Download

You can download a copy of the whole thing from the [releases](https://github.com/tafsiri/numbrify/releases) page. Or if you just want the built script there is [here](https://raw.githubusercontent.com/tafsiri/numbrify/master/dist/numbrify.js). Or if you are using npm, ```npm install numbrify```.

# Usage

Include the script into your page. Possibly like so ```<script src="dist/numbrify.js" charset="utf-8"></script>```. The ```src``` attribute should point to wherever you downloaded the dist/numbrify.js file to.

Then call ```Numbrify(data, deepTraversal=true)``` with your collection. Here are some quick examples

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
result = Numbrify(data)
// Result should equal:
// [
//   {"name": "foo", "age": 42},
//   {"name": "foo", "age": 32},
//   {"name": "foo", "age": 22}
// ]

// You can also do
result = data.map(Numbrify);

// If you want to only do a shallow traversal of your object, then pass in
// a second parameter set to false. e.g.
data = [
  {"name": "foo", "age": "42"},
  {"name": "bar", "age": "32"},
  {"name": "baz", "age": "22"}
]
result = Numbrify(data, false)

// Result should equal:
// [
//   {"name": "foo", "age": "42"},
//   {"name": "foo", "age": "32"},
//   {"name": "foo", "age": "22"}
// ]
// Note this has not done anything since the age property is in
// a nested object.
```

# Development

To build this locally, check out the repository, run ```npm install``` and then run ```npm build```. There is also an ```npm watch``` task that rebuilds on changes to the src file.

The source is written in ES6/ES2015 primarily to take advantage of ES6 modules and the convenient UMD build provided by babel.
