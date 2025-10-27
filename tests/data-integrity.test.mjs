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

test('product images are absolute URLs and variants are well-defined', () => {
  const absoluteUrl = /^https?:\/\//i;

  for (const product of products) {
    assert.ok(Array.isArray(product.images), `Product ${product.name} must provide an images array`);
    assert.ok(
      product.images.length > 0,
      `Product ${product.name} must provide at least one product image`
    );

    for (const url of product.images) {
      assert.ok(absoluteUrl.test(url), `Product ${product.name} image must be an absolute URL: ${url}`);
    }

    if (product.variants) {
      assert.ok(product.variants.name, `Product ${product.name} variants must include a name`);
      assert.ok(
        Array.isArray(product.variants.options),
        `Product ${product.name} variants must provide an options array`
      );
      assert.ok(
        product.variants.options.length > 0,
        `Product ${product.name} variants must provide at least one option`
      );
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

test('image collections have unique absolute URLs', () => {
  const absoluteUrl = /^https?:\/\//i;

  for (const [collection, urls] of Object.entries(images)) {
    assert.ok(Array.isArray(urls), `${collection} collection must be an array`);
    const seen = new Set();

    for (const url of urls) {
      assert.ok(absoluteUrl.test(url), `${collection} image must be an absolute URL: ${url}`);
      assert.ok(!seen.has(url), `Duplicate URL detected in ${collection} collection: ${url}`);
      seen.add(url);
    }
  }
});
