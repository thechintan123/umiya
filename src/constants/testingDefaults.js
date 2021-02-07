
var testData = {
  email: 'test9@test.com',
  password: 'password',
  confirmPassword: 'password',
  firstName: 'first',
  lastName: 'last',
  gender: { id: 1, name: 'Male' },
  dateOfBirth: '1983-09-01',
  age: 36,
  countryRadio: 'India',
  country: {},
  otherCountry: '',
  state: 'state',
  city: 'city',
  primaryContact: '11111111111',
  alternateContact: '22222222222',
  maritalStatus: { id: 1, name: 'Never Married' },
  height: '5 ft 5 inches',
  heightCms: '',
  gotra: { id: 1, name: 'Aditya' },
  originalSurname: 'Surname',
  fatherName: 'father',
  residentialAddress: 'address',
  education: 'education',
  aboutYourself: 'about yourself',
  partnerAgeFrom: '30',
  partnerAgeTo: '40',
  partnerHeightFrom: '5 ft 0 inches',
  partnerHeightFromCms: '',
  partnerHeightTo: '6 ft 0 inches',
  partnerHeightToCms: '',
  partnerMaritalStatus: [{ id: 1, name: 'Never Married' }],
  emailMatchedNotification: false,
  agreeTc: true,
  whereKnow: { id: 1, name: 'Friends' }
  // status: { id: 2, name: 'Approved' }
}

var testTmpData = {
  primaryContact: '11111111111',
  primaryContactCountryCode: '91',
  alternateContactCountryCode: '91',
  alternateContact: '22222222222',
  countryRadio: 'India',
  age: 30
}

var testLoginData = {
  email: 'chin1@gmail.com',
  password: 'password',
  rememberMe: true,
}

export { testData, testTmpData, testLoginData }
