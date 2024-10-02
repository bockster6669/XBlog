import { fn } from '@storybook/test';
import * as actual from './AuthButtons';

export * from './AuthButtons';
export default fn(actual.default).mockName('AuthButtons');