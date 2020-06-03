const state = {
searchResults: {
        'ID1' : {
        email: "email@email.com",
        password: "",
        confirmPassword: "",
        firstName: "First",
        lastName: "Last",
        gender: "Male",
        dateOfBirth: "01-Jan-2020",
        age: 10,
        country: "India",
        otherCountry: "",
        state: "Maharashtra",
        city: "Mumbai",
        primaryContact: "1234567890",
        primaryContactCountryCode: 91,
        alternateContact: "1111111111",
        alternateContactCountryCode: 91,
        maritalStatus: "Never Married",
        height: "6 ft",
        gotra: "Gotra",
        originalSurname: "Mavani",
        fatherName: "Father",
        residentialAddress: "12, Building, Street, City",
        aboutYourself: " About Yourself",
        ageFrom: "",
        ageTo: "",
        heightFrom: "",
        heightTo: "",
        martialStatusPreferences: [],
        agreeTnC: false
      }
      ,
        'ID2' : {
        email: "email2@email.com",
        password: "",
        confirmPassword: "",
        firstName: "First-ID2",
        lastName: "Last",
        gender: "Male",
        dateOfBirth: "01-Jan-2020",
        age: 10,
        country: "India",
        otherCountry: "",
        state: "Maharashtra",
        city: "Mumbai",
        primaryContact: "1234567890",
        primaryContactCountryCode: 91,
        alternateContact: "1111111111",
        alternateContactCountryCode: 91,
        maritalStatus: "Never Married",
        height: "6 ft",
        gotra: "Gotra",
        originalSurname: "Mavani",
        fatherName: "Father",
        residentialAddress: "12, Building, Street, City",
        aboutYourself: " About Yourself",
        ageFrom: "",
        ageTo: "",
        heightFrom: "",
        heightTo: "",
        martialStatusPreferences: [],
        agreeTnC: false
      },

      'ID3' : {
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        gender: "",
        dateOfBirth: "",
        age: 0,
        country: "India",
        otherCountry: "",
        state: "",
        city: "",
        primaryContact: "",
        primaryContactCountryCode: 91,
        alternateContact: "",
        alternateContactCountryCode: 91,
        maritalStatus: "",
        height: "",
        gotra: "",
        originalSurname: "",
        fatherName: "",
        residentialAddress: "",
        aboutYourself: "",
        ageFrom: "",
        ageTo: "",
        heightFrom: "",
        heightTo: "",
        martialStatusPreferences: [],
        agreeTnC: false
      }
}
}

const getters = {

getSearchResults : (state) => {
return state.searchResults;
}
}



export default{
namespaced : true,
state,
getters
}
