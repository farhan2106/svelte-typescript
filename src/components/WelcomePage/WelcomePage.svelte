<div>
  Hello {name}
  <hr />
  <ThankYouPage date={(new Date()).toString()}></ThankYouPage>
</div>

<style>
</style>

<!-- TODO include files -->
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
