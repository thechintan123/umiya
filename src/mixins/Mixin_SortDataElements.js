
export default {
  data () {
    return {
      sortBy: { id: 1, key: 'lastLogin', value: 'Login Date (Asc)', order: 'asc' },
      sortByOptions: [{ id: 1, key: 'lastLogin', value: 'Login Date (Asc)', order: 'asc' },
        { id: 2, key: 'lastLogin', value: 'Login Date (Desc)', order: 'desc' },
        { id: 3, key: 'firstName', value: 'First Name (Asc)', order: 'asc' },
        { id: 4, key: 'firstName', value: 'First Name (Desc)', order: 'desc' },
        { id: 5, key: 'userDetailsId', value: 'Profile ID (Asc)', order: 'asc' },
        { id: 6, key: 'userDetailsId', value: 'Profile ID (Desc)', order: 'desc' }]
    }
  }
}
