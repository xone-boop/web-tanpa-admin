import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import products from '../data/products.json' with { type: 'json' };
import images from '../data/images.json' with { type: 'json' };

test('product slugs and SKUs are unique', () => {
  const slugs = new Set();
  const skus = new Set();

  for (const product of products) {
    assert.ok(product.slug, `Product ${product.name} is missing a slug`);
    assert.ok(!slugs.has(product.slug), `Duplicate slug detected: ${product.slug}`);
    slugs.add(product.slug);

    assert.ok(product.sku, `Product ${product.name} is missing an SKU`);
    assert.ok(!skus.has(product.sku), `Duplicate SKU detected: ${product.sku}`);
    skus.add(product.sku);
  }
});

test('product pricing and stock values are valid', () => {
  for (const product of products) {
    assert.ok(product.price > 0, `Product ${product.name} must have a positive price`);
    if (typeof product.stock === 'number') {
      assert.ok(product.stock >= 0, `Product ${product.name} cannot have negative stock`);
    }
  }
});

test('hero imagery is defined for the landing page', () => {
  assert.ok(Array.isArray(images.hero), 'Hero image collection must be an array');
  assert.ok(images.hero.length > 0, 'Hero image collection cannot be empty');
  for (const url of images.hero) {
    assert.ok(url.startsWith('http'), `Hero image URL must be absolute: ${url}`);
  }
});
