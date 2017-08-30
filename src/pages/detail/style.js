import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
    },

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
        marginRight: 10
    },

    connect: {
        padding: 15,
        borderBottomWidth: 0.5,
        borderColor: '#d5dbdb',
    },

    reply: {
        flexDirection: 'row',
        padding: 15,
        borderBottomWidth: 0.5,
        borderColor: '#d5dbdb',
    },

    total: {
        color: '#42b983',
        fontWeight: 'bold',
    }
});