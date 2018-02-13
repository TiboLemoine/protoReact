import colors from "../../assets/colors";
import loginStyle from "./styles/loginStyle";
import {Keyboard, KeyboardAvoidingView, Text, TextInput, TouchableHighlight, TouchableWithoutFeedback, View, Alert} from "react-native";
import React, {Component} from "react";
import localizable from "../../assets/localization";
import emitter from "../utils/eventEmitter";
import {events} from "../utils/eventsIndex";
import UserStore from "../store/UserStore";

class LoginScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: ''
        }
    }

    componentWillMount() {
        emitter.addListener(this, events.EMPTY_USER, this._onEmptyUser);
        emitter.addListener(this, events.ERROR_USER, this._onUserError);
        emitter.addListener(this, events.SUCCESS_USER, this._onUserFound);
    }

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={loginStyle.base}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={loginStyle.base}>
                    <View style={loginStyle.container}>
                        <View style={loginStyle.horizontalSpacer}/>
                        <View style={loginStyle.base}>
                            <View style={loginStyle.textInputContainer}>
                                <TextInput
                                    style={loginStyle.textInput}
                                    maxLength={255}
                                    placeholder={localizable.username}
                                    placeholderTextColor={colors.white}
                                    fontWeight={this.state.username ? 'bold' : 'normal'}
                                    returnKeyType='done'
                                    value={this.state.username}
                                    onChangeText={(username) => this.setState({username})}
                                    underlineColorAndroid={colors.transparent}
                                />
                            </View>
                            <TouchableHighlight
                                underlayColor={colors.yellow}
                                style={loginStyle.connectionButton}
                                onPress={this._onPressValidate}>
                                <Text style={loginStyle.connectionLabel}>
                                    {localizable.validate}
                                </Text>
                            </TouchableHighlight>
                        </View>
                        <View style={loginStyle.horizontalSpacer}/>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        )
    }

    _onPressValidate = () => {
        this._onUserFound("X");
        // UserStore.checkUserValidity(this.state.username)
    };

    _onEmptyUser() {
        Alert.alert(
            'Warning',
            `You must fill the username field`,
            [
                {text: 'OK'},
            ],
            { cancelable: false }
        );
    }

    _onUserError(username) {
        Alert.alert(
            'Warning',
            `An error occurred while trying to retrieve profile for ${username}`,
            [
                {text: 'OK'},
            ],
            { cancelable: false }
        );
    }

    _onUserFound(username) {
        this.props.navigator.push({
            screen: 'RepositoryList',
            title: username,
            passProps: {
                username: username,
            }
        });
    }

}

export default LoginScreen