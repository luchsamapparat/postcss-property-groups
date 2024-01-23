import postcss from 'postcss';
import { expect, test } from 'vitest';
import postcssPropertyGroups from './index';

const initialCss = `
:root {
  --color-dark: black;
  --font-size-12: 12px;
  --font-size-16: 16px;
  --line-height-16: 16px;
  --line-height-24: 24px;
}

@property-group :root --on-light {
  color: var(--color-dark);
}

@property-group :root --heading-1 {
  font-size: var(--font-size-12);
  line-height: var(--line-height-16);
}

@property-group :root --heading-2 {
  font-size: var(--font-size-16);
  line-height: var(--line-height-20);
}

h1 {
  apply-property-group: --on-light --heading-1;
}

h2 {
  apply-property-group: --on-light --heading-2;
}
`;

const expectedCss = `
:root {
  --color-dark: black;
  --font-size-12: 12px;
  --font-size-16: 16px;
  --line-height-16: 16px;
  --line-height-24: 24px;
}

:root {
  --on-light-color: var(--color-dark);
}

:root {
  --heading-1-font-size: var(--font-size-12);
  --heading-1-line-height: var(--line-height-16);
}

:root {
  --heading-2-font-size: var(--font-size-16);
  --heading-2-line-height: var(--line-height-20);
}

h1 {
  color: var(--on-light-color);
  font-size: var(--heading-1-font-size);
  line-height: var(--heading-1-line-height);
}

h2 {
  color: var(--on-light-color);
  font-size: var(--heading-2-font-size);
  line-height: var(--heading-2-line-height);
}
`;

test('defining and applying property groups', async () => {
  const { css } = await postcss(postcssPropertyGroups()).process(initialCss);
  expect(css).toEqual(expectedCss);
})