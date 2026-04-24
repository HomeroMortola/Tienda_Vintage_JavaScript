import { describe, it, expect, beforeEach } from 'vitest';
import { BandannaBuilder } from '../src/models/BandannaBuilder.js';

describe('BandannaBuilder', () => {

    let builder;

    beforeEach(() => {
        builder = new BandannaBuilder();
    });

