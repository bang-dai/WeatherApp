import React from 'react'
import { Text, ActivityIndicator, ListView, Image } from 'react-native'
import style from '../Style'
import axios from 'axios'
import WeatherRow from './weather/Row'

export default class List extends React.Component {

    static navigationOptions = ({navigation}) => {

        return {
            title: `Météo / ${navigation.state.params.city}`,
            tabBarIcon: () => {
                return <Image source={require('./icons/home.png')} style={{width: 32, height: 32}}/>
            }

        }
    }

    constructor (props) {
        super(props)
        this.state = {
            city: this.props.navigation.state.params.city,
            report: null
        }
        setTimeout(() => {
            this.fetchWeather()
        }, 1000)
    }

    fetchWeather() {

        axios.get('http://api.openweathermap.org/data/2.5/forecast/daily', {
            params: {
                q: this.state.city,
                mode: 'json',
                units: 'metric',
                cnt: 10,
                APPID: 'ffe8663445602e1836fb6072c9f36464'
            }
        }).then((response) => {
            this.setState({report: response.data})
        }).catch((error) => {
            console.log('error axios call:', error)
        })

    }

    render () {
        if(this.state.report === null) {
            return (
                <ActivityIndicator color={style.color} size="large"/>
            )
        } else {
            const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

            return (
                <ListView
                    dataSource={ds.cloneWithRows(this.state.report.list)}
                    renderRow={(row, param2, index) => <WeatherRow day={row} index={parseInt(index, 10)} />}
                />
            )
        }
    }
}