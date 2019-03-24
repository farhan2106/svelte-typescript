<div>
  Hello {name}
  <hr />
  <ThankYouPage date={(new Date()).toString()}></ThankYouPage>
</div>

<style>
</style>

<script>
import WelcomePageModel from './WelcomePageModel'
import ThankYouPage from './../ThankYouPage/ThankYouPage.svelte'

export default {
  components: {
    ThankYouPage
  },
  data() {
    return WelcomePageModel.data
  }
}
</script>
