import {Platform, StyleSheet} from "react-native"
import colors from "../../../assets/colors";

export default styles = StyleSheet.create({
    base: {
        flex: 1,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInputContainer: {
        height: 55,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        borderRadius: 10,
        paddingLeft: 10,
        backgroundColor: colors.gray,
    },
    textInput: {
        borderRadius: 20,
        fontSize: 24,
    },
    connectionButton: {
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    connectionLabel: {
        color: colors.orange,
        fontWeight: 'bold',
        fontSize: 24,
    },
    horizontalSpacer: {
        flex: 0.5,
        backgroundColor: colors.transparent,
    },
})