import ga from 'src/components/ga.js'

export default ({ router }) => {
  router.afterEach((to, from) => {
    ga.logPage(to.path, to.name)
  })
}
