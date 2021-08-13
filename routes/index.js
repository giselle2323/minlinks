/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
 const routes = [
  {
    path: '/dashboard', // the url
    icon: 'Dashboard', // the component being exported from icons/index.js
    name: 'Dashboard', // name that appear in Sidebar
  },
  {
    path: '/discover',
    icon: 'Discover',
    name: 'Dicover',
  },
  {
    path: '/contribute',
    icon: 'Contribute',
    name: 'Contribute',
  },
  
]

export default routes
