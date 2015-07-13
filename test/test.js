var assert = require("assert");
var Numbrify = require("../dist/numbrify");

describe('Numbrify', function() {

  describe('is a function', function () {
    it('should be a function', function () {
      assert.equal(typeof(Numbrify), "function");
    });
  });

  describe('shallow numbrify', function () {
    var bdate = new Date();
    var testData = {
      "name": "Jessie Doe",
      "age": "50",
      "height": "140.34",
      "birthdate": bdate,
      "contacts": ["5555555555", "jessie@example.org"],
      "relationships": [
        {
          "type": "friend",
          "name": "Jane",
          "age": "2"
        }
      ]
    };
    // Keep an exact copy of the data.
    var testDataCopy = JSON.parse(JSON.stringify(testData));
    testDataCopy.birthdate = bdate;

    var result = Numbrify(testData, false);

    it('should not modify original data', function () {
      assert.deepEqual(testData, testDataCopy);
    });

    it('should shallow numbrify', function () {
      assert.strictEqual(result.age, 50);
      assert.strictEqual(result.height, 140.34);
      assert.strictEqual(result.birthdate, bdate);
    });

    it('should leave non numeric strings alone', function () {
      assert.strictEqual(result.name, "Jessie Doe");
      assert.strictEqual(result.contacts[0], "5555555555"); // shallow numbrify
      assert.strictEqual(result.contacts[1], "jessie@example.org");
    });

  });

  describe('numbrify an array', function () {
    var testData = ["123", "456", "789.2342", "foo"];
    var testDataCopy = JSON.parse(JSON.stringify(testData));

    var result = Numbrify(testData);

    it('should not modify original data', function () {
      assert.deepEqual(testData, testDataCopy);
    });

    it('should shallow numbrify', function () {
      assert.strictEqual(result[0], 123);
      assert.strictEqual(result[1], 456);
      assert.strictEqual(result[2], 789.2342);
      assert.strictEqual(result[3], "foo");
      assert.strictEqual(result.length, 4);
    });
  });

  describe('numbrify an array of objects', function () {
    var testData = [
      {"name": "foo", "age": "42"},
      {"name": "bar", "age": "32"},
      {"name": "baz", "age": "22"}
    ];
    var testDataCopy = JSON.parse(JSON.stringify(testData));

    var result = Numbrify(testData);

    it('should not modify original data', function () {
      assert.deepEqual(testData, testDataCopy);
    });

    it('should shallow numbrify', function () {
      assert.strictEqual(result[0].age, 42);
      assert.strictEqual(result[1].age, 32);
      assert.strictEqual(result[2].age, 22);

      assert.strictEqual(result[0].name, "foo");
      assert.strictEqual(result[1].name, "bar");
      assert.strictEqual(result[2].name, "baz");
    });
  });

  describe('deep numbrify', function () {
    var bdate = new Date();
    var testData = {
      "name": "Jessie Doe",
      "age": "50",
      "height": "140.34",
      "birthdate": bdate,
      "contacts": ["5555555555", "jessie@example.org"],
      "relationships": [
        {
          "type": "friend",
          "name": "Jane",
          "age": "2"
        }
      ]
    };
    // Keep an exact copy of the data.
    var testDataCopy = JSON.parse(JSON.stringify(testData));
    testDataCopy.birthdate = bdate;

    var result = Numbrify(testData);

    it('should deep numbrify', function () {
      assert.strictEqual(result.age, 50);
      assert.strictEqual(result.height, 140.34);
      assert.strictEqual(result.birthdate, bdate);
      assert.strictEqual(result.contacts[0], 5555555555);
      assert.strictEqual(result.relationships[0].age, 2);
    });

    it('should not modify original data', function () {
      assert.deepEqual(testData, testDataCopy);
    });

    it('should leave non numeric strings alone', function () {
      assert.strictEqual(result.name, "Jessie Doe");
      assert.strictEqual(result.contacts[1], "jessie@example.org");
    });

  });


  describe('pass through other types', function () {
    var testData = new Date();
    var result = Numbrify(testData, false);
    var deepResult = Numbrify(testData);

    it('should not modify original data', function () {
      assert.deepEqual(testData, result);
      assert.deepEqual(deepResult, result);
    });
  });


});
