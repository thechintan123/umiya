import { Dialog } from 'quasar'

export function showErrorMessage (errorMessage) {
  Dialog.create({
    title: "<font color='red'><b><u>Error!</u></b></font>",
    persistent: true,
    transitionShow: 'scale',
    transitionHide: 'scale',
    message: errorMessage,
    backgroundColor: 'blue',
    html: true
  })
}
