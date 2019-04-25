import WelcomePageModel from './WelcomePageModel'
import ThankYouPage from './../ThankYouPage/ThankYouPage.svelte'

export default {
  components: {
    ThankYouPage
  },
  data() {
    return WelcomePageModel.data
  }
} as {}
