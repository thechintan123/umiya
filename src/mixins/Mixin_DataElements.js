import { heightFtStart, heightFtEnd , ageStart, ageEnd } from '../constants/registerFormConstants.js'


export default {
    methods: {
  
        createHeightList () {
            // create height list when component is created
            let h
            let i
            var startHeight = heightFtStart
            var endHeight = heightFtEnd
            for (h = startHeight; h <= endHeight; h++) {
              for (i = 0; i <= 11; i++) {
                this.heightOptions.push(h + ' ft ' + i + ' inches')
              }
            }
          }
          ,
          createAgeFromToList () {
            const startAge = ageStart
            const endAge = ageEnd
            let a
            for (a = startAge; a <= endAge; a++) {
              this.ageFromToOptions.push(a)
            }
          },

      }
    }
  
  