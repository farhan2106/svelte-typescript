<h1>
  My App
  <WelcomePage name={name}></WelcomePage>
</h1>

<style>
h1 {
  color: purple;
}
</style>

<script>
import WelcomePage from './components/WelcomePage/WelcomePage.svelte'

export default {
  components: {
    WelcomePage
  }
}
</script>
