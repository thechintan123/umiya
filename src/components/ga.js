import { uid } from 'quasar'
import axios from 'axios'

export default {

    logEvent (category, action, label, value) {

        axios.get('https://www.google-analytics.com/collect', { params: {
            v: 1,
            tid: 'UA-57477357-2',
            ds: 'app', // If this is a website, use 'website'
            t: 'event',
            cid: this.getCid(),
            ec: category,
            ea: action,
            el: label,
            ev: value,
            an: 'UmiyaMatrimony', // If not given, this event is not shown in Real-Time view
            aid: 'com.umiyamatrimony.app',
            av: 'v2.1.0',
        }});
    },

    logPage (path, name) {

        axios.get('https://www.google-analytics.com/collect', { params: {
            v: 1,
            tid: 'UA-57477357-2',
            ds: 'app',
            t: 'pageview',
            cid: this.getCid(),
            dl: path,
            an: 'UmiyaMatrimony', // If not given, this event is not shown in Real-Time view
            aid: 'com.umiyamatrimony.app',
            av: 'v2.1.0',
        }});
    },

    getCid () {
        // We need an unique identifier for this session
        // We store it in a localStorage, but you may use cookies, too
        if (!localStorage.cid) {
            localStorage.cid = uid();
        }
        return localStorage.cid;
    }

}