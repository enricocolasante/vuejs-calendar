import Vue from 'vue';
import Vuex from 'Vuex';
Vue.use(Vuex);

import Axios from 'axios';

import moment from 'moment-timezone';
moment.tz.setDefault('UTC');

export default new Vuex.Store({
    state: {
        currentYear: 2017,
        currentMonth: 9,
        eventFormPosX: 0,
        eventFormPosY: 0,
        eventFormActive: false,
        events: [],
        eventFormDay: moment()
    },
    mutations: {
        setCurrentMonth(state, payload) {
            state.currentMonth = payload;
        },
        setCurrentYear(state, payload) {
            state.currentYear = payload;
        },
        eventFormPos(state, payload) {
            state.eventFormPosX = payload.x;
            state.eventFormPosY = payload.y;
        },
        eventFormActive(state, payload) {
            state.eventFormActive = payload;
        },
        addEvent(state, payload) {
            state.events.push(payload);
        },
        setEventFormDay(state, payload) {
            state.eventFormDay = payload;
        }
    },
    actions: {
        addEvent(context, payload) {
            return new Promise((resolve, reject) => {
                let obj = {
                    description: payload,
                    date: context.state.eventFormDay
                }

                Axios.post('/events', obj).then(response => {
                    if(response.status === 200) {
                        context.commit('addEvent', obj);
                        resolve();
                    } else {
                        reject();
                    }
                });
            });
        }
    }
});