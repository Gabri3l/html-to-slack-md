const tap = require("tap");
const slackify = require("./index");

tap.test("simple", function simple(t) {
  t.equal(slackify("test"), "test");
  t.equal(slackify("test 1"), "test 1");
  t.end();
});

tap.test("tags", function tags(t) {
  t.equal(slackify("test <b>bold</b>"), "test *bold*");
  t.equal(
    slackify('test <a href="http://example.com">example link</b>'),
    "test <http://example.com|example link>"
  );
  t.end();
});

tap.test("malformed html", function invalid(t) {
  t.equal(slackify("test <b>asd"), "test *asd*");
  t.equal(slackify("<sad>sab tag</sad>"), "sab tag");
  t.equal(slackify("<sad"), "");
  t.end();
});

tap.test("empty", function empty(t) {
  t.equal(slackify(""), "");
  t.end();
});

tap.test("vcheck example", function vcheck(t) {
  t.equal(
    slackify(
      '<b>2.4-SNAPSHOT</b> &bull; revision <a href="https://a-team.csint.cz/stash/projects/webapi/repos/webapi/commits/a245dc97ec7bbe9ed6cb9fc1025dd846fefc7c89">a245dc9</a> &bull; build 2015-09-07 14:06 &bull; wbl 1.3.33 &bull; <a href="http://www.csast.csas.cz/at/webapi/api/v1/version">details &raquo;</a>'
    ),
    "*2.4-SNAPSHOT* • revision <https://a-team.csint.cz/stash/projects/webapi/repos/webapi/commits/a245dc97ec7bbe9ed6cb9fc1025dd846fefc7c89|a245dc9> • build 2015-09-07 14:06 • wbl 1.3.33 • <http://www.csast.csas.cz/at/webapi/api/v1/version|details »>"
  );
  t.end();
});

tap.test("em example", function vcheck(t) {
  t.equal(slackify("<em>whoa</em>"), "_whoa_");
  t.end();
});
