import { describe, it, expect, beforeEach } from 'vitest';
import { isPlainObject, safeGetJSON, safeParseJSON, safeSetJSON, safeRemove } from '@/utils/safeStorage';

describe('isPlainObject', () => {
  it('accepts plain objects', () => {
    expect(isPlainObject({})).toBe(true);
    expect(isPlainObject({ a: 1 })).toBe(true);
  });

  it('rejects null, arrays, and primitives', () => {
    expect(isPlainObject(null)).toBe(false);
    expect(isPlainObject(undefined)).toBe(false);
    expect(isPlainObject([])).toBe(false);
    expect(isPlainObject([1, 2])).toBe(false);
    expect(isPlainObject('str')).toBe(false);
    expect(isPlainObject(42)).toBe(false);
    expect(isPlainObject(true)).toBe(false);
  });
});

describe('safeGetJSON', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns fallback for missing key', () => {
    expect(safeGetJSON('missing', { ok: true })).toEqual({ ok: true });
  });

  it('returns parsed value for valid JSON', () => {
    localStorage.setItem('good', JSON.stringify({ xp: 10 }));
    expect(safeGetJSON('good', { xp: 0 })).toEqual({ xp: 10 });
  });

  it('returns fallback for invalid JSON', () => {
    localStorage.setItem('bad', '{not json');
    expect(safeGetJSON('bad', 'fallback')).toBe('fallback');
  });
});

describe('safeParseJSON', () => {
  it('returns fallback for null/undefined/empty', () => {
    expect(safeParseJSON(null, 0)).toBe(0);
    expect(safeParseJSON(undefined, 0)).toBe(0);
    expect(safeParseJSON('', 0)).toBe(0);
  });

  it('parses valid JSON', () => {
    expect(safeParseJSON('{"a":1}', {})).toEqual({ a: 1 });
    expect(safeParseJSON('[1,2]', [])).toEqual([1, 2]);
  });

  it('returns fallback for invalid JSON', () => {
    expect(safeParseJSON('{oops', 'fb')).toBe('fb');
    expect(safeParseJSON('not-json', null)).toBe(null);
  });

  it('parses non-object JSON including null literal', () => {
    expect(safeParseJSON('null', 'fb')).toBe(null);
    expect(safeParseJSON('123', 0)).toBe(123);
    expect(safeParseJSON('"str"', '')).toBe('str');
  });
});

describe('safeSetJSON / safeRemove', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('round-trips values', () => {
    expect(safeSetJSON('k', { nested: { v: 1 } })).toBe(true);
    expect(safeGetJSON('k', null)).toEqual({ nested: { v: 1 } });
  });

  it('returns false when setItem throws', () => {
    const original = Storage.prototype.setItem;
    Storage.prototype.setItem = () => {
      throw new Error('quota');
    };
    try {
      expect(safeSetJSON('k', 1)).toBe(false);
    } finally {
      Storage.prototype.setItem = original;
    }
  });

  it('removes keys and never throws for missing keys', () => {
    safeSetJSON('gone', 1);
    expect(() => safeRemove('gone')).not.toThrow();
    expect(localStorage.getItem('gone')).toBeNull();
    expect(() => safeRemove('never-existed')).not.toThrow();
  });
});
