export default {
  methods: {
    computeAge(dob) {
      var dobInMS = Date.parse(dob);
      var diffMs = Date.now() - dobInMS;
      var ageDt = new Date(diffMs);
      return Math.abs(ageDt.getUTCFullYear() - 1970);
    }
  }
};
