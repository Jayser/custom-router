export default {
    getInitialState: function () {
        console.log('-> getInitialState');
        return null;
    },

    getDefaultProps: function () {
        console.log('-> getDefaultProps');
    },

    componentWillMount: function () {
        console.log('-> componentWillMount');
    },

    componentDidMount: function () {
        console.log('-> componentDidMount');
    },

    componentWillReceiveProps: function () {
        console.log('-> componentWillReceiveProps');
    },

    componentWillUnmount: function () {
        console.log('-> componentWillUnmount');
    },

    componentWillUpdate: function () {
        console.log('-> componentWillUpdate');
    },

    componentDidUpdate: function () {
        console.log('-> componentDidUpdate');
    }
}