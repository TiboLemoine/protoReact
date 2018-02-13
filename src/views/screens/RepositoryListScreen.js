import React, {Component} from "react";
import {FlatList, Keyboard, RefreshControl, Text, View, Alert} from "react-native";
import style from "./styles/repositoryListStyle";
import LoginScreen from "./LoginScreen";
import RepositoryStore from "../store/RepositoryStore";
import emitter from "../utils/eventEmitter";
import {events} from "../utils/eventsIndex";
import logger from "../utils/logger";

class RepositoryListScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            repositories: []
        }
    }

    componentWillMount() {
        emitter.addListener(this, events.EMPTY_USER, this._onEmptyUser);
        emitter.addListener(this, events.ERROR_REPOSITORY, this._onRepositoryError);
        emitter.addListener(this, events.SUCCESS_REPOSITORY, this._onRepositorySuccess);
        RepositoryStore.getRepositories(this.props.username)
    }

    _onRefresh() {
        this.setState({refreshing: true});
        RepositoryStore.getRepositories(this.props.username)
    }

    _onEmptyUser() {
        Alert.alert(
            'Warning',
            `The user is not valid`,
            [
                {text: 'OK'},
            ],
            { cancelable: false }
        );
    }

    _onRepositoryError(username) {
        logger.debug("RepoService", "Catch error");
        this.setState({refreshing: false});
        Alert.alert(
            'Warning',
            `An error occurred while trying to retrieve the repositories of ${username}`,
            [
                {text: 'OK'},
            ],
            { cancelable: false }
        );
    }

    _onRepositorySuccess(list) {
        this.setState({refreshing: false});
        this.state.repositories = list;
    }

    render() {
        return (
            <View style={style.base}>
                <FlatList
                    data={this.state.repositories}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                        />
                    }
                    renderItem={this._renderRepositoryItem}
                    ListEmptyComponent={this._renderListEmpty}/>
            </View>
        );
    };

    _renderRepositoryItem = ({item, index}) => {
        return <RepositoryRowComponent
            item={item}
            handleOnPressItem={() => this._handleOnPressItem(index)}/>
    };

    _renderListEmpty = () => (
        <View style={style.emptyList}>
            <Text>{"No repository"}</Text>
        </View>
    );

    _handleTapOnRepository = (form) => {
        //TODO : handle tap
    };
}

export default RepositoryListScreen