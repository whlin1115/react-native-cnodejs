import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    headerLeft: {
        width: 80,
        marginLeft: 15
    },

    headerRight: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },

    headerTouch: {
        height: 30
    },

    headerBtn: {
        flex: 1,
        width: 30,
        height: 30,
        marginRight: 15
    },

    headerImg: {
        borderRadius: 15,
    },

    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    connect: {
        fontFamily: 'Helvetica Neue,Helvetica,Segoe UI,Arial,freesans,sans-serif',
        padding: 15,
        borderBottomWidth: 0.5,
        borderColor: '#d5dbdb',
    },

    reply: {
        padding: 15,
        borderBottomWidth: 0.5,
        borderColor: '#d5dbdb',
    }
});