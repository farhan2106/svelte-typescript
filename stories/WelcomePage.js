import { storiesOf } from '@storybook/svelte';
import { withKnobs, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import WelcomePage from '../build/components/WelcomePage/WelcomePage.svelte';

storiesOf('WelcomePage', module)
  .addDecorator(withKnobs)
  .add('with text', () => {
    const name = text('name', 'user');
    return {
      Component: WelcomePage,
      data: {
        name,
        date: new Date()
      },
      on: {
        click: action('clicked')
      }
    }
  })

