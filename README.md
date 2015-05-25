# Meteor Collection Methods

Collection methods automatically sets up a transformation on your collections using Meteor's Mongo.Collection `transform` option, allowing for simple models, with an interface similar to template methods.

Highly based on [dburles/meteor-collection-helpers](https://github.com/dburles/meteor-collection-helpers), but we keep the original transform method untouched.

## Installation

```sh
$ meteor add ocarina:collection-methods
```

## Usage

It's recommended to set up methods to run on both server and client. This way your methods can be accessed both server side and client side.

Some simple methods:

```javascript
Books = new Mongo.Collection('books');
Authors = new Mongo.Collection('authors');

Books.methods({
  author: function() {
    return Authors.findOne(this.authorId);
  }
});

Authors.methods({
  fullName: function() {
    return this.firstName + ' ' + this.lastName;
  },
  books: function() {
    return Books.find({ authorId: this._id });
  }
});
```

### Example use within a template

Our relationships are resolved by the collection method, avoiding unnecessary template methods. So we can simply write:

```javascript
Template.books.methods({
  books: function() {
    return Books.find();
  }
});
```

...with the corresponding template:

```html
<template name="books">
  <ul>
  {{#each books}}
    <li>{{name}} by {{author.fullName}}</li>
  {{/each}}
  </ul>
</template>
```

### Use outside of templates

You can of course access methods outside of your templates:

```javascript
Books.findOne().author().firstName; // Charles
Books.findOne().author().fullName(); // Charles Darwin
```

## Meteor.users

You can also apply methods to the Meteor.users collection

```javascript
Meteor.users.methods({
  // ...
});
```

### Applying the transformation function

Sometimes it may be useful to apply the transformation directly to an object.

```js
var doc = {
  firstName: 'Charles',
  lastName: 'Darwin'
};

transformedDoc = Authors._transform(doc);

transformedDoc.fullName(); // Charles Darwin
```

### License

MIT
