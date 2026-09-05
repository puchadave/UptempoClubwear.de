const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const source = fs.readFileSync('assets/js/dynamic-favicon.js', 'utf8');
const context = { console };
vm.createContext(context);
vm.runInContext(source, context);

const api = context.UptempoFavicon;
assert.ok(api, 'UptempoFavicon API must be exposed');

assert.deepEqual(
  api.buildSvg(\"logo\"),
  { state: 'logo', href: 'assets/img/icons/favicon.svg' }
);

const sequence = api.getSequence();
assert.deepEqual(sequence.map((step) => step.state), [
  'idle',
  'glow',
  'beat',
  'glitch',
  'logo'
]);
assert.ok(sequence.every((step) => Number.isInteger(step.durationMs) && step.durationMs > 0));

assert.equal(api.nextState('idle'), 'glow');
assert.equal(api.nextState('glow'), 'beat');
assert.equal(api.nextState('beat'), 'glitch');
assert.equal(api.nextState('glitch'), 'logo');
assert.equal(api.nextState('logo'), 'idle');

console.log('dynamic-favicon tests: PASS');
